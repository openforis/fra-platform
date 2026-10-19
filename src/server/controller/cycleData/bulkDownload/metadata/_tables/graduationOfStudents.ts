import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

import { EmploymentVariable, getVariables } from './employment'

const variables: Array<EmploymentVariable> = [
  {
    csvColumn: '7b_phd',
    variableName: 'doctoral_degree',
  },
  {
    csvColumn: '7b_msc',
    variableName: 'masters_degree',
  },
  {
    csvColumn: '7b_ba',
    variableName: 'bachelors_degree',
  },
  {
    csvColumn: '7b_tech',
    variableName: 'technician_certificate',
  },
  {
    csvColumn: '7b_total',
    variableName: 'total',
  },
]

export class GraduationOfStudentsBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    return getVariables(variables, TableNames.graduationOfStudents)
  }
}
