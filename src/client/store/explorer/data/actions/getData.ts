import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { DimensionName } from 'meta/measurement/dimension'
import { MeasureName } from 'meta/measurement/measure'

type Props = CycleParams & {
  countryISOs: Array<CountryIso>
  dimensions: Array<DimensionName>
  measures: Array<MeasureName>
  sectionName: SectionName
  tableName: TableName
}

type Returned = RecordAssessmentData

export const getData = createAsyncThunk<Returned, Props>('explorer/data/get', async (props) => {
  const { dimensions, measures, tableName } = props

  const params = {
    ...props,
    columns: dimensions,
    tableNames: [tableName],
    variables: measures,
  }
  const { data } = await axios.get<Returned>(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
