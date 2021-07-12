// @ts-ignore
import * as camelize from 'camelize'
import * as db from '../../db/db_deprecated'

export const getChatSummary = async (userFrom: any, userTo: any) => {
  const resultChatMessage = await db.pool.query(
    `
    SELECT count(*) as unread_messages
    FROM user_chat_message
    WHERE from_user = $1
      AND to_user = $2
      AND read_time IS NULL
  `,
    [userFrom, userTo]
  )

  return {
    unreadMessages: resultChatMessage.rows[0].unread_messages,
  }
}

export const getChatMessages = async (client: any, sessionUserId: any, otherUserId: any) => {
  await markChatMessagesRead(client, otherUserId, sessionUserId)

  // then loading messages
  const resultChatMessages = await client.query(
    `
    SELECT id,
           text,
           from_user,
           to_user,
           to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ')      as time,
           to_char(read_time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as read_time
    FROM user_chat_message
    WHERE (from_user = $1 AND to_user = $2)
       OR (from_user = $2 AND to_user = $1)
    ORDER BY time
  `,
    [sessionUserId, otherUserId]
  )

  return resultChatMessages.rows.map((msg: any) => camelize(msg))
}

export const addMessage = async (client: any, message: any, fromUserId: any, toUserId: any) => {
  await client.query(
    `
    INSERT INTO user_chat_message (text, from_user, to_user)
    VALUES ($1, $2, $3)
  `,
    [message, fromUserId, toUserId]
  )

  const resultChatMessage = await client.query(`
    SELECT text,
           from_user,
           to_user,
           to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ')      as time,
           to_char(read_time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as read_time
    FROM user_chat_message
    WHERE id = (SELECT last_value FROM user_chat_message_id_seq)
  `)

  return camelize(resultChatMessage.rows[0])
}

export const getChatUnreadMessages = async (client: any, fromUserId: any, toUserId: any, markAsRead = false) => {
  const resultUnreadMessages = await client.query(
    `
    SELECT id,
           text,
           from_user,
           to_user,
           to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ')      as time,
           to_char(read_time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as read_time
    FROM user_chat_message
    WHERE from_user = $1
      AND to_user = $2
      AND read_time IS NULL
  `,
    [fromUserId, toUserId]
  )

  if (markAsRead) await markChatMessagesRead(client, fromUserId, toUserId)

  return camelize(resultUnreadMessages.rows)
}

export const markChatMessagesRead = async (client: any, fromUserId: any, toUserId: any) => {
  await client.query(
    `
    UPDATE
      user_chat_message
    SET read_time = now()
    WHERE from_user = $1
      AND to_user = $2
  `,
    [fromUserId, toUserId]
  )
}

export default {
  getChatSummary,
  getChatMessages,
  addMessage,
  getChatUnreadMessages,
}
