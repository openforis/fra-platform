import { Assessment, AssessmentNames, CycleIndexes, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle, CycleStatus } from 'meta/assessment/cycle'

import { Context } from './context'

const cycles: Array<Cycle> = [
  {
    id: 1,
    name: '2020',
    uuid: '66817a08-dc93-4151-b5ed-176d8f04e9b7',
    props: {
      status: CycleStatus.published,
      dateDraft: '2017-01-01T00:00:00.000Z',
      dateCreated: '2018-01-01T00:00:00.000Z',
      dateEditing: '2018-03-05T00:00:00.000Z',
      datePublished: '2020-07-21T00:00:00.000Z',
    },
    assessmentId: 1,
    cycleUuidSource: null,
  },
  {
    id: 2,
    name: '2025',
    uuid: '66da2217-da42-492f-9ff4-c99a59e6675c',
    props: {
      status: CycleStatus.editing,
      dateDraft: '2021-01-01T00:00:00.000Z',
      dateCreated: '2022-01-01T00:00:00.000Z',
      dateEditing: '2022-03-02T00:00:00.000Z',
    },
    assessmentId: 1,
    cycleUuidSource: '66817a08-dc93-4151-b5ed-176d8f04e9b7',
  },
  {
    id: 39,
    name: 'latest',
    uuid: '9fa1fd86-b4e3-46e4-bf48-125f082ea501',
    props: {
      status: CycleStatus.draft,
      dateDraft: '2025-02-11T21:20:08.602Z',
      dateCreated: '2025-02-11T21:20:08.602Z',
    },
    assessmentId: 1,
    cycleUuidSource: '66da2217-da42-492f-9ff4-c99a59e6675c',
  },
]
const assessment: Assessment = {
  id: 0,
  uuid: 'uuid-0',
  cycleIndexes: cycles.reduce<CycleIndexes>(
    (acc, cycle, index) => {
      acc.name[cycle.name] = index
      acc.uuid[cycle.uuid] = index
      return acc
    },
    { name: {}, uuid: {} }
  ),
  cycles,
  props: {
    name: AssessmentNames.fra,
  },
}

const assessments: RecordAssessments = {
  [AssessmentNames.fra]: assessment,
}

export const contextMock: Context = {
  assessments,
  assessment,
  cycle: {
    id: 2,
    name: '2025',
    uuid: '66da2217-da42-492f-9ff4-c99a59e6675c',
    props: {
      status: CycleStatus.editing,
      dateDraft: '2021-01-01T00:00:00.000Z',
      dateCreated: '2022-01-01T00:00:00.000Z',
      dateEditing: '2022-03-02T00:00:00.000Z',
    },
    assessmentId: 1,
    cycleUuidSource: '66817a08-dc93-4151-b5ed-176d8f04e9b7',
  },
} as Context
