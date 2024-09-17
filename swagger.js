"use server";
// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Farmdiary API',
    version: '1.0.0',
    description: 'API documentation for Farmdiary',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL server API của bạn
    },
  ],
};

const options = {
  swaggerDefinition,
  // Đường dẫn đến các file chứa JSDoc
  apis: ['./pages/api/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;