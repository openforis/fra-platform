import { Objects } from 'utils/objects'

import { Settings } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

export const read = async (client: BaseProtocol = DB): Promise<Settings> => {
  return client.one<Settings>(`select * from  public.settings;`, [], Objects.camelize)
}
