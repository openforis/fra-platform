import { NextFunction, Request, Response } from 'express'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

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
    // ensure body is always set
    if (!req.body) {
      Objects.set(req, 'body', {})
    }

    const params = { ...req.params, ...req.query, ...req.body } as BaseType
    const { assessmentName, countryIso, cycleName } = params

    Objects.setInPath({ obj: req, path: ['context'], value: {} })

    let assessment: Assessment
    if (assessmentName) {
      assessment = await AssessmentController.getOne({ assessmentName, metaCache })
      Objects.setInPath({ obj: req, path: ['context', 'assessment'], value: assessment })
    }

    if (assessment && cycleName) {
      const cycle = Assessments.getCycle({ assessment, cycleName })
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
