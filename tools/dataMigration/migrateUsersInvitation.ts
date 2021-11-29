import { BaseProtocol } from '../../server/db'

export const migrateUsersInvitation = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        delete
        from users_invitation;

        insert into users_invitation (uuid, invited_at, accepted_at, user_id)
        select i.invitation_uuid,
               i.invited,
               i.accepted,
               u.id as user_id
        from _legacy.fra_user_invitation i
                 left join users u
                           on lower(trim(i.email)) = lower(trim(u.email))
        where u.id is not null
          and accepted is not null
        ;
    `
  )
}
