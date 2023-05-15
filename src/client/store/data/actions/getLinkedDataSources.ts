import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName, DataSourceLinked, DataSourceLinkedVariable } from '@meta/assessment'

type Params = {
  countryIso: CountryIso
  linkedVariables: Array<DataSourceLinkedVariable>
  sectionName: string
  assessmentName: AssessmentName
  cycleName: CycleName
}

type Returned = {
  dataSources: Array<DataSourceLinked>
  sectionName: string
}

export const getLinkedDataSources = createAsyncThunk<Returned, Params>(
  'section/description/linkedDataSources/get',
  async ({ countryIso, linkedVariables, sectionName }) => {
    const responses = await Promise.all(
      linkedVariables.map((linkedVariable) =>
        axios.get<Array<DataSourceLinked> | null>(ApiEndPoint.CycleData.descriptionsDataSources(), {
          params: { countryIso, ...linkedVariable },
        })
      )
    )

    const dataSources = responses.reduce<Array<DataSourceLinked>>((dataSourcesAcc, response) => {
      const dataSourcesResp = response.data
      if (dataSourcesResp?.length) return [...dataSourcesAcc, ...dataSourcesResp]
      return dataSourcesAcc
    }, [])

    return { dataSources, sectionName }
  }
)
