import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data/recordData'

import { Props } from 'client/store/data/tableData/nodeValues/actions/getTableDataProps'

export const getTableDataHistory = createAsyncThunk<
  RecordAssessmentData,
  Props & { countryIso: CountryIso; sectionName: SectionName }
>('data/history/tableData/get', async (props) => {
  const { assessmentName, countryIso, cycleName, sectionName, tableNames } = props

  const params = { assessmentName, countryIso, cycleName, tableNames, sectionName }
  const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableDataHistory(), { params })

  return data
})
