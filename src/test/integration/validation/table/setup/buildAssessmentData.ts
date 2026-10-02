import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'

import { TableValidationTestCase } from '../types'

type Props = Pick<TableValidationTestCase, 'data' | 'previousCycleData'> & {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

type CycleNodeUpdate = NodeUpdate & { cycleName: CycleName }

export const buildAssessmentData = (props: Props): RecordAssessmentData => {
  const { assessment, countryIso, cycle, data, previousCycleData = [] } = props
  const { name: assessmentName } = assessment.props
  const previousCycle = Cycles.getPreviousCycle({ assessment, cycle })

  const nodes: Array<CycleNodeUpdate> = [
    ...data.map<CycleNodeUpdate>((node) => ({ ...node, cycleName: cycle.name })),
    ...previousCycleData.map<CycleNodeUpdate>((node) => ({ ...node, cycleName: previousCycle.name })),
  ]

  return nodes.reduce<RecordAssessmentData>((acc, node) => {
    const { colName, cycleName, tableName, value, variableName } = node
    const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
    Objects.setInPath({ obj: acc, path, value })
    return acc
  }, {})
}
