import { NextFunction, Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CountryRepository } from 'server/repository/assessmentCycle/country'

type BaseType = {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  countryIso?: CountryIso
}

const initContext = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as BaseType
    const { assessmentName, cycleName, countryIso } = params

    Objects.setInPath({ obj: req, path: ['context'], value: {} })

    if (assessmentName && cycleName) {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
      Objects.setInPath({ obj: req, path: ['context', 'assessment'], value: assessment })
      Objects.setInPath({ obj: req, path: ['context', 'cycle'], value: cycle })

      if (countryIso) {
        const country = await CountryRepository.getOne({ assessment, cycle, countryIso })
        Objects.setInPath({ obj: req, path: ['context', 'country'], value: country })
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

export const ApiContextMiddleware = {
  initContext,
}
