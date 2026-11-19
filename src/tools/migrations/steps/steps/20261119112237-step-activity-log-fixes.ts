import { Assessment } from 'meta/assessment/assessment'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { recreateCountryActivityLogViews } from './utils/recreateCountryActivityLogViews'

const wrapDescriptionTarget = async (client: BaseProtocol): Promise<void> => {
  await client.query(`
      update public.activity_log
      set target = jsonb_set(target, '{description}', jsonb_build_object('value', target -> 'description'))
      where message = 'descriptionUpdate'
        and jsonb_typeof(target -> 'description') = 'object'
        and not (target -> 'description' ? 'value')
  `)
}

const backfillEstimationTarget = async (assessments: Array<Assessment>, client: BaseProtocol): Promise<void> => {
  // createdAt in JS Date.toISOString() format (e.g. 2024-10-03T13:06:00.225Z)
  // same format as the new logs save in .../persistNodeValues/persistNodeValuesEstimated.ts
  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, (cycle) =>
      client.query(
        `
          update public.activity_log al
          set target = al.target || jsonb_build_object(
            'countryIso', e.country_iso,
            'createdAt', to_char(e.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
            'id', e.id)
          from ${Schemas.getNameCycle(assessment, cycle)}.node_values_estimation e
          where al.message = 'nodeValuesEstimationCreate'
            and al.cycle_uuid = $(cycleUuid)
            and al.target ->> 'uuid' = e.uuid::text
            and not (al.target ? 'countryIso')
        `,
        { cycleUuid: cycle.uuid }
      )
    )
  )
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await wrapDescriptionTarget(client)
  await backfillEstimationTarget(assessments, client)
  await recreateCountryActivityLogViews(client)
}
