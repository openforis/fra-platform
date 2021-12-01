import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Settings } from '@core/meta/assessment/settings'

export const read = async (client: BaseProtocol = DB): Promise<Settings> => {
  return client.one<Settings>(
    `
        select * from  public.settings;
    `,
    [],
    Objects.camelize
  )
}
