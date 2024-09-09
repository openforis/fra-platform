import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    truncate table public.migrations;
  `)
}
