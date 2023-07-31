import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams, NodesBody } from 'meta/api/request'
import { Assessment, AssessmentMetaCaches } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { setNodeValues } from 'client/store/data/actions/setNodeValues'
import { RootState } from 'client/store/RootState'

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

export const updateNodeValues = createAsyncThunk<void, Props>(
  'section/nodeValues/update',
  (props, { dispatch, getState }) => {
    patchNodeValues(getDebounceId(props))(props)

    // reset mirror variable value if available -> fasten calculations client side
    const state = getState() as RootState
    const assessment = state.assessment.assessment as Assessment
    const cycle = assessment.cycles.find((cycle) => cycle.name === props.cycleName)
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
      const nodeUpdates: NodeUpdates = { assessment, cycle, countryIso, nodes }
      dispatch(setNodeValues({ nodeUpdates }))
    }
  }
)
