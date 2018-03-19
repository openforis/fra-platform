const toUTCSelectParam = column =>
  `TO_CHAR(${column},'YYYY-MM-DD"T"HH24:MI:ssZ') AS ${column}`


module.exports = {
  toUTCSelectParam
}
