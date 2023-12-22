import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
      update public.activity_log
      set
          country_iso = target ->>'countryIso',
          target = target - 'countryIso'
      where message = 'tableValuesClear'
        and country_iso is null
    `)
}
