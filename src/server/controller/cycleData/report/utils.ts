type BufferToPdfMulterFileProps = {
  buffer: Buffer
  fileName: string
}

export const bufferToPdfMulterFile = (props: BufferToPdfMulterFileProps): Express.Multer.File => {
  const { buffer, fileName } = props

  const multerPdfFile: Express.Multer.File = {
    buffer,
    destination: null,
    encoding: 'base64',
    fieldname: 'pdf',
    filename: null,
    mimetype: 'application/pdf',
    originalname: fileName,
    path: null,
    size: buffer.length,
    stream: null,
  }

  return multerPdfFile
}
