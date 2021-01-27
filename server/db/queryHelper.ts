// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'toUTCSelec... Remove this comment to see the full error message
const toUTCSelectParam = (column: any) => `TO_CHAR(${column},'YYYY-MM-DD"T"HH24:MI:ssZ') AS ${column}`

module.exports = {
  toUTCSelectParam,
}
