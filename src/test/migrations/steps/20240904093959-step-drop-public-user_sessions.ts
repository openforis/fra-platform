import { BaseProtocol, DB } from 'server/db'

const client: BaseProtocol = DB
export default async () => {
  await client.query(`drop table if exists public.user_sessions;`)
}
