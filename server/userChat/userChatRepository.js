const db = require('../db/db')
const R = require('ramda')


const getChatSummary = async (userFrom, userTo) => {

  const resultChat = await db.query(`
    SELECT id 
    FROM user_chat
    WHERE 
      (user_a = $1 AND user_b = $2)
    OR 
      (user_a = $2 AND user_b = $1)
  `, [userFrom, userTo])

  console.log('=========')
  console.log(userFrom, userTo)
  console.log(resultChat.rows)

  if(R.isEmpty(resultChat.rows))
    return null
  else {
    const chatId = resultChat.rows[0].id

    const resultChatMessage = await db.query(`
      SELECT count(*) as unread_messages
      FROM user_chat_message
      WHERE user_chat_id = $1
      AND to_user = $2
    `, [chatId, userTo])

    return {chatId, unreadMessages: resultChatMessage.rows[0].unread_messages}
  }

}

module.exports.getChatSummary = getChatSummary
