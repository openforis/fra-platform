const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const getChatSummary = async (userFrom, userTo) => {

  const resultChatMessage = await db.query(`
      SELECT 
        count(*) as unread_messages
      FROM 
        user_chat_message
      WHERE 
        from_user = $1
      AND 
        to_user = $2
      AND   
        read_time IS NULL
    `, [userFrom, userTo])

  return {
    unreadMessages: resultChatMessage.rows[0].unread_messages
  }

}

const getChatMessages = async (client, sessionUserId, otherUserId) => {
  //first unread messages are marked as read
  await client.query(`
    UPDATE 
      user_chat_message
    SET 
      read_time = now()
    WHERE 
      from_user = $1 AND to_user = $2
  `, [otherUserId, sessionUserId])

  // then loading messages
  const resultChatMessages = await client.query(`
      SELECT 
        text, from_user, to_user, time, read_time
      FROM 
        user_chat_message
      WHERE 
        (from_user = $1 AND to_user = $2)
      OR 
        (from_user = $2 AND to_user = $1)
      ORDER BY 
        time  
    `, [sessionUserId, otherUserId])

  return resultChatMessages.rows.map(msg => camelize(msg))

}

const addMessage = async (client, message, fromUserId, toUserId) => {
  await client.query(`
    INSERT INTO 
      user_chat_message (text, from_user, to_user)
    VALUES 
      ($1, $2, $3)
  `, [message, fromUserId, toUserId])

  const resultChatMessage = await client.query(`
    SELECT 
      text, from_user, to_user, time, read_time
    FROM 
      user_chat_message
    WHERE 
      id = (SELECT last_value FROM user_chat_message_id_seq)
  `)

  return camelize(resultChatMessage.rows[0])
}

module.exports.getChatSummary = getChatSummary
module.exports.getChatMessages = getChatMessages
module.exports.addMessage = addMessage
