import { RoleName, User, UserRole } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'

import { getOne } from './getOne'

export const update = async (
  props: { user: User; profilePicture?: Express.Multer.File | null },
  client: BaseProtocol = DB
): Promise<User> => {
  const {
    profilePicture,
    user: { institution, lang, name, status, position, email, id, roles },
  } = props

  await client.one<User>(
    `
        update users set
                      institution = $1,
                      lang = $2,
                      name = $3,
                      status = $4,
                      position = $5,
                      email = $6
        where id = $7
        returning *
    `,
    [institution, lang, name, status, position, email, id]
  )

  await client.query(`delete from users_role WHERE user_id = $1`, [id])

  const userRolePromises = roles
    .filter((userRole) => !!userRole)
    .map((userRole: UserRole<RoleName>) =>
      client.query(
        `insert into users_role (user_id, assessment_id, cycle_uuid, country_iso, role, accepted_at) values ($1, $2, $3, $4, $5, now())`,
        [id, userRole.assessmentId, userRole.cycleUuid, userRole.countryIso, userRole.role]
      )
    )

  await Promise.all(userRolePromises)

  if (profilePicture) {
    const {
      profilePicture: { filename, buffer },
    } = props

    await client.query(
      `
        update users set
            profile_picture_filename = $1,
            profile_picture_file = $2
        where id = $3
    `,
      [filename, buffer, id]
    )
  }

  return getOne({ email }, client)
}
