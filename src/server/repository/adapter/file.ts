import { Objects } from 'utils/objects'

import { File } from 'meta/file'

export type FileDB = {
  id: number
  uuid: string
  name: string
  file: Buffer
  created_at: string
}

export const FileAdapter = (fileDB: FileDB): File => {
  const { file, ...rest } = fileDB
  return {
    ...Objects.camelize(rest),
    file,
  }
}
