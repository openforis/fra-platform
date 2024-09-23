import * as archiver from 'archiver'
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

const sendZip = async (
  res: Response,
  files: Array<{ fileName: string; file: Buffer }>,
  fileName = 'files'
): Promise<void> => {
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.zip"`)
  res.setHeader('Content-Type', 'application/zip')

  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(res)

  files.forEach(({ fileName: name, file }) => {
    archive.append(file, { name })
  })

  await archive.finalize()
}

export const Responses = {
  sendFile,
  sendZip,
}
