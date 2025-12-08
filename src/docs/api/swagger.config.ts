import { Options } from 'swagger-jsdoc'

export const swaggerOptions: Options = {
  apis: ['./src/server/api/**/!(*.panEuropean).apidoc.yml', './src/docs/api/schemas/*.yml'],
  definition: {
    info: {
      description: '',
      title: 'FRA Platform API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        url: '/api',
      },
    ],
    tags: [{ name: 'Published data' }, { name: 'Cycle data' }],
  },
}
