import { BaseProtocol } from 'server/db/db'

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

export default async (client: BaseProtocol): Promise<void> => {
  await wrapDescriptionTarget(client)
  await recreateCountryActivityLogViews(client)
}
