import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { DimensionName } from 'meta/measurement/dimension'
import { Dimensions } from 'meta/measurement/dimensions'
import { MeasureName } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

type Props = CountryParams & {
  countryISOs: Array<CountryIso>
  dimensions: Array<DimensionName>
  fetchLastPublished: boolean
  measures: Array<MeasureName>
  sectionName: SectionName
  tableName: TableName
}

type Returned = RecordAssessmentData

export const getData = createAsyncThunk<Returned, Props>('explorer/data/get', async (props) => {
  const { assessmentName, countryISOs, countryIso, cycleName, dimensions, fetchLastPublished, measures, tableName } =
    props

  const columns = dimensions.map((dimensionName) => Dimensions.dimensionNameToColumnName(dimensionName))
  const variables = measures.map((measureName) => Measures.measureNameToVariableName(measureName))
  const tableNames = [tableName]
  const params = { assessmentName, columns, countryISOs, tableNames, variables }

  if (fetchLastPublished) {
    const { data } = await axios.get<Returned>(ApiEndPoint.Explorer.data(), { params })
    return data
  }

  Objects.set(params, 'countryIso', countryIso)
  Objects.set(params, 'cycleName', cycleName)
  const { data } = await axios.get<Returned>(ApiEndPoint.CycleData.Table.tableData(), { params })

  return data
})
