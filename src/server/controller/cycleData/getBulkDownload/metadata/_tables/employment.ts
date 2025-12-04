import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { BulkDownloadTable, BulkDownloadVariable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

const variables: Array<BulkDownloadVariable> = [
  {
    variableName: 'employment_in_forestry_and_logging',
    csvColumn: '7a_employment',
  },
  {
    variableName: 'of_which_silviculture_and_other_forestry_activities',
    csvColumn: '7a_emp_forestry',
  },
  {
    variableName: 'of_which_logging',
    csvColumn: '7a_emp_logging',
  },
  {
    variableName: 'of_which_gathering_of_non_wood_forest_products',
    csvColumn: '7a_emp_nwfp',
  },
  {
    variableName: 'of_which_support_services_to_forestry',
    csvColumn: '7a_emp_support',
  },
]

export const getVariables = (variables: Array<BulkDownloadVariable>): Array<BulkDownloadVariable> => {
  return variables.flatMap((variable) => {
    const { csvColumn, variableName } = variable

    return ['total', 'female', 'male'].map((column) => {
      return {
        csvColumn: `${csvColumn}_${column}`,
        variableName,
      }
    })
  })
}

export const getDatum: BulkDownloadTable['getDatum'] = (props) => {
  const { assessmentName, colName, countryIso, csvColumn, cycleName, data, tableName, variableName } = props
  const colNamePostfix = csvColumn.split('_').at(-1)

  return RecordAssessmentDatas.getDatum({
    assessmentName,
    cycleName,
    data,
    countryIso,
    tableName,
    variableName,
    colName: `${colName}_${colNamePostfix}`,
  })
}

export const getEmployment: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
  return {
    getDatum,
    tableName: TableNames.employment,
    variables: getVariables(variables),
  }
}
