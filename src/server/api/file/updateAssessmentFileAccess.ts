import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { FileController } from 'server/controller/file'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import Requests from 'server/utils/requests'

export const updateAssessmentFileAccess = async (
  req: CycleRequest<never, { UUIDs: Array<string>; public: boolean }>,
  res: Response
) => {
  try {
    const { assessmentName } = req.query
    const { UUIDs, public: _public } = req.body
    const assessment = await AssessmentRepository.getOne({ assessmentName })
    const user = Requests.getUser(req)

    const updatedFiles = await FileController.updateManyAssessmentFileAccess({
      assessment,
      UUIDs,
      props: { public: _public },
      user,
    })
    Requests.sendOk(res, updatedFiles)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
