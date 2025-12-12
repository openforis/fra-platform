import { Buffers } from 'server/utils/buffers'

type BufferToPdfMulterFileProps = {
  bufferView: ArrayBufferView
  fileName: string
}

export const bufferToPdfMulterFile = (props: BufferToPdfMulterFileProps): Express.Multer.File => {
  const { bufferView, fileName } = props

  const buffer = Buffers.fromBufferView({ bufferView })

  return {
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
}
