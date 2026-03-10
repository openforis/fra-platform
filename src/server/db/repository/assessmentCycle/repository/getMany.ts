import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  countryIso?: AreaCode
  cycle: Cycle
  global: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItem>> => {
  const { assessment, countryIso, cycle, global } = props
  const assessmentUuid = assessment.uuid
  const cycleUuids = Cycles.getPreviousAndSelfCycles({ assessment, cycle }).map((c) => c.uuid)

  // newest first: pick the most "fresh" global item (e.g. if two global items with the same name -> return newest)
  const globalQuery = `
    select * from (
      select distinct on (coalesce(r.link, r.props -> 'translation' ->> 'en')) r.*
      from public.repository r
      join public.assessment_cycle ac on ac.uuid = r.cycle_uuid
      where r.assessment_uuid = $(assessmentUuid)
        and r.country_iso is null
        and r.cycle_uuid in ($(cycleUuids:list))
        and (r.props ->> 'hidden')::boolean is not true
      order by coalesce(r.link, r.props -> 'translation' ->> 'en'),
               ac.id desc
    ) as deduped
    order by id
  `

  const countryQuery = `
    select * from public.repository
    where assessment_uuid = $(assessmentUuid)
      and country_iso = $(countryIso)
      and cycle_uuid in ($(cycleUuids:list))
      and (props ->> 'hidden')::boolean is not true
    order by id
  `

  return client.map<RepositoryItem>(
    global ? globalQuery : countryQuery,
    { assessmentUuid, countryIso, cycleUuids },
    (row) => Objects.camelize(row)
  )
}
