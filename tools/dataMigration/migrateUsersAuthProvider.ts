import { BaseProtocol } from '../../server/db'

export const migrateUsersAuthProvider = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        delete
        from users_auth_provider;

        insert into users_auth_provider (user_id, provider, props)
        select us.id,
               u.type::varchar::auth_provider as provider,
               case
                   when u.type = 'google' then jsonb_build_object('email', u.login_email)
                   when u.type = 'local' then jsonb_build_object('password', u.password)
                   else '{}'::jsonb
                   end                        as props
        from _legacy.fra_user u
                 left join users us on us.email = u.email
        ;
    `
  )
}
