import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/controllers/**/*.ts'];

swaggerAutogen()(outputFile, endpointsFiles);
