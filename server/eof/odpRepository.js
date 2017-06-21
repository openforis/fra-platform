const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')
const camelize = require('camelize')

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
    'INSERT INTO odp_version (year, description) VALUES ($1, $2);',
    [draft.year, draft.description]
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
    client.query('UPDATE odp_version SET year = $1, description = $2 WHERE id = $3;',
      [draft.year, draft.description, draftId])
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
        area,
        forest_percent,
        other_wooded_land_percent,
        other_land_percent
        ) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7);`,
      [
        odpVersionId,
        nationalClass.className,
        nationalClass.definition,
        nationalClass.area,
        nationalClass.forestPercent,
        nationalClass.otherWoodedLandPercent,
        nationalClass.otherLandPercent
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

module.exports.deleteOdp = (client, odpId) => {
  return client.query(
    'SELECT actual_id, draft_id FROM odp WHERE id = $1'
    , [odpId]
  ).then(selectResult =>
    client.query('DELETE FROM odp WHERE id = $1', [odpId])
      .then(() => [selectResult.rows[0].draft_id, selectResult.rows[0].actual_id])
  ).then(([draftId, actualId]) => {
    return Promise.all([
      draftId
        ? wipeClassData(client, draftId)
        .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [draftId]))
        : Promise.resolve(),
      actualId
        ? wipeClassData(client, actualId)
        .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [actualId]))
        : Promise.resolve()
    ])
  })
}

const toNumberOrNull = numericFromDb => numericFromDb === null
  ? null
  : Number(numericFromDb)

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
                     area,
                     forest_percent,
                     other_wooded_land_percent,
                     other_land_percent
              FROM odp_class 
              WHERE odp_version_id = $1`,
      [versionId])])
  ).then(([versionId, result]) => [versionId, R.map(row => ({
      className: row.name,
      definition: row.definition,
      area: toNumberOrNull(row.area),
      forestPercent: row.forest_percent,
      otherWoodedLandPercent: row.other_wooded_land_percent,
      otherLandPercent: row.other_land_percent
    }), result.rows)]
  ).then(([versionId, nationalClasses]) =>
    Promise.all([db.query(`
                  SELECT
                    p.id AS odp_id,
                    v.year,
                    v.description
                  FROM odp p
                    JOIN odp_version v
                      ON v.id = $2
                  WHERE p.id = $1
                `, [odpId, versionId]),
      nationalClasses])
  ).then(([result, nationalClasses]) =>
    R.assoc('nationalClasses', nationalClasses, camelize(result.rows[0])))

const odpReducer = (results, row, type = 'fra') => R.assoc(`odp_${row.year}`,
  {
    odpId: row.odp_id,
    forestArea: Number(row.forest_area),
    otherWoodedLand: Number(row.other_wooded_land_area),
    otherLand: Number(row.other_land_area),
    name: row.year + '',
    type: 'odp',
    year: Number(row.year),
    draft: row.draft
  },
  results)

const odpListReducer = (results, row, type = 'fra') => R.assoc(`odp_${row.odp_id}`,
  {
    odpId: row.odp_id,
    name: row.year + '',
    type: 'odp',
    year: Number(row.year),
    draft: row.draft
  },
  results)

module.exports.readOriginalDataPoints = (countryIso) =>
  db.query(`
  
      SELECT
        p.id as odp_id,
        v.year,
        SUM(c.area * (c.forest_percent/100.0)) AS forest_area,
        SUM(c.area * (c.other_wooded_land_percent/100.0)) AS other_wooded_land_area,
        SUM(c.area * (c.other_land_percent/100.0)) AS other_land_area,
        CASE WHEN p.draft_id IS NULL
          THEN FALSE
          ELSE TRUE
        END AS draft
      FROM odp p
        JOIN odp_version v
          ON v.id =
             CASE WHEN p.draft_id IS NULL
               THEN p.actual_id
             ELSE p.draft_id
             END
        JOIN odp_class c
          ON c.odp_version_id = v.id
      WHERE p.country_iso = $1 AND year IS NOT NULL
      GROUP BY odp_id, v.year, draft 
  `, [countryIso]).then(result => R.reduce(odpReducer, {}, result.rows))

module.exports.listOriginalDataPoints = (countryIso) =>
  db.query(`
      SELECT
        p.id as odp_id,
        v.year
      FROM odp p
        JOIN odp_version v
          ON v.id =
             CASE WHEN p.draft_id IS NULL
               THEN p.actual_id
             ELSE p.draft_id
             END
      WHERE p.country_iso = $1
  `, [countryIso]).then(result => R.reduce(odpListReducer, {}, result.rows))
