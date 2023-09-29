import { Objects } from 'utils/objects'

import { ActivityLogMessage } from 'meta/assessment'

import { BaseProtocol } from 'server/db'

import { ActivityLogEntries } from 'test/migrations/steps/step-update-activity-log-2025-odp/type'

type Props = { idLegacy: string }
const _getOdpFRA2020 = async (props: Props, client: BaseProtocol) => {
  const { idLegacy } = props

  return client.one(
    `
      select o.*
      from assessment_fra_2020.original_data_point o
      where o.id_legacy = $1
  `,
    [idLegacy],
    Objects.camelize
  )
}

export const getActivityLogEntries = async (client: BaseProtocol): Promise<ActivityLogEntries> => {
  const activityLogEntries = await client.many(`
      with activity_log as (select al.*
                            from public.activity_log al
                                     left join public.assessment a on a.uuid = al.assessment_uuid
                                     left join public.assessment_cycle c on c.uuid = al.cycle_uuid
                            where al.message in ('originalDataPointCreate', 'originalDataPointUpdate')
                              and c.name = '2025'
                              and a.props ->> 'name' = 'fra'
                            order by al.time asc)
      select al.country_iso,
             al.target ->> 'id' as odp_id,
             jsonb_agg(al.* order by al.time desc)
                                as activity_log_entries_list
      from activity_log al
      group by 1, 2;
  `)

  // if the last message is not createODP we fetch the ODP using ODP legacy_id from fra_2020.odp table
  for (let i = 0; i < activityLogEntries.length; i += 1) {
    const ale = activityLogEntries[i]
    const lastActivityLogEntry = ale.activity_log_entries_list.at(-1)
    if (
      lastActivityLogEntry.message !== ActivityLogMessage.originalDataPointCreate &&
      lastActivityLogEntry.target.idLegacy
    ) {
      // eslint-disable-next-line no-await-in-loop
      const target = await _getOdpFRA2020({ idLegacy: lastActivityLogEntry.target.idLegacy }, client)

      ale.activity_log_entries_list.push({
        target,
        message: ActivityLogMessage.originalDataPointCreate,
      })
    }
  }

  return activityLogEntries
}
