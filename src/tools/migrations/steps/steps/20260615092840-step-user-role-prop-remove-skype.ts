import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  await client.query(`
    update users_role
    set props = case
      when props -> 'contactPreference' ->> 'method' = 'skype'
        then props - 'skype' - 'contactPreference'
      else props - 'skype'
    end
    where props ? 'skype'
       or props -> 'contactPreference' ->> 'method' = 'skype'
  `)
}
