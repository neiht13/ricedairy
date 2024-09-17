// pages/api-docs.js
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  swaggerUi.setup(swaggerSpec)(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export const get = swaggerUi.serve;