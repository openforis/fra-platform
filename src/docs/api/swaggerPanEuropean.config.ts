import { Options } from 'swagger-jsdoc'

export const swaggerPanEuropeanOptions: Options = {
  apis: [
    './src/server/api/**/*.panEuropean.apidoc.yml',
    './src/docs/api/schemas/panEuropean/*.yml',
    './src/docs/api/schemas/DescriptionCountryValues.yml',
    './src/docs/api/schemas/RecordAssessmentData.yml',
    './src/docs/api/schemas/NodeValue.yml',
  ],
  definition: {
    info: {
      description: '',
      title: 'panEuropean API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        url: '/api',
      },
    ],
    tags: [{ name: 'panEuropean data' }, { name: 'Cycle data' }],
  },
}
