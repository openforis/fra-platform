import { BaseProtocol, DB } from 'server/db'

const client: BaseProtocol = DB
export default async () => {
  await client.query(`
    alter table migrations
    alter column run_on set default now(),
    alter column run_on type timestamp without time zone not null
  `)
}
