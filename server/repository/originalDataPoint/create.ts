import { BaseProtocol, DB } from '@server/db'
import { ODP } from '@core/odp'
import { Objects } from '@core/utils'

export const create = async (props: { countryIso: string }, client: BaseProtocol = DB): Promise<ODP> => {
  const { countryIso } = props

  return client.one<ODP>(
    `
        insert into original_data_point (country_iso) values ($1) returning *;
    `,
    [countryIso],
    Objects.camelize
  )
}
