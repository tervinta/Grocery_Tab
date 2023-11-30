require('dotenv').config();

const path = require('path');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const AWS = require('aws-sdk');

const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

AWS.config.update({
  accessKeyId: 'AKIA3FVT7KYUYSV5VO7G',
  secretAccessKey: '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',
  region: 'US East (Ohio) us-east-2',
});

const s3 = new AWS.S3();

const uploadImageToS3 = async (file) => {
  const bucketName = 'grocerybucket';
  const fileKey = `images/${Date.now()}_${file.originalname}`;

  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(uploadParams).promise();
    console.log('Image uploaded successfully:', data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Image upload failed');
  }
};


const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
