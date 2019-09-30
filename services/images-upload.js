require('dotenv').config({ path: '../.env' });
const AWS = require('aws-sdk');
const { AWSBucket, AWSregion, AWSAccessKeyId, AWSSecretKey } = process.env;

class S3 {
  constructor() {
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = AWSAccessKeyId;
    AWS.config.secretAccessKey = AWSSecretKey;
    AWS.config.region = AWSregion;
  }

  upload(stream, fileName) {
    new Promise((resolve, reject) => {
      const s3obj = new AWS.S3({
        params: {
          Key: fileName,
          Bucket: AWSBucket,
          ACL: 'public-read',
        },
      });

      s3obj.upload({ Body: stream }, (err, data) => {
        if (err) reject(err);
        resolve(data && data.Location);
      });
    });
  }
}

module.exports = S3;
