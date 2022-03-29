import { BaseProtocol } from '../../server/db'

type Props = {
  client: BaseProtocol
  schema: string
}

export const migrateCountries = async (props: Props): Promise<void> => {
  const { client, schema } = props

  await client.query(`
        insert into ${schema}.country (country_iso, config)
        select country_iso, config
        from public.country
        order by country_iso;
    `)
}
