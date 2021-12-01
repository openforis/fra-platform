import { createAsyncThunk } from '@reduxjs/toolkit'
import { CountryState } from '@webapp/store/country/countryStateType'

import { AppDispatch } from '@webapp/store'
import { AppActions } from '@webapp/store/app'
import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '@webapp/../../../../client/components/error/actions'
import { CountryIso } from '@core/country'
import { AssessmentType } from '@core/assessment'

export type initCountryPayloadType = {
  countryIso: CountryIso
  assessmentType: AssessmentType
  printView: boolean
  printOnlyTablesView?: boolean
}

export const initCountry = createAsyncThunk<CountryState, initCountryPayloadType, { dispatch: AppDispatch }>(
  'country/init',
  async ({ countryIso, assessmentType, printView, printOnlyTablesView }, { dispatch }) => {
    try {
      const { data: status } = await axios.get(ApiEndPoint.Country.getOverviewStatus(countryIso))

      const { data: config } = await axios.get(ApiEndPoint.Country.getConfig(countryIso))
      dispatch(AppActions.updateCountryIso({ countryIso, assessmentType, printView, printOnlyTablesView }))
      return {
        status,
        config,
      }
    } catch (err) {
      dispatch(applicationError(err))
      return {}
    }
  }
)
