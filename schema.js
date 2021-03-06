//graphQL schema

exports.typeDefs = `
    type Recipe {
        _id: ID
        name: String!
        category: String!
        description: String!
        instructions: String!
        imageURL: [Image]
        createdDate: String
        likes: Int
        username: String
    }

    type User {
        _id: ID
        firstname: String!
        lastname: String!
        password: String!
        email: String! @unique
        imageURL: String
        token: String
        joinDate: String
        favorites: [Recipe]
    }

    type Image {
        id: ID!
        url: String!
        name: String!
        mimetype: String!
        encoding: String
    }

    type Token {
        token: String!
    }

    type Query {
        getAllRecipes: [Recipe]
    }

    input RecipeImageUploadInput {
        recipeId: ID!
        files: [Upload!]!
    }

    type Mutation {
        addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
        signinUser(email: String!, password: String!): Token
        registerNewUser(firstname: String!, lastname: String!, email: String!, password: String!): User
        recipeImageUpload(input: RecipeImageUploadInput!): [Recipe]
    }
`;
