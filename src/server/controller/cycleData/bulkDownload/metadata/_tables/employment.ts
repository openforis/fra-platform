import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadColNode, BulkDownloadGetDatum } from 'server/controller/cycleData/bulkDownload/types'

export type EmploymentVariable = Pick<BulkDownloadColNode, 'csvColumn' | 'variableName'>

const variables: Array<EmploymentVariable> = [
  {
    csvColumn: '7a_employment',
    variableName: 'employment_in_forestry_and_logging',
  },
  {
    csvColumn: '7a_emp_forestry',
    variableName: 'of_which_silviculture_and_other_forestry_activities',
  },
  {
    csvColumn: '7a_emp_logging',
    variableName: 'of_which_logging',
  },
  {
    csvColumn: '7a_emp_nwfp',
    variableName: 'of_which_gathering_of_non_wood_forest_products',
  },
  {
    csvColumn: '7a_emp_support',
    variableName: 'of_which_support_services_to_forestry',
  },
]

const getDatum: BulkDownloadGetDatum = (props) => {
  const { assessmentName, colName, countryIso, csvColumn, cycleName, data, tableName, variableName } = props
  const colNamePostfix = csvColumn.split('_').at(-1)

  return RecordAssessmentDatas.getDatum({
    assessmentName,
    cycleName,
    data: data.tables,
    countryIso,
    tableName,
    variableName,
    colName: `${colName}_${colNamePostfix}`,
  })
}

export const getVariables = (
  variables: Array<EmploymentVariable>,
  tableName: TableName
): Array<ColNodeYearsFactory> => {
  return variables.flatMap<ColNodeYearsFactory>((variable) => {
    const { csvColumn, variableName } = variable

    return ['total', 'female', 'male'].map((column) => {
      return {
        csvColumn: `${csvColumn}_${column}`,
        getDatum,
        tableName,
        variableName,
      }
    })
  })
}

export class EmploymentBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    return getVariables(variables, TableNames.employment)
  }
}
