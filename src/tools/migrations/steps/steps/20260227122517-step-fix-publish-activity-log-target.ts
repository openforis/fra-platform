import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

// Migrate incorrect inserted activity log entries
export default async (client: BaseProtocol): Promise<void> => {
  await client.query(`
    update public.activity_log al
    set target = jsonb_build_object(
      'assessment', a.props->>'name',
      'status', al.target->'props'->>'status'
    )
    from public.assessment a
    where al.assessment_uuid = a.uuid
      and al.message = 'assessmentStatusUpdate'
--       look for full country objects by checking that target contains key countryIso
      and al.target ? 'countryIso'
  `)

  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const countries = await AreaController.getCountries({ assessment, cycle }, client)

      await Promises.each(countries, (country) =>
        CountryActivityLogRepository.refreshMaterializedView(
          { assessment, cycle, countryIso: country.countryIso },
          client
        )
      )
    })
  )
}
