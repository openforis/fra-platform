// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parseISO'.
const { differenceInSeconds, parseISO } = require('date-fns')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toUTCSelec... Remove this comment to see the full error message
const { toUTCSelectParam } = require('../db/queryHelper')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createRese... Remove this comment to see the full error message
const createResetPassword = async (client: any, userId: any) => {
  // invalidate old reset password request first
  await client.query(
    `
    UPDATE fra_user_reset_password 
    SET active = false
    WHERE user_id = $1
  `,
    [userId]
  )

  const res = await client.query(
    `
    INSERT INTO fra_user_reset_password (user_id)
    VALUES ($1)
    RETURNING 
      user_id, uuid, created_time, active
  `,
    [userId]
  )

  return camelize(res.rows[0])
}

const invalidateResetPassword = async (client: any, uuid: any) =>
  await client.query(
    `
    UPDATE fra_user_reset_password 
    SET active = false
    WHERE uuid = $1
  `,
    [uuid]
  )

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findResetP... Remove this comment to see the full error message
const findResetPassword = async (client: any, uuid: any) => {
  const res = await client.query(
    `
  SELECT
    user_id, uuid, ${toUTCSelectParam('created_time')}
  FROM
    fra_user_reset_password
  WHERE active = true
  AND uuid = $1
  `,
    [uuid]
  )

  if (R.isEmpty(res.rows)) {
    return null
  }
  const resetPassword = camelize(res.rows[0])

  const oneWeek = 1 * 60 * 60 * 24 * 7
  if (differenceInSeconds(parseISO(resetPassword.createdTime), new Date()) > oneWeek + 1) {
    // if reset password is older than one week, invalidate the reset password request
    await invalidateResetPassword(client, resetPassword.uuid)

    return null
  }
  return resetPassword
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'changePass... Remove this comment to see the full error message
const changePassword = async (client: any, uuid: any, userId: any, newPassword: any) => {
  const resetPassword = await findResetPassword(client, uuid)
  if (resetPassword && resetPassword.userId === userId) {
    await client.query(
      `
      UPDATE fra_user 
      SET password = $1
      WHERE id = $2 
    `,
      [newPassword, userId]
    )

    await invalidateResetPassword(client, uuid)

    return true
  }
  return false
}

module.exports = {
  createResetPassword,
  findResetPassword,
  changePassword,
}
