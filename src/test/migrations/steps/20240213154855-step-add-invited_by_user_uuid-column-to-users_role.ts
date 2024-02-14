import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
    ALTER TABLE public.users_role
    ADD COLUMN invited_by_user_uuid uuid
  `)
}
