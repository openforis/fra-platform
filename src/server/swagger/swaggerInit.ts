import { Express } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'

import { AssessmentNames } from 'meta/assessment/assessment'

import { swaggerOptions } from 'docs/api/swagger.config'

import { AssessmentController } from 'server/controller/assessment'
import { CountryRepository } from 'server/repository/assessmentCycle/country'

const swaggerSpec = swaggerJSDoc(swaggerOptions) as OpenAPIV3.Document

export const swaggerInit = (app: Express): void => {
  app.get('/api-docs/swagger.json', async (_req, res) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: AssessmentNames.fra,
      cycleName: '2020',
    })
    const countryIsos = await CountryRepository.getCountryIsos({ assessment, cycle })

    const cycleParams = swaggerSpec.components?.parameters
    if (cycleParams?.countryIso && 'schema' in cycleParams.countryIso) {
      cycleParams.countryIso.schema = { enum: countryIsos, example: countryIsos[0], type: 'string' }
    }

    res.json(swaggerSpec)
  })

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        defaultModelExpandDepth: 10,
        defaultModelsExpandDepth: 0,
        validatorUrl: null,
      },
      swaggerUrl: '/api-docs/swagger.json',
    })
  )
}
