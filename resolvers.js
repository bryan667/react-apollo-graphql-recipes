const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const S3 = require('./services/images-upload');
const s3 = new S3();

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, context) => {
      const { Recipe } = context;
      const allRecipes = await Recipe.find();
      return allRecipes;
    },
  },

  Mutation: {
    addRecipe: async (root, args, context) => {
      const { name, description, category, instructions } = args;
      const { Recipe } = context;

      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
      }).save();

      return newRecipe;
    },

    registerNewUser: async (root, args, { User }) => {
      const { firstname, lastname, email, password } = args;

      const user = await User.findOne({ email });
      if (user) throw new Error('User already exists');

      const newUser = await new User({
        firstname,
        lastname,
        email,
        password,
        joinDate: Date.now(),
      }).save();

      return newUser;
    },

    signinUser: async (root, args, { User }) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Login Failed. Email not found');

      const isItValid = await comparePass(user, password);
      if (isItValid.error) throw new AuthenticationError(isItValid.error);

      const theTokks = await generateTokss(user);
      user.token = theTokks;
      const savedUser = await user.save();

      return { token: savedUser.token };
    },

    imageUpload: async (root, { input }, { User }) => {
      const { files } = input;

      const imageMetaData = [];
      files.forEach(async (file, index) => {
        const { filename, mimetype, encoding } = await file;
        const url = await performUpload(null, file);
        console.log('url', url);

        imageMetaData.push({
          id: index,
          url: `path/${index}`,
          name: filename,
          mimetype,
          encoding,
        });
      });

      return await imageMetaData;
    },
  },
};

const comparePass = async (user, pw) => {
  const isValidPassword = await bcrypt.compare(pw, user.password);
  if (await isValidPassword) {
    return { error: null, valid: true };
  } else {
    return { error: 'Incorrect Password', valid: false };
  }
};

const generateTokss = user => {
  var token = jwt.sign({ id: user._id.toHexString() }, process.env.SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const performUpload = async (user, file) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  const uploadPath = `accounts/testuser/images/${filename}`;

  return await s3.upload(stream, uploadPath);
};
