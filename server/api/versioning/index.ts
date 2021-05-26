import { Express } from 'express'
import { VersioningCreate } from './create'
import { VersioningDelete } from './delete'
import { VersioningGetAll } from './getAll'
import { VersioningGetLatest } from './getLatest'

export const VersioningApi = {
  init: (express: Express): void => {
    VersioningCreate.init(express)
    VersioningDelete.init(express)
    VersioningGetAll.init(express)
    VersioningGetLatest.init(express)
  },
}
