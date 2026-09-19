import { BaseProtocol } from 'server/db/db'

import { recreateCountryActivityLogViews } from './utils/recreateCountryActivityLogViews'

export default async (client: BaseProtocol): Promise<void> => {
  await recreateCountryActivityLogViews(client)
}
