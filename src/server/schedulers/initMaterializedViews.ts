import { Job, Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Promises } from 'utils/promises'

import { Areas, CountryIso } from 'meta/area'
import { Assessment, Cycle, Cycles } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import {
  activitiesLastEdit,
  activitiesLastEditOdpData,
} from 'server/repository/assessmentCycle/countrySummary/_lastEditActivities'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

const _getCountryISOsOutOfSync = async (props: {
  assessment: Assessment
  cycle: Cycle
}): Promise<Array<CountryIso>> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const res = await client.map(
    `with al as
              (select al.country_iso
                    , max(al.time) filter (where al.message in (${activitiesLastEdit}))         as last_edit
                    , max(al.time) filter (where al.message in (${activitiesLastEditOdpData})) as last_odp_edit
               from activity_log al
               where al.assessment_uuid = $1
                 and al.cycle_uuid = $2
               group by al.country_iso)
     select cs.country_iso as countryiso
     from ${schemaCycle}.country_summary cs
              left join al on cs.country_iso = al.country_iso
     where ((cs.last_edit is null and (al.last_edit is not null or al.last_odp_edit is not null)) or
            greatest(al.last_edit, al.last_odp_edit) > cs.last_edit)
     order by 1 desc`,
    [assessment.uuid, cycle.uuid],
    ({ countryiso }) => countryiso
  )
  if (Cycles.isPublished(cycle)) return res.filter((countryIso) => !Areas.isAtlantis(countryIso))
  return res
}

export const initMaterializedViews = (connection: IORedis): Worker => {
  const name = 'Scheduler-MaterializedViews'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async (_job: Job) => {
      Logger.info(`[${name}] ** started`)

      const assessments = await AssessmentController.getAll({}, client)

      await Promises.each(assessments, (assessment) =>
        Promises.each(assessment.cycles, async (cycle) => {
          // 1. refresh countries activity log
          const countryISOs = await _getCountryISOsOutOfSync({ assessment, cycle })
          await Promises.each(countryISOs, async (countryIso) => {
            Logger.debug(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshing`)
            await CountryActivityLogRepository.refreshMaterializedView({ assessment, cycle, countryIso })
            Logger.info(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshed`)
          })

          // 2. refresh country summary
          await AreaController.refreshSummaries({ assessment, cycle })
          Logger.info(`[${name}:CountrySummary] ${assessment.props.name} ${cycle.name} refreshed`)
        })
      )

      Logger.info(`[${name}] ** terminated`)
    },
    { concurrency: 1, connection, lockDuration: 10_000, maxStalledCount: 0 }
  )

  queue.add(`${name}-immediate`, undefined, { removeOnComplete: true, removeOnFail: false })
  queue.add(`${name}-scheduler`, undefined, {
    repeat: { every: 1000 * 60 * 60 },
    removeOnComplete: true,
    removeOnFail: false,
  })

  return worker
}
