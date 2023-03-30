import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/controllers/**/*.ts'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Helpy API Documentation',
    description: 'Helpy REST API Documentation'
  },
  host: 'localhost:3001',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { bearerAuth: [] }
  ]
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
