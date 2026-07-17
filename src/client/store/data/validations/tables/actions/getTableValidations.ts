import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'

import { updateValidationSummary } from 'client/store/data/validations/summary/actions/updateValidationSummary'
import { setNodeValueValidations } from 'client/store/data/validations/tables/actions/setNodeValueValidations'
import { ThunkApiConfig } from 'client/store/types'

type Props = CountryParams & {
  sectionName: SectionName
  tableNames: Array<TableName>
}

export const getTableValidations = createAsyncThunk<void, Props, ThunkApiConfig>(
  'validations/tables/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, sectionName, tableNames } = props
    const params = { assessmentName, countryIso, cycleName, sectionName, tableNames }

    const { data } = await axios.get<RecordTableValidationsState>(ApiEndPoint.CycleData.Validations.tableData(), {
      params,
    })

    dispatch(setNodeValueValidations({ assessmentName, cycleName, countryIso, tableValidations: data }))
    dispatch(updateValidationSummary({ assessmentName, countryIso, cycleName, tableValidations: data }))
  }
)
