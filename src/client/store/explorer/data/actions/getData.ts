import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { DimensionName } from 'meta/measurement/dimension'
import { Dimensions } from 'meta/measurement/dimensions'
import { MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

type Props = CycleParams & {
  countryISOs: Array<CountryIso>
  dimensions: Array<DimensionName>
  measures: Array<MeasureName>
  sectionName: SectionName
  tableName: TableName
}

type Returned = RecordAssessmentData

export const getData = createAsyncThunk<Returned, Props>('explorer/data/get', async (props) => {
  const { assessmentName, countryISOs, countryIso, cycleName, dimensions, measures, tableName } = props

  const columns = dimensions.map((dimensionName) => Dimensions.dimensionNameToColumnName(dimensionName))
  const variables = measures.map((measureName) => Measures.measureNameToVariableName(measureName))

  const params = {
    assessmentName,
    columns,
    countryIso,
    countryISOs,
    cycleName,
    tableNames: [tableName],
    variables,
  }
  const { data } = await axios.get<Returned>(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
