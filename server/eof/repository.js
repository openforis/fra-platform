const db = require("../db/db")

module.exports.saveDraft = (countryIso, draft) => {
 return emptyOdp(countryIso).then(isEmpty => {
   return isEmpty ? insertDraft(draft) : updateDraft(draft)
  }).catch(err => console.error(err))
}

const emptyOdp = (iso) => db.query(`SELECT * from eof_odp WHERE country_iso = '${iso}';`).then(result =>
  result.rows.length == 0
)

module.exports.insertDraft = (iso, draft) =>
  db.query(
   "INSERT INTO eof_odp_version (forest_area, calculated, year) VALUES ($1, FALSE, $2);",
    [draft.forestArea, draft.year]
  ).then(() =>
    db.query("INSERT INTO eof_odp (country_iso, draft_id) VALUES ($1, CURRVAL('eof_odp_version_id_seq'));", [iso])
  ).then(() =>
    db.query("SELECT CURRVAL('eof_odp_id_seq') AS odp_id;")
  ).then(res => Number(res.rows[0].odp_id))


module.exports.updateDraft = draft =>
  db.query(
    "SELECT draft_id FROM eof_odp WHERE id = $1", [draft.id]
  ).then(res =>
    db.query("UPDATE eof_odp_version SET year = $1, forest_area = $2 WHERE id = $3;",
      [draft.year, draft.forestArea, res.rows[0].draft_id])
  )

module.exports.markAsActual = opdId =>
  db.query(
    "UPDATE eof_odp SET draft_id = null, actual_id = (SELECT draft_id FROM eof_odp WHERE id = $1) WHERE id = $1", [opdId]
  )
