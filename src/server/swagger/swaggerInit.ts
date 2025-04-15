import { Express } from 'express'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'

import { swaggerOptions } from 'docs/api/swagger.config'

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export const swaggerInit = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
