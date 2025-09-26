import { addCountryRegionLabels } from 'tools/addCountryRegionLabels/addCountryRegionLabels'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { DB, Schemas } from 'server/db'

type UpdateProps = { allCycles: Array<{ assessment: Assessment; cycle: Cycle }> }

const _updateDDL = async (props: UpdateProps): Promise<void> => {
  const { allCycles } = props

  // Update public.country/region tables
  await Promise.all([
    DB.none(`alter table public.country add column if not exists labels jsonb not null default '{}'::jsonb`),
    DB.none(`alter table public.region add column if not exists labels jsonb not null default '{}'::jsonb`),
  ])

  // Update cycle.country/region tables
  await Promise.all(
    allCycles.map(({ assessment, cycle }) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      return Promise.all([
        DB.none(`alter table ${schemaName}.country add column if not exists labels jsonb not null default '{}'::jsonb`),
        DB.none(`alter table ${schemaName}.region add column if not exists labels jsonb not null default '{}'::jsonb`),
      ])
    })
  )
}

export default async (): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, DB)
  const allCycles = assessments.flatMap((assessment) => assessment.cycles.map((cycle) => ({ assessment, cycle })))

  await _updateDDL({ allCycles })

  await addCountryRegionLabels(DB)
}
