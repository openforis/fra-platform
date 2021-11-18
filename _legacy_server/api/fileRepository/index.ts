import { Express } from 'express'
import { FileRepositoryCreate } from '@server/api/fileRepository/create'
import { FileRepositoryDelete } from '@server/api/fileRepository/delete'
import { FileRepositoryGet } from '@server/api/fileRepository/get'
import { FileRepositoryGetDataDownload } from '@server/api/fileRepository/getDataDownload'
import { FileRepositoryGetFileList } from '@server/api/fileRepository/getFileList'
import { FileRepositoryGetStatisticalFactsheets } from '@server/api/fileRepository/getStatisticalFactsheets'
import { FileRepositoryGetUserGuide } from '@server/api/fileRepository/getUserGuide'

export const FileRepositoryApi = {
  init: (express: Express): void => {
    FileRepositoryCreate.init(express)
    FileRepositoryDelete.init(express)
    FileRepositoryGet.init(express)
    FileRepositoryGetDataDownload.init(express)
    FileRepositoryGetFileList.init(express)
    FileRepositoryGetStatisticalFactsheets.init(express)
    FileRepositoryGetUserGuide.init(express)
  },
}
