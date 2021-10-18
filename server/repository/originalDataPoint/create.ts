import { BaseProtocol, DB } from '@server/db'

export const create = async (props: { countryIso: string }, client: BaseProtocol = DB): Promise<string> => {
  const { countryIso } = props

  const { id } = await client.one(
    `
        insert into original_data_point (country_iso) values ($1) returning id;
    `,
    [countryIso]
  )

  return id
}
