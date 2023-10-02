import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams, NodesBody } from 'meta/api/request'
import { AssessmentMetaCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AssessmentSelectors } from 'client/store/assessment/selectors'
import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams & NodesBody

const patchNodeValues = (id: string) =>
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

const getDebounceId = (props: Props) =>
  `${props.countryIso}-${props.tableName}-${props.values[0].variableName}-${props.values[0].colName}`

export const updateNodeValues = createAsyncThunk<void, Props, ThunkApiConfig>(
  'section/nodeValues/update',
  (props, { dispatch, getState }) => {
    const { assessmentName, cycleName } = props
    patchNodeValues(getDebounceId(props))(props)

    // reset mirror variable value if available -> fasten calculations client side
    const state = getState()
    const assessment = AssessmentSelectors.getAssessment(state, assessmentName)
    const cycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
    const { countryIso, tableName, values } = props
    const nodes = values.reduce<Array<NodeUpdate>>((nodesAcc, node) => {
      const { variableName, colName } = node
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
