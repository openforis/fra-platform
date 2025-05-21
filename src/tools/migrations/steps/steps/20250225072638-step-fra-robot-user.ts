import { BaseProtocol } from 'server/db'

const email = 'robot@fra.org'

export default async (client: BaseProtocol) => {
  await client.query(`
    insert into public.users(status, email, props ) values ('disabled', '${email}', '{"lang": "en", "name": "Robot FRA"}');
    insert into public.users_role (user_uuid, role) select uuid, 'ADMINISTRATOR'from public.users where email = '${email}';
  `)
}
