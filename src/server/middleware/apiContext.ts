import { NextFunction, Request, Response } from 'express'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'

type BaseType = {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  countryIso?: CountryIso
}

const metaCache = true

const initContext = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as BaseType
    const { assessmentName, countryIso, cycleName } = params

    Objects.setInPath({ obj: req, path: ['context'], value: {} })

    if (assessmentName && cycleName) {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })
      Objects.setInPath({ obj: req, path: ['context', 'assessment'], value: assessment })
      Objects.setInPath({ obj: req, path: ['context', 'cycle'], value: cycle })

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
