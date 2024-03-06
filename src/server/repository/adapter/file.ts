import { Objects } from 'utils/objects'

import { File } from 'meta/file'

export type FileDB = {
  created_at: string
  file?: Buffer
  id: number
  name: string
  size: number
  uuid: string
}

export const FileAdapter = (fileDB: FileDB): File => {
  const { file, ...rest } = fileDB

  return {
    ...Objects.camelize(rest),
    file,
  }
}
