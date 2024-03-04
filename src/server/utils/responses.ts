import { Response } from 'express'

import Requests from 'server/utils/requests'

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
  sendFile,
}
