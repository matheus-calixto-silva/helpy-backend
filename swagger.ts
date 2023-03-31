import swaggerAutogen from 'swagger-autogen';
import { PORT } from './src/utils/config';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/controllers/**/*.ts'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Helpy API Documentation',
    description: 'Helpy REST API Documentation'
  },
  host: `localhost:${PORT}`,
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
  ],
  definitions: {
    User: {
      _id: '63e52122b00d0c03dfc5304d',
      firstname: 'Jhon',
      lastname: 'Doe',
      username: 'john_doe',
      email: 'john_doe@mail.com',
      phone: '5581988888888',
      skills: [
        {
          skill: {
            _id: '6419f3540d17fe8c1b530ab6',
            name: 'Desenvolvimento React',
            category: {
              _id: '6419f19a0d17fe8c1b530aa8',
              name: 'Programação',
              description: 'Habilidades relacionadas a desenvolvimento de software',
              created_at: '2023-03-21T18:04:10.044Z',
              updated_at: '2023-03-21T18:04:10.044Z'
            },
            created_at: '2023-03-21T18:11:32.357Z',
            updated_at: '2023-03-21T18:11:32.357Z'
          },
          _id: '6424915edd50adc8b28f4dd7'
        }
      ],
      created_at: '2023-03-29T19:28:31.002Z',
      updated_at: '2023-03-29T19:28:31.002Z'
    },
  }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
