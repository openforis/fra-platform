import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data'

import { Props } from 'client/store/data/actions/getTableDataProps'

export const getTableDataHistory = createAsyncThunk<RecordAssessmentData, Props & { sectionName: SectionName }>(
  'data/history/tableData/get',
  async (props) => {
    const { assessmentName, countryISOs, countryIso, cycleName, sectionName, tableNames } = props

    const params = {
      assessmentName,
      countryIso,
      cycleName,
      tableNames,
      countryISOs: countryISOs ?? [countryIso],
      sectionName,
    }
    const { data } = await axios.get(ApiEndPoint.CycleData.Table.tableDataHistory(), { params })

    return data
  }
)
