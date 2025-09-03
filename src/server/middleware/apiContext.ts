import { NextFunction, Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'

type BaseType = {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  countryIso?: CountryIso
}

const initContext = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as BaseType
    const { assessmentName, countryIso, cycleName } = params

    Objects.setInPath({ obj: req, path: ['context'], value: {} })

    if (assessmentName && cycleName) {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
      Objects.setInPath({ obj: req, path: ['context', 'assessment'], value: assessment })

      if (countryIso && Areas.isISOCountry(countryIso)) {
        const country = await AreaController.getCountry({ assessment, cycle, countryIso })
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
