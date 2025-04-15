import { Options } from 'swagger-jsdoc'

import { ProcessEnv } from 'server/utils'

export const swaggerOptions: Options = {
  apis: ['./src/server/api/**/*.ts'],
  definition: {
    info: {
      description: '',
      title: 'FRA Platform API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        url: `${ProcessEnv.appUri}/api`,
      },
    ],
  },
}
