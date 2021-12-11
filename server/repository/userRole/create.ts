import { BaseProtocol, DB } from '@server/db'
import { Assessment } from '@core/meta/assessment'
import { User, UserRole, RoleName } from '@core/meta/user'
import { CountryIso } from '@core/country'
import { Objects } from '@core/utils'

export const create = async (
  props: {
    user: Pick<User, 'id'>
    assessment: Pick<Assessment, 'id'>
    country: CountryIso
    role: RoleName
    cycle: string
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const {
    user: { id: userId },
    assessment: { id: assessmentId },
    country,
    role,
    cycle,
  } = props

  return client.one<UserRole<RoleName>>(
    `
        insert into public.users_role (
            user_id, assessment_id, country_iso, role, props, cycle_uuid)
            values ($1, $2, $3, $4, $5, $6)
            returning *;
    `,
    [userId, assessmentId, country, role, {}, cycle],
    Objects.camelize
  )
}

// import { BaseProtocol, DB } from '@server/db'
// import { User, UserInvitation } from '@core/meta/user'
// import { Objects } from '@core/utils'

// export const create = async (props: { user: Pick<User, 'id'> }, client: BaseProtocol = DB): Promise<UserInvitation> => {
//   const {
//     user: { id },
//   } = props

//   return client.one<UserInvitation>(
//     `
//         insert into public.users_invitation (invited_at, accepted_at, user_id) values (now(), NULL, $1) returning *;
//     `,
//     [id],
//     Objects.camelize
//   )
// }
