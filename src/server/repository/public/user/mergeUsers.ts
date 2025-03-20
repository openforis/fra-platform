import { Assessment } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { getOne } from 'server/repository/public/user/getOne'
import { remove } from 'server/repository/public/user/remove'

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

  const userKept = await getOne({ id: userIdToKeep }, client)
  if (!userKept) throw new Error(`User with userIdToKeep ${userIdToKeep} not found`)

  const userToRemove = await getOne({ id: userIdToRemove }, client)
  if (!userToRemove) throw new Error(`User with userToRemove ${userToRemove} not found`)

  const { uuid: userUuidKept } = userKept
  const { uuid: userUuidToRemove } = userToRemove

  await Promise.all([
    // remove users_auth_provider, users_reset_password
    client.query(
      `delete
       from public.users_auth_provider
       where user_id = $1 `,
      [userIdToRemove]
    ),
    client.query(
      `delete
       from public.users_reset_password
       where user_id = $1 `,
      [userIdToRemove]
    ),
    // update users_invitation, users_role
    client.query(
      `update public.users_invitation
       set user_uuid = $1
       where user_uuid = $2`,
      [userUuidKept, userUuidToRemove]
    ),
    client.query(
      `update public.users_role
       set user_uuid = $1
       where user_uuid = $2`,
      [userUuidKept, userUuidToRemove]
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
  // remove user
  const userRemoved = await remove({ user: userToRemove }, client)

  return { userKept, userRemoved }
}
