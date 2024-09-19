import { AssessmentNames, CycleProps, CycleStatus } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'
import { CycleRepository } from 'server/repository/assessmentCycle/cycle'

// Given official dates are: published and editing
// dateCreated: same year, first day of the year (1st January)
// dateDraft: previous year, first day of the year (1st January)

const cycleProps: Record<string, Record<string, CycleProps>> = {
  [AssessmentNames.fra]: {
    '2020': {
      status: CycleStatus.published,
      dateCreated: new Date('2018-01-01').toISOString(),
      dateDraft: new Date('2017-01-01').toISOString(),
      dateEditing: new Date('2018-03-05').toISOString(),
      datePublished: new Date('2020-07-21').toISOString(),
    },
    '2025': {
      status: CycleStatus.editing,
      dateCreated: new Date('2022-01-01').toISOString(),
      dateDraft: new Date('2021-01-01').toISOString(),
      dateEditing: new Date('2022-03-02').toISOString(),
      datePublished: undefined,
    },
  },
  [AssessmentNames.panEuropean]: {
    '2020': {
      status: CycleStatus.published,
      dateCreated: new Date('2018-01-01').toISOString(),
      dateDraft: new Date('2017-01-01').toISOString(),
      dateEditing: new Date('2018-04-18').toISOString(),
      datePublished: new Date('2020-12-17').toISOString(),
    },
    '2025': {
      status: CycleStatus.editing,
      dateCreated: new Date('2023-01-01').toISOString(),
      dateDraft: new Date('2022-01-01').toISOString(),
      dateEditing: new Date('2023-09-12').toISOString(),
      datePublished: undefined,
    },
  },
}

export default async (client: BaseProtocol) => {
  const exists = await client.oneOrNone(`
    select 1 as exists
    from information_schema.columns
    where table_name='assessment_cycle' and column_name='published'
  `)

  if (exists) {
    throw new Error('Column public.assessment_cycle.published exists. Check that migration-public ran correctly')
  }

  const assessments = await AssessmentController.getAll({})

  await Promise.all(
    assessments.map(async (assessment) => {
      assessment.cycles.map(async (cycle) => {
        const assessmentName = assessment.props.name
        const cycleName = cycle.name
        const props = cycleProps[assessmentName][cycleName]
        await CycleRepository.update({ cycle: { ...cycle, props } }, client)
      })
    })
  )
}
