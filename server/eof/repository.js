const db = require("../db/db")
const R = require("ramda")
const Promise = require("bluebird")

module.exports.getDraftId = odpId =>
  db.query(
    "SELECT draft_id FROM odp WHERE id = $1", [odpId]
  ).then(resp => resp.rows[0].draft_id)

module.exports.createOdp = (countryIso) =>
  db.query("INSERT INTO odp (country_iso ) VALUES ($1)", [countryIso]).then(resp =>
    db.query("SELECT last_value FROM odp_id_seq").then(resp => resp.rows[0].last_value)
  )

module.exports.insertDraft = (odpId, iso, draft) =>
  db.query(
   "INSERT INTO odp_version (forest_area, calculated, year) VALUES ($1, FALSE, $2);",
    [draft.forestArea, draft.year]
  ).then(() =>
      db.query("UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1", [odpId])
  )

module.exports.updateDraft = draft =>
  db.query(
    "SELECT draft_id FROM odp WHERE id = $1", [draft.odpId]
  ).then(res =>
    db.query("UPDATE odp_version SET year = $1, forest_area = $2 WHERE id = $3;",
      [draft.year, draft.forestArea, res.rows[0].draft_id])
  )

module.exports.markAsActual = odpId => {
    const selectOldActualPromise = db.query("SELECT actual_id FROM odp WHERE id = $1", [odpId])
    const updateOdpPromise = db.query(
        "UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1", [odpId]
    )
    return Promise.join(selectOldActualPromise, updateOdpPromise, (oldActualResult, _) => {
        if (oldActualResult.rowCount > 0) {
            console.log("Gonna remove old actual with result", oldActualResult.rows[0].actual_id)
            return oldActualResult.rows[0].actual_id
        }
        return null
    }).then((oldActualId) => {
        if (oldActualId) return db.query("DELETE FROM odp_version WHERE id = $1", [oldActualId])
        return null
    })
}

const emptyFraForestArea = (countryIso, year) =>
 db.query("SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2", [countryIso, year])
     .then(result => result.rows.length == 0)

module.exports.persistFraForestArea = (countryIso, year, forestArea) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
      isEmpty ? insertFraForestArea(countryIso, year, forestArea)
          :
          updateFraForestArea(countryIso, year, forestArea))

const insertFraForestArea = (countryIso, year, forestArea) =>
  db.query("INSERT INTO eof_fra_values (country_iso, year, forest_area) VALUES ($1, $2, $3)",
           [countryIso, year, forestArea])

const updateFraForestArea = (countryIso, year, forestArea) =>
  db.query("UPDATE eof_fra_values SET forest_area = $3 WHERE country_iso = $1 AND year = $2",
      [countryIso, year, forestArea])

const reduceForestAreas = (results, row, type = 'fra') => R.assoc(`${type}_${row.year}`,
  {
    odpId: R.defaultTo(null, row.odp_id),
    forestArea: Number(row.forest_area),
    name: row.year + '',
    type,
    year: Number(row.year),
    draft: !!row.draft_id
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query("SELECT year, forest_area from eof_fra_values WHERE country_iso = $1", [countryIso])
  .then((result) => R.reduce(reduceForestAreas, {}, result.rows))

module.exports.readOriginalDataPoints = countryIso =>
  db.query(`
      SELECT
      p.id as odp_id,
      p.draft_id,
      p.actual_id,
      v.forest_area,
      v.year,
      CASE WHEN p.actual_id IS NULL
        THEN TRUE
      ELSE FALSE END AS draft
    FROM odp p
      JOIN odp_version v
        ON v.id = CASE WHEN p.draft_id IS NULL
        THEN p.actual_id
                  ELSE p.draft_id END
    WHERE p.country_iso = $1 AND v.year IS NOT NULL
  `, [countryIso]).then(result => R.reduce(R.partialRight(reduceForestAreas, ["odp"]), {}, result.rows))

module.exports.getOdp = odpId =>
  db.query(`
    SELECT
      p.id AS odp_id,
      v.forest_area,
      v.year
    FROM odp p
      JOIN odp_version v
        ON v.id =
           CASE WHEN p.draft_id IS NULL
             THEN p.actual_id
           ELSE p.draft_id
           END
    WHERE p.id = $1
  `, [odpId]).then(result => result.rows[0])
