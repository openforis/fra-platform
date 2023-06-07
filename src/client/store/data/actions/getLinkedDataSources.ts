import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName, DataSourceLinked, DataSourceLinkedVariable } from 'meta/assessment'

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
      const dataSourcesResp = response.data as Array<DataSourceLinked>
      if (dataSourcesResp?.length) {
        const linkedVariablesNames = linkedVariables.map(({ variableName }) => variableName)
        dataSourcesResp.forEach((dataSource) => {
          const alreadyAdded = Boolean(dataSourcesAcc.find((value) => value.data.uuid === dataSource.data.uuid))
          // do not add duplicates (it's possible two or more linked variables are added to the same data source)
          if (!alreadyAdded) {
            // filters non linked data source variables out
            const variables = dataSource.data.variables.filter((variable) => linkedVariablesNames.includes(variable))
            dataSourcesAcc.push({
              ...dataSource,
              data: { ...dataSource.data, variables },
            })
          }
        })
      }
      return dataSourcesAcc
    }, [])

    return { dataSources, sectionName }
  }
)
