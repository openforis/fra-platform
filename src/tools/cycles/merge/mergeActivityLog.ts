import { PropsMerge } from 'tools/cycles/merge/_types'

import { BaseProtocol } from 'server/db/db'

export const mergeActivityLog = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { cycleFrom, cycleTo } = props

  const params = { cycleUuidFrom: cycleFrom.uuid, cycleUuidTo: cycleTo.uuid }

  await client.query(
    `
        update public.activity_log
        set cycle_uuid = $(cycleUuidTo)
        where cycle_uuid = $(cycleUuidFrom);
    `,
    params
  )
}
