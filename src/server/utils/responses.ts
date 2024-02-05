import { Response } from 'express'

import { AssessmentFile } from 'meta/assessment'

import Requests from 'server/utils/requests'

/**
 * @deprecated
 */
const sendAssessmentFile = (res: Response, assessmentFile: AssessmentFile): void => {
  if (assessmentFile?.file) {
    const fileName = encodeURIComponent(assessmentFile.fileName)

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"; filename*=utf-8''${fileName}`)
    res.end(assessmentFile.file, 'binary')
  } else {
    Requests.send404(res)
  }
}

const sendFile = (res: Response, fileName: string, file: Buffer): void => {
  if (file) {
    const _fileName = encodeURIComponent(fileName)
    res.setHeader('Content-Disposition', `attachment; filename="${_fileName}"; filename*=utf-8''${_fileName}`)
    res.end(file, 'binary')
  } else {
    Requests.send404(res)
  }
}

export const Responses = {
  sendAssessmentFile,
  sendFile,
}
