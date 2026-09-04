import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { VariablesCache } from 'meta/assessment/metaCache'

import { TableValidationTestCase } from '../types'

type Props = Pick<TableValidationTestCase, 'rows'>

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

const cycle: Cycle = {
  assessmentUuid: 'validation-test-assessment-uuid',
  id: 1,
  name: CycleNames._2025,
  props: {
    dateCreated: '2026-01-01T00:00:00.000Z',
    dateDraft: '2026-01-01T00:00:00.000Z',
    status: CycleStatus.draft,
  },
  uuid: 'validation-test-cycle-uuid',
}

export const buildAssessment = (props: Props): Returned => {
  const { rows } = props

  const variablesByTable = rows.reduce<VariablesCache>((acc, row) => {
    const { tableName, variableName } = row
    acc[tableName] = { ...acc[tableName], [variableName]: { tableName, variableName } }
    return acc
  }, {})

  const assessment: Assessment = {
    cycleIndexes: { name: { [cycle.name]: 0 }, uuid: { [cycle.uuid]: 0 } },
    cycles: [cycle],
    id: 1,
    metaCache: {
      [cycle.uuid]: {
        calculations: { dependants: {}, dependencies: {} },
        enablers: { dependants: {}, dependencies: {} },
        validations: { dependants: {}, dependencies: {} },
        variablesByTable,
      },
    },
    props: { name: AssessmentNames.fra },
    uuid: cycle.assessmentUuid,
  }

  return { assessment, cycle }
}
