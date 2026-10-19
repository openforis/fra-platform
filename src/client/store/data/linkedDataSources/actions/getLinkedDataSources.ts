import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { DataSourceLinkedVariable } from 'meta/assessment/description'
import { DataSourceLinked } from 'meta/assessment/descriptionValue/dataSource'

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
  'data/linkedDataSources/get',
  async ({ assessmentName, countryIso, cycleName, linkedVariables, sectionName }) => {
    const responses = await Promise.all(
      linkedVariables.map((linkedVariable) =>
        axios.get<Array<DataSourceLinked> | null>(ApiEndPoint.CycleData.Descriptions.DataSources.many(), {
          params: { countryIso, assessmentName, cycleName, linkedVariable: JSON.stringify(linkedVariable) },
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
