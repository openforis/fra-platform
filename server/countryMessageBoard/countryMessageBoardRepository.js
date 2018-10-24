const db = require('../db/db')
const camelize = require('camelize')

const persistMessage = async (client, countryIso, message, fromUserId) => {
  await client.query(`
      INSERT INTO country_message_board_message (country_iso, text, from_user)
      VALUES ($1, $2, $3)
    `, [countryIso, message, fromUserId]
  )
}

const markMessagesRead = async (client, userId, messages) =>
  messages.forEach(
    async msg =>
      await client.query(`
        INSERT INTO country_message_board_message_read (message_id, user_id)
        VALUES ($1, $2)
      `, [msg.id, userId])
  )

const fetchCountryMessages = async (client, countryIso, userId) => {

  // marking unread messages as read
  const unreadMessages = await fetchCountryUnreadMessages(client, countryIso, userId)
  await markMessagesRead(client, userId, unreadMessages)

  // fetching all messages
  const messagesResp = await client.query(`
    SELECT m.id,
           m.country_iso,
           m.text,
           to_char(m.time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as time,
           u.id                                        as from_user_id,
           u.name                                      as from_user_name
    FROM country_message_board_message m
           JOIN fra_user u ON m.from_user = u.id
    WHERE m.country_iso = $1
    ORDER BY m.time
  `, [countryIso])

  return camelize(messagesResp.rows)
}

const fetchCountryUnreadMessages = async (client, countryIso, userId, markAsRead = false) => {
  const messagesResp = await client.query(`
    SELECT m.id,
           m.country_iso,
           m.text,
           to_char(m.time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as time,
           u.id                                        as from_user_id,
           u.name                                      as from_user_name
    FROM country_message_board_message m
           JOIN fra_user u ON m.from_user = u.id
    WHERE m.country_iso = $1
      AND m.from_user != $2
      AND m.id NOT IN (SELECT mr.message_id FROM country_message_board_message_read mr WHERE mr.user_id = $2)
    ORDER BY m.time
  `, [countryIso, userId])

  const messages = camelize(messagesResp.rows)

  if(markAsRead)
    await markMessagesRead(client, userId, messages)

  return messages
}

module.exports = {
  persistMessage,
  fetchCountryMessages,
  fetchCountryUnreadMessages,
}
