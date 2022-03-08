import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { AssessmentName, NodeValue, TableData } from '@meta/assessment'
import { Functions } from '@core/utils'
// import { TableDatas } from '@meta/data'

export const updateNodeValue = createAsyncThunk<
  TableData,
  {
    assessmentName: AssessmentName
    countryIso: CountryIso
    colName: string
    cycleName: string
    sectionName: string
    tableName: string
    variableName: string
    value: NodeValue
    // TODO support multiple values
    // values: Array<NodeValue>
  }
>(
  'section/patch/nodeValue',
  async ({ assessmentName, countryIso, colName, cycleName, sectionName, tableName, variableName, value }) => {
    const { data } = await Functions.debounce(
      async () =>
        axios.patch(
          ApiEndPoint.CycleData.PersistNode.one(),
          {
            variableName,
            value,
          },
          {
            params: {
              assessmentName,
              countryIso,
              colName,
              cycleName,
              sectionName,
              tableName,
              variableName,
              value,
            },
          }
        ),
      800
    )()

    return data?.data

    // // TODO: Remove after websocket implemented
    // const { data } = getState().pages.assessmentSection
    // return data
    // return TableDatas.updateDatum({
    //   data,
    //   countryIso,
    //   tableName,
    //   variableName,
    //   colName,
    //   value,
    // })
  }
)
