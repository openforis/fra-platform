import { Readable } from 'stream'
import { Response } from 'express'
import * as JSZip from 'jszip'

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

const sendZip = async (res: Response, files: Array<{ fileName: string; file: Readable }>): Promise<void> => {
  const zip = new JSZip()

  files.forEach(({ fileName, file }) => {
    zip.file(fileName, file)
  })

  const zipFile = await zip.generateAsync({ type: 'nodebuffer' })

  res.setHeader('Content-Disposition', `attachment; filename="files.zip"`)
  res.setHeader('Content-Type', 'application/zip')

  res.end(zipFile)
}

const sendFileStream = (res: Response, fileName: string, stream: Readable, contentType?: string): void => {
  const _fileName = encodeURIComponent(fileName)
  res.setHeader('Content-Disposition', `attachment; filename="${_fileName}"; filename*=utf-8''${_fileName}`)
  res.setHeader('Content-Type', contentType || 'application/octet-stream')
  stream.pipe(res)
}

export const Responses = {
  sendFile,
  sendZip,
  sendFileStream,
}
