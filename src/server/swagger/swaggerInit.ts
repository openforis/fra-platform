import { Express } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { SwaggerUiOptions } from 'swagger-ui-express'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'

import { swaggerOptions } from 'docs/api/swagger.config'
import { swaggerPanEuropeanOptions } from 'docs/api/swaggerPanEuropean.config'

import { AssessmentController } from 'server/controller/assessment'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { buildPanEuropeanDataSchemas } from 'server/swagger/scripts/buildPanEuropeanDataSchemas'
import { panEuropeanSwaggerUiCustomJs } from 'server/swagger/scripts/panEuropeanSwaggerUiCustomJs'

const swaggerSpec = swaggerJSDoc(swaggerOptions) as OpenAPIV3.Document
const panEuropeanSwaggerSpec = swaggerJSDoc(swaggerPanEuropeanOptions) as OpenAPIV3.Document

const commonUiOptions: SwaggerUiOptions = {
  swaggerOptions: {
    defaultModelExpandDepth: 10,
    defaultModelsExpandDepth: 0,
    validatorUrl: null,
    url: '/api-docs/swagger.json',
  },
}

const panEuropeanUiOptions: SwaggerUiOptions = {
  swaggerOptions: { ...commonUiOptions.swaggerOptions, url: '/panEuropean-api-docs/swagger.json' },
  customJs: '/panEuropean-api-docs/custom.js',
}

const _updateCountryIsoParameter = (spec: OpenAPIV3.Document, countryIsos: Array<string>): void => {
  const cycleParams = spec.components?.parameters
  if (cycleParams?.countryIso && 'schema' in cycleParams.countryIso) {
    cycleParams.countryIso.schema = {
      enum: countryIsos,
      example: countryIsos[0],
      type: 'string',
    }
  }
}

export const swaggerInit = (app: Express): void => {
  app.get('/api-docs/swagger.json', async (_req, res) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName: AssessmentNames.fra,
      cycleName: '2020',
    })
    const countryIsos = await CountryRepository.getCountryIsos({ assessment, cycle })
    _updateCountryIsoParameter(swaggerSpec, countryIsos)

    res.json(swaggerSpec)
  })

  app.get('/panEuropean-api-docs/swagger.json', async (_req, res) => {
    const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.panEuropean })
    const cycle = Assessments.getLastPublishedCycle(assessment)
    const countryIsos = await CountryRepository.getCountryIsos({ assessment, cycle })
    _updateCountryIsoParameter(panEuropeanSwaggerSpec, countryIsos)
    await buildPanEuropeanDataSchemas({ assessment, cycle, spec: panEuropeanSwaggerSpec })

    res.json(panEuropeanSwaggerSpec)
  })

  app.get('/panEuropean-api-docs/custom.js', (_req, res) => {
    res.type('application/javascript').send(panEuropeanSwaggerUiCustomJs)
  })

  app.use('/api-docs', swaggerUi.serveFiles(null, commonUiOptions), swaggerUi.setup(null, commonUiOptions))

  app.use(
    '/panEuropean-api-docs',
    swaggerUi.serveFiles(null, panEuropeanUiOptions),
    swaggerUi.setup(null, panEuropeanUiOptions)
  )
}
