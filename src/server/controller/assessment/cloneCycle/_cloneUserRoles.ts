import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol } from 'server/db'

export const cloneUserRoles = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  await client.query(
    `
      insert into public.users_role (
        assessment_uuid,
        cycle_uuid,
        country_iso,
        user_uuid,
        role,
        props,
        permissions,
        created_at
      )
      select 
        ur.assessment_uuid,
        $3 as cycle_uuid,
        ur.country_iso,
        ur.user_uuid,
        ur.role,
        ur.props,
        ur.permissions,
        $4 as created_at
      from users_role ur
      where ur.assessment_uuid = $1
        and ur.cycle_uuid = $2
    `,
    [assessment.uuid, cycleSource.uuid, cycleTarget.uuid, cycleTarget.props.dateCreated]
  )
}
