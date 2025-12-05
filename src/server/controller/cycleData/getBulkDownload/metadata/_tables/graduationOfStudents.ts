import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import { BulkDownloadVariable } from 'server/controller/cycleData/getBulkDownload/types'

import { getDatum, getVariables } from './employment'

const variables: Array<BulkDownloadVariable> = [
  {
    variableName: 'doctoral_degree',
    csvColumn: '7b_phd',
  },
  {
    variableName: 'masters_degree',
    csvColumn: '7b_msc',
  },
  {
    variableName: 'bachelors_degree',
    csvColumn: '7b_ba',
  },
  {
    variableName: 'technician_certificate',
    csvColumn: '7b_tech',
  },
  {
    variableName: 'total',
    csvColumn: '7b_total',
  },
]

export const getGraduationOfStudents: BulkDownloadTableFactory = (_props) => {
  return {
    getDatum,
    tableName: TableNames.graduationOfStudents,
    variables: getVariables(variables),
  }
}
