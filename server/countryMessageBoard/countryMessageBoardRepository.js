const db = require('../db/db')
const camelize = require('camelize')

const persistMessage = async (client, countryIso, message, fromUserId) => {
  await client.query(`
    INSERT INTO country_message_board_message (country_iso, text, from_user)
    VALUES ($1, $2, $3)
  `, [countryIso, message, fromUserId])
}

const fetchCountryMessages = async (countryIso) => {
  const messagesResp = await db.query(`
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

module.exports = {
  persistMessage,
  fetchCountryMessages,
}
