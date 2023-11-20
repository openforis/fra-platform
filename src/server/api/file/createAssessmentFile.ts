import { Response } from 'express'

import { AssessmentFileBody, CycleRequest } from 'meta/api/request'
import { AssessmentFileProps } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { FileController } from 'server/controller/file'
import { Requests } from 'server/utils'

export const createAssessmentFile = async (req: CycleRequest<never, AssessmentFileBody>, res: Response) => {
  try {
    const { file } = req
    const { assessmentName, fileCountryIso, props: _props } = req.body
    const props: AssessmentFileProps = _props ? JSON.parse(_props) : {}

    const user = Requests.getUser(req)
    const assessment = await AssessmentController.getOne({ assessmentName })

    const createAssessmentFileProps = { assessment, file, countryIso: fileCountryIso, user, props }
    const createdAssessmentFile = await FileController.createAssessmentFile(createAssessmentFileProps)

    Requests.sendOk(res, createdAssessmentFile)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
