import { Assessment } from 'meta/assessment/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { getOne } from 'server/db/repository/public/user/getOne'
import { remove } from 'server/db/repository/public/user/remove'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessments: Array<Assessment>
  userIdToKeep: number
  userIdToRemove: number
}

type Returned = {
  userKept: User
  userRemoved: User
}

export const mergeUsers = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessments, userIdToKeep, userIdToRemove } = props

  const userToKeep = await getOne({ id: userIdToKeep }, client)
  if (!userToKeep) throw new Error(`User with userIdToKeep ${userIdToKeep} not found`)

  const userToRemove = await getOne({ id: userIdToRemove }, client)
  if (!userToRemove) throw new Error(`User with userIdToRemove ${userIdToRemove} not found`)

  const { uuid: userUuidToKeep } = userToKeep
  const { uuid: userUuidToRemove } = userToRemove

  await Promise.all([
    // remove users_auth_provider
    client.query(
      `delete
       from public.users_auth_provider
       where user_id = $1 `,
      [userIdToRemove]
    ),
    // insert users_role if it doesn't exist already
    client.query(
      `insert into public.users_role
       (assessment_uuid, cycle_uuid, country_iso, user_uuid, role, props, permissions, invitation_uuid, created_at)
       select assessment_uuid,
              cycle_uuid,
              country_iso,
              $1 as user_uuid,
              role,
              props,
              permissions,
              invitation_uuid,
              created_at
       from public.users_role
       where user_uuid = $2 on conflict (user_uuid,assessment_uuid,country_iso,cycle_uuid) do nothing`,
      [userUuidToKeep, userUuidToRemove]
    ),
    // update users_reset_password, users_invitation
    client.query(
      `update public.users_reset_password 
       set user_id = $1
       where user_id = $2`,
      [userIdToKeep, userIdToRemove]
    ),
    client.query(
      `update public.users_invitation
       set user_uuid = $1
       where user_uuid = $2
      `,
      [userUuidToKeep, userUuidToRemove]
    ),
    // update activity_log
    client.query(
      `update public.activity_log
       set user_id = $1
       where user_id = $2`,
      [userIdToKeep, userIdToRemove]
    ),
  ])

  // update assessment cycle messages
  await Promise.all(
    assessments.flatMap((assessment) =>
      assessment.cycles.map((cycle) => {
        const schemaCycle = Schemas.getNameCycle(assessment, cycle)
        return Promise.all(
          // update message_topic key
          [
            client.query(
              `update ${schemaCycle}.message_topic
               set key = regexp_replace(key, '(_\\d+)(?=_\\d+$)', '_${userIdToKeep}')
                       where key like 'message_board_chat_${userIdToRemove}_%'`
            ),
            client.query(
              `update ${schemaCycle}.message_topic
               set key = regexp_replace(key, '(_\\d+)$', '_${userIdToKeep}')
               where key like 'message_board_chat_%_${userIdToRemove}'`
            ),
            // update message and message_topic_user user_id
            client.query(
              `update ${schemaCycle}.message
               set user_id = $1
               where user_id = $2`,
              [userIdToKeep, userIdToRemove]
            ),
            client.query(
              `update ${schemaCycle}.message_topic_user
               set user_id = $1
               where user_id = $2`,
              [userIdToKeep, userIdToRemove]
            ),
          ]
        )
      })
    )
  )

  const userRemoved = await remove({ user: userToRemove }, client)
  const userKept = await getOne({ id: userIdToKeep }, client)

  return { userKept, userRemoved }
}
