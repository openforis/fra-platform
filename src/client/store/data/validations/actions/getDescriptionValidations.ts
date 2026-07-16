import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'

import { setDescriptionValidations } from 'client/store/data/validations/actions/setDescriptionValidations'

type Props = CountryParams & {
  sectionName: SectionName
}

export const getDescriptionValidations = createAsyncThunk<void, Props>(
  'validations/descriptionData/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, sectionName } = props

    const params = { assessmentName, countryIso, cycleName, sectionName }
    const { data: descriptionValidations } = await axios.get<RecordDescriptionValidations>(
      ApiEndPoint.CycleData.Validations.descriptions(),
      { params }
    )
    const sectionNames = [sectionName]

    dispatch(setDescriptionValidations({ assessmentName, countryIso, cycleName, descriptionValidations, sectionNames }))
  }
)
