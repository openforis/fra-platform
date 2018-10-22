
const persistMessage = async (client,countryIso, message, fromUserId) => {
  await client.query(`
    INSERT INTO
    country_message_board_message (country_iso, text, from_user)
    VALUES 
      ($1, $2, $3)
  `, [countryIso, message, fromUserId])
}

const fetchCountryMessages = async (countryIso) => {

}

module.exports = {
  persistMessage,
}
