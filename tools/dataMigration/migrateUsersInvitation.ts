import { BaseProtocol } from '../../server/db'

export const migrateUsersInvitation = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        with i as (
            select fui.country_iso,
                   fui.role,
                   fui.invitation_uuid,
                   fui.invited,
                   fui.accepted,
                   ur.id
            from _legacy.fra_user_invitation fui
                     left join users u
                               on lower(trim(u.email)) = lower(trim(fui.email))
                     left join users_role ur
                               on u.id = ur.user_id
                                   and ur.role::varchar = fui.role
                                   and ur.country_iso = fui.country_iso
        )
        update users_role u
        set invitation_uuid = i.invitation_uuid,
            invited_at      = i.invited,
            accepted_at     = i.accepted
        from i
        where u.id = i.id
        ;
    `
  )
}
