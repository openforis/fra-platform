import { BaseProtocol } from '../../server/db'

export const migrateUsersResetPassword = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        delete
        from users_reset_password;

        insert into users_reset_password (uuid, changed_at, created_at, user_id)
        select r.uuid,
               r.password_changed_time,
               r.created_time,
               u.id
        from _legacy.fra_user_reset_password r
                 left join _legacy.fra_user fu on fu.id = r.user_id
                 left join users u on fu.email = u.email
        ;
    `
  )
}
