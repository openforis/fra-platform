import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { NodesBody } from 'meta/api/request/cycleData/table'
import { Assessments } from 'meta/assessment/assessments'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'

import { setNodeValues } from 'client/store/data/tableData/nodeValues/actions/setNodeValues'
import { MetadataSelectors } from 'client/store/meta/selectors'
import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams & NodesBody

const patchNodeValues = (id: string): ReturnType<typeof Functions.debounce> =>
  Functions.debounce(
    async ({ tableName, values, ...params }: Props) => {
      try {
        await axios.patch(ApiEndPoint.CycleData.Table.nodes(), { tableName, values }, { params })
      } catch (e) {
        // placeholder to avoid app crash
      }
    },
    1000,
    id
  )

const getDebounceId = (props: Props): string =>
  `${props.countryIso}-${props.tableName}-${props.values[0].variableName}-${props.values[0].colName}`

export const updateNodeValues = createAsyncThunk<void, Props, ThunkApiConfig>(
  'data/tableData/nodeValues/update',
  (props, { dispatch, getState }) => {
    const { assessmentName, cycleName } = props
    patchNodeValues(getDebounceId(props))(props)

    // reset mirror variable value if available -> fasten calculations client side
    const state = getState()
    const assessment = MetadataSelectors.getAssessment(state, assessmentName)
    const cycle = Assessments.getCycle({ assessment, cycleName })
    const { countryIso, tableName, values } = props
    const nodes = values.reduce<Array<NodeUpdate>>((nodesAcc, node) => {
      const { colName, variableName } = node
      const paramsMirror = { assessment, cycle, tableName, variableName }
      const mirrorVariable = AssessmentMetaCaches.getCalculationMirrorVariable(paramsMirror)
      if (mirrorVariable) {
        nodesAcc.push({
          tableName: mirrorVariable.tableName,
          variableName: mirrorVariable.variableName,
          colName,
          value: { raw: null, calculated: true },
        })
      }
      return nodesAcc
    }, [])
    if (nodes.length > 0) {
      const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
      dispatch(setNodeValues({ nodeUpdates }))
    }
  }
)
