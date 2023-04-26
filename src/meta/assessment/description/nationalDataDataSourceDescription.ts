import { Label } from '@meta/assessment'
import { DataSourceColumn } from '@meta/assessment/description/dataSourceColumn'
import { DataSourceVariables } from '@meta/assessment/description/dataSourceVariables'

/**
 * @deprecated
 */
export interface NationalDataDataSourceDescription {
  table?: { columns: Array<DataSourceColumn>; dataSourceVariables?: DataSourceVariables }
  text?: { readOnly?: boolean }
}

/*
* "dataSources": {
    "text": {
      "readOnly": true
    },
    "table": {
      variables: [ { value: 'natural_expansion'}, { value: 'afforestation'}, { value: 'forest_expansion'}, { value: 'common.otherSpecifyInComments', label: { key: 'common.otherSpecifyInComments' } } ],
      typeOfDataSource: 'dataSourceType',
    }
  }
* */

export interface DataSourceVariable {
  value: string
  label: Label
  prefixLabel?: Label
}

export interface DataSourceDescription {
  table?: {
    variables: Array<DataSourceVariable>
    typeOfDataSourceText?: boolean
  }
  text?: { readOnly?: boolean }
}
