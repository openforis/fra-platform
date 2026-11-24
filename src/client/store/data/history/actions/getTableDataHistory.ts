import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data/recordData'

type Props = CountryParams & {
  sectionName: SectionName
  tableNames: Array<string>
}

export const getTableDataHistory = createAsyncThunk<RecordAssessmentData, Props>(
  'data/history/tableData/get',
  async (props) => {
    const { assessmentName, countryIso, cycleName, sectionName, tableNames } = props

    const params = {
      assessmentName,
      countryIso,
      cycleName,
      tableNames,
      countryISOs: [countryIso],
      sectionName,
    }
    const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableDataHistory(), { params })

    return data
  }
)
