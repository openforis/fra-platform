import { Dates } from 'utils/dates'
import { PropsMerge } from 'tools/cycles/merge/_types'
import { getSchemas } from 'tools/cycles/merge/_utils'

import { CycleRedisRepository } from 'server/cache/repository/cycle'
import { removeMetadata } from 'server/controller/assessment/removeCycle/removeMetadata'
import { BaseProtocol, DB } from 'server/db/db'
import { CycleRepository } from 'server/db/repository/assessmentCycle/cycle'
import { StaticFiles } from 'server/static/staticFiles'

export const deprecateCycleFrom = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { assessment, countryISOs, cycleFrom: cycle } = props

  const { schemaCycleFrom } = getSchemas(props)

  await StaticFiles.removeCycle({ assessment, cycle })
  await removeMetadata({ assessment, cycle }, client)

  await client.query(
    `
        delete
        from users_role
        where assessment_uuid = $(assessmentUuid)
          and cycle_uuid = $(cycleUuid)
          and country_iso in ($(countryISOs:list))
    `,
    { assessmentUuid: assessment.uuid, cycleUuid: cycle.uuid, countryISOs }
  )

  await CycleRedisRepository.removeOne({ assessment, cycle }, client)
  await CycleRepository.remove({ cycle }, client)

  await DB.query(`
    alter schema ${schemaCycleFrom} rename to _legacy_${schemaCycleFrom}_${Dates.format(new Date(), 'yyyyMMdd')};
  `)
}
