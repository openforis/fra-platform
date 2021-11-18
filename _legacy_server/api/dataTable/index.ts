import { Express } from 'express'
import { DataTableCreate } from '@server/api/dataTable/create'
import { DataTableRead } from '@server/api/dataTable/read'

export const DataTableApi = {
  init: (express: Express): void => {
    DataTableCreate.init(express)
    DataTableRead.init(express)
  },
}
