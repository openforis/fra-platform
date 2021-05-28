import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'

import { sendErr } from '../utils/requestUtils'

import { persistFile, getFilesList, getFile, deleteFile } from './fileRepositoryRepository'

import { fileTypes, downloadFile } from './fileRepository'

export const init = (app: any) => {
  // get user guide
}
