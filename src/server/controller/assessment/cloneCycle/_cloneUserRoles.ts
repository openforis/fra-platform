import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol } from 'server/db'

export const cloneUserRoles = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  await client.query(
    `
      insert into users_role (user_id, assessment_id, country_iso, role, props, cycle_uuid, invitation_uuid, invited_at,
                              accepted_at, permissions, invited_by_user_uuid)
      select ur.user_id,
             ur.assessment_id,
             ur.country_iso,
             ur.role,
             ur.props,
             '${cycleTarget.uuid}' as cycle_uuid,
             ur.invitation_uuid,
             ur.invited_at,
             ur.accepted_at,
             ur.permissions,
             ur.invited_by_user_uuid
      from users_role ur
               left join assessment a on ur.assessment_id = a.id
               left join public.assessment_cycle ac on ur.cycle_uuid = ac.uuid and a.id = ac.assessment_id
      where a.id = $1
        and ac.id = $2

  `,
    [assessment.id, cycleSource.id]
  )
}
