import { Objects } from 'utils/objects'

import { File } from 'meta/file'

export type FileDB = {
  created_at: string
  id: number
  name: string
  size: number
  uuid: string
}

export const FileAdapter = (fileDB: FileDB): File => {
  return Objects.camelize(fileDB)
}
