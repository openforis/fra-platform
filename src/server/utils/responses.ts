import { Response } from 'express'

import { AssessmentFile } from 'meta/assessment'

import Requests from 'server/utils/requests'

const sendAssessmentFile = (res: Response, assessmentFile: AssessmentFile): void => {
  if (assessmentFile?.file) {
    const fileName = encodeURIComponent(assessmentFile.fileName)

    res.setHeader('Content-Disposition', `attachment; filename*=utf-8''${fileName}`)

    res.end(assessmentFile.file, 'binary')
  } else {
    Requests.send404(res)
  }
}
export const Responses = {
  sendAssessmentFile,
}
