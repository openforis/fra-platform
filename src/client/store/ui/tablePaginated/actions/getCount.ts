import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'
import { TablePaginatedFilterValues } from 'meta/tablePaginated'
import { encodeFilters } from 'meta/tablePaginated/utils'

type Props = {
  assessmentName: AssessmentName
  countryIso?: AreaCode
  cycleName: CycleName
  filters?: Record<string, TablePaginatedFilterValues>
  path: string
  sectionName?: SectionName
}

type Returned = {
  total: number
}

export const getCount = createAsyncThunk<Returned, Props>('tablePaginated/count/get', async (props) => {
  const { assessmentName, countryIso, cycleName, filters, path, sectionName } = props

  const encodedFilters = encodeFilters(filters)

  const params: Record<string, string> = { assessmentName, countryIso, cycleName, filters: encodedFilters, sectionName }

  const { data } = await axios.get<Returned>(`${path}/count`, { params })

  return data
})
