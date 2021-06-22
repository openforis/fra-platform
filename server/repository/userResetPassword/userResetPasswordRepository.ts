// @ts-ignore
import camelize from 'camelize'
import * as R from 'ramda'
import { differenceInSeconds, parseISO } from 'date-fns'
import { toUTCSelectParam } from '@server/db/queryHelper'

export const createResetPassword = async (client: any, userId: any) => {
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

export const invalidateResetPassword = async (client: any, uuid: any) =>
  await client.query(
    `
    UPDATE fra_user_reset_password 
    SET active = false
    WHERE uuid = $1
  `,
    [uuid]
  )

export const findResetPassword = async (client: any, uuid: any) => {
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

export const changePassword = async (client: any, uuid: any, userId: any, newPassword: any) => {
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

export default {
  createResetPassword,
  findResetPassword,
  changePassword,
}
