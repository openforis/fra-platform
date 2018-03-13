const camelize = require('camelize')

const createResetPassword = async (client, userId) => {

  // invalidate old reset password request first
  await  client.query(`
    UPDATE fra_user_reset_password 
    SET active = false
    WHERE user_id = $1
  `, [userId])

  const res = await  client.query(`
    INSERT INTO fra_user_reset_password (user_id)
    VALUES ($1)
    RETURNING 
      user_id, uuid, created_time, active
  `, [userId])

  return camelize(res.rows[0])
}

module.exports = {
  createResetPassword
}
