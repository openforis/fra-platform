const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')

module.exports.saveDraft = (client, countryIso, draft) =>
  !draft.odpId ? createOdp(client, countryIso)
    .then(newOdpId => updateOrInsertDraft(client, newOdpId, countryIso, draft))
    : updateOrInsertDraft(client, draft.odpId, countryIso, draft)

const updateOrInsertDraft = (client, odpId, countryIso, draft) =>
  getDraftId(client, odpId)
    .then(draftId => {
      if (!draftId) {
        return insertDraft(client, odpId, countryIso, draft)
          .then(() => ({odpId}))
      }
      else {
        return updateDraft(client, draft)
          .then(() => ({odpId}))
      }
    })

const getDraftId = (client, odpId) =>
  client.query(
    'SELECT draft_id FROM odp WHERE id = $1', [odpId]
  ).then(resp => resp.rows[0].draft_id)

const createOdp = (client, countryIso) =>
  client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso]).then(resp =>
    client.query('SELECT last_value FROM odp_id_seq').then(resp => resp.rows[0].last_value)
  )

const insertDraft = (client, odpId, iso, draft) =>
  client.query(
    'INSERT INTO odp_version (forest_area, calculated, year) VALUES ($1, FALSE, $2);',
    [draft.forestArea, draft.year]
  ).then(() => client.query('SELECT last_value AS odp_version_id FROM odp_version_id_seq')
  ).then(result => addClassData(client, result.rows[0].odp_version_id, draft)
  ).then(() =>
    client.query('UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1', [odpId])
  )

const updateDraft = (client, draft) =>
  client.query(
    'SELECT draft_id FROM odp WHERE id = $1', [draft.odpId]
  ).then((res) => res.rows[0].draft_id
  ).then(draftId => {
      return [draftId, wipeClassData(client, draftId), addClassData(client, draftId, draft)]
    }
  ).then(([draftId, ..._]) =>
    client.query('UPDATE odp_version SET year = $1, forest_area = $2 WHERE id = $3;',
      [draft.year, draft.forestArea, draftId])
  )

const wipeClassData = (client, odpVersionId) =>
  client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])

const addClassData = (client, odpVersionId, odp) => {
  const nationalInserts = R.map(
    (nationalClass) => client.query(
      `INSERT INTO odp_class 
        (odp_version_id, 
        name, 
        definition, 
        area) 
       VALUES 
        ($1, $2, $3, $4);`,
      [
        odpVersionId,
        nationalClass.className,
        nationalClass.definition,
        nationalClass.area
      ]),
    odp.nationalClasses)
  return Promise.all(nationalInserts)
}

module.exports.markAsActual = (client, odpId) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const updateOdpPromise = client.query(
    'UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL', [odpId]
  )
  return Promise.join(currentOdpPromise, updateOdpPromise, (oldActualResult, _) => {
    if (oldActualResult.rowCount > 0 && oldActualResult.rows[0].draft_id) {
      return oldActualResult.rows[0].actual_id
    }
    return null
  }).then((oldActualId) => {
    if (oldActualId) {
      return Promise.all([
        wipeClassData(client, oldActualId),
        client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId])])
    }
    return null
  })
}

const emptyFraForestArea = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length == 0)

module.exports.persistFraForestArea = (countryIso, year, forestArea, estimated = false) =>
  emptyFraForestArea(countryIso, year).then(isEmpty =>
    isEmpty ? insertFraForestArea(countryIso, year, forestArea, estimated)
      : updateFraForestArea(countryIso, year, forestArea, estimated))

const insertFraForestArea = (countryIso, year, forestArea, estimated) =>
  db.query('INSERT INTO eof_fra_values (country_iso, year, forest_area, estimated) VALUES ($1, $2, $3, $4)',
    [countryIso, year, forestArea, estimated])

const updateFraForestArea = (countryIso, year, forestArea, estimated) =>
  db.query('UPDATE eof_fra_values SET forest_area = $3, estimated = $4 WHERE country_iso = $1 AND year = $2',
    [countryIso, year, forestArea, estimated])

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
  db.query('SELECT year, forest_area from eof_fra_values WHERE country_iso = $1', [countryIso])
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
  `, [countryIso]).then(result => R.reduce(R.partialRight(reduceForestAreas, ['odp']), {}, result.rows))

module.exports.getOdp = odpId =>
  db.query(`
    SELECT
     CASE WHEN draft_id IS NULL
          THEN actual_id
          ELSE draft_id
          END
      AS version_id
    FROM odp
    WHERE id = $1
  `, [odpId]
  ).then(result => result.rows[0].version_id
  ).then(versionId => Promise.all([
    versionId,
    db.query(`SELECT name, 
                     definition,
                     area
              FROM odp_class 
              WHERE odp_version_id = $1`,
             [versionId])])
  ).then(([versionId, result]) => [versionId, R.map(row => ({
      className: row.name,
      definition: row.definition,
      area: row.area
    }), result.rows)]
  ).then(([versionId, nationalClasses]) =>
    Promise.all([db.query(`
                  SELECT
                    p.id AS odp_id,
                    v.forest_area,
                    v.year
                  FROM odp p
                    JOIN odp_version v
                      ON v.id = $2
                  WHERE p.id = $1
                `, [odpId, versionId]),
      nationalClasses])
  ).then(([result, nationalClasses]) =>
    R.assoc('nationalClasses', nationalClasses, result.rows[0]))

// functions used for interpolation / extrapolation
module.exports.getOdpValues = (countryIso) =>
  db.query(`
  SELECT
    v.forest_area,
    v.year
  FROM odp p
    JOIN odp_version v
      ON v.id = CASE WHEN p.draft_id IS NULL
      THEN p.actual_id
                ELSE p.draft_id END
  WHERE p.country_iso = $1
  `, [countryIso]).then(result => result.rows.map(v => {
    return {
      year: Number(v.year),
      forest_area: Number(v.forest_area)
    }
  }))
