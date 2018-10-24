const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const getChatSummary = async (userFrom, userTo) => {

  const resultChatMessage = await db.query(`
    SELECT count(*) as unread_messages
    FROM user_chat_message
    WHERE from_user = $1
      AND to_user = $2
      AND read_time IS NULL
  `, [userFrom, userTo])

  return {
    unreadMessages: resultChatMessage.rows[0].unread_messages
  }

}

const getChatMessages = async (client, sessionUserId, otherUserId) => {
  await markChatMessagesRead(client, otherUserId, sessionUserId)

  // then loading messages
  const resultChatMessages = await client.query(`
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
  `, [sessionUserId, otherUserId])

  return resultChatMessages.rows.map(msg => camelize(msg))
}

const addMessage = async (client, message, fromUserId, toUserId) => {

  await client.query(`
    INSERT INTO user_chat_message (text, from_user, to_user)
    VALUES ($1, $2, $3)
  `, [message, fromUserId, toUserId])

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

const getChatUnreadMessages = async (client, fromUserId, toUserId, markAsRead = false) => {
  const resultUnreadMessages = await client.query(`
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
  `, [fromUserId, toUserId])

  if (markAsRead)
    await markChatMessagesRead(client, fromUserId, toUserId)

  return camelize(resultUnreadMessages.rows)
}

const markChatMessagesRead = async (client, fromUserId, toUserId) => {
  await client.query(`
    UPDATE
      user_chat_message
    SET read_time = now()
    WHERE from_user = $1
      AND to_user = $2
  `, [fromUserId, toUserId])
}

module.exports = {
  getChatSummary,
  getChatMessages,
  addMessage,
  getChatUnreadMessages
}
