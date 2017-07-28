const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')
const camelize = require('camelize')
const {toNumberOrNull} = require('../utils/databaseConversions')
const {validateDataPoint} = require('../../common/originalDataPointCommon')
const {deleteIssuesByIds, deleteIssues} = require('../review/reviewRepository')
const {checkCountryAccess} = require('../utils/accessControl')

module.exports.saveDraft = (client, countryIso, draft) =>
  !draft.odpId ? createOdp(client, countryIso)
      .then(newOdpId => updateOrInsertDraft(client, newOdpId, countryIso, draft))
    : updateOrInsertDraft(client, draft.odpId, countryIso, draft)

const wipeNationalClassIssues = (client, odpId, countryIso, nationalClasses) => {
  const classUuids = nationalClasses.map(c => `"${c.uuid}"`)
  const classQueryPlaceholders = R.range(3, nationalClasses.length + 3).map(i => '$' + i).join(',')

  return client.query(`
                  SELECT 
                    i.id as issue_id
                  FROM issue i
                  WHERE i.country_iso = $1
                  AND i.section = $2
                  AND i.target #> '{params,0}' = '"${odpId}"'
                  AND i.target #> '{params,2}' NOT IN (${classQueryPlaceholders})`
    , [countryIso, 'NDP', ...classUuids])
    .then(res => res.rows.map(r => r.issue_id))
    .then(issueIds => deleteIssuesByIds(client, issueIds))
    .then(() => ({odpId}))
}

const updateOrInsertDraft = (client, odpId, countryIso, draft) =>
  getDraftId(client, odpId)
    .then(draftId => {
      if (!draftId)
        return insertDraft(client, odpId, countryIso, draft)
          .then(() => ({odpId}))
      else
        return updateDraft(client, draft)
          .then(() => wipeNationalClassIssues(client, odpId, countryIso, draft.nationalClasses))

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

module.exports.deleteDraft = (client, odpId, user) =>
  getAndCheckOdpCountryId(client, odpId, user)
    .then(countryIso => Promise.all([client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId]), countryIso]))
    .then(([actualRes, countryIso]) => {
      const actualId = actualRes.rows[0].actual_id
      return actualId
        ? client.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
          .then(() => getOdpVersionId(client, odpId))
          .then(odpVersionId => getOdpNationalClasses(client, odpVersionId))
          .then(odpClasses => wipeNationalClassIssues(client, odpId, countryIso, odpClasses))
        : deleteOdp(client, odpId, user)
    })

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
        other_land_percent,
        uuid)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        odpVersionId,
        nationalClass.className,
        nationalClass.definition,
        nationalClass.area,
        nationalClass.forestPercent,
        nationalClass.otherWoodedLandPercent,
        nationalClass.otherLandPercent,
        nationalClass.uuid
      ]),
    odp.nationalClasses)
  return Promise.all(nationalInserts)
}

module.exports.markAsActual = (client, odpId, user) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const checkCountryAccess = getAndCheckOdpCountryId(client, odpId, user)
  const updateOdpPromise = client.query(
    'UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL', [odpId]
  )
  return Promise.join(currentOdpPromise, checkCountryAccess, updateOdpPromise, (oldActualResult) => {
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

const getAndCheckOdpCountryId = (client, odpId, user) =>
  client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
    .then(res => {
      const countryIso = res.rows[0].country_iso
      checkCountryAccess(countryIso, user)
      return countryIso
    })

const deleteOdp = (client, odpId, user) => {

  return getAndCheckOdpCountryId(client, odpId, user)
    .then(countryIso =>
      Promise.all([
        client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId]),
        countryIso])
    ).then(([selectResult, countryIso]) =>
      client.query('DELETE FROM odp WHERE id = $1', [odpId])
      .then(() => [selectResult.rows[0].draft_id, selectResult.rows[0].actual_id, countryIso])
    ).then(([draftId, actualId, countryIso]) => {
      return Promise.all([
        draftId
          ? wipeClassData(client, draftId)
            .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [draftId]))
          : Promise.resolve(),
        actualId
          ? wipeClassData(client, actualId)
            .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [actualId]))
          : Promise.resolve(),
        deleteIssues(client, countryIso, 'NDP', 0, odpId)
    ])
  })
}
module.exports.deleteOdp = deleteOdp

const getOdpVersionId = (queryProvider, odpId) =>
  queryProvider.query(
    `
        SELECT
          CASE WHEN draft_id IS NULL
            THEN actual_id
            ELSE draft_id
          END AS version_id
        FROM odp
        WHERE id = $1
        `
    , [odpId]
  ).then(result => result.rows[0].version_id)

const getOdpNationalClasses = (queryProvider, odpVersionId) =>
  queryProvider.query(
    `SELECT 
      name,
      definition,
      area,
      forest_percent,
      other_wooded_land_percent,
      other_land_percent,
      uuid
     FROM odp_class
     WHERE odp_version_id = $1`
    ,
    [odpVersionId])
    .then(result => R.map(row => ({
      className: row.name,
      definition: row.definition,
      area: toNumberOrNull(row.area),
      forestPercent: toNumberOrNull(row.forest_percent),
      otherWoodedLandPercent: toNumberOrNull(row.other_wooded_land_percent),
      otherLandPercent: toNumberOrNull(row.other_land_percent),
      uuid: row.uuid
    }), result.rows))

const getOdp = odpId =>
  getOdpVersionId(db, odpId)
    .then(versionId =>
      Promise.all([versionId, getOdpNationalClasses(db, versionId)])
    )
    .then(([versionId, nationalClasses]) =>
      Promise.all([db.query(
        `SELECT
          p.id AS odp_id,
          p.country_iso,
          v.year,
          v.description
        FROM odp p
        JOIN odp_version v
        ON v.id = $2
        WHERE p.id = $1
        `, [odpId, versionId]),
        nationalClasses])
    ).then(([result, nationalClasses]) =>
    R.pipe(
      R.assoc('nationalClasses', nationalClasses),
      R.assoc('year', toNumberOrNull(result.rows[0].year)))
    (camelize(result.rows[0])))

module.exports.getOdp = getOdp

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

module.exports.readOriginalDataPoints = (countryIso) =>
  db.query(`
        SELECT
          p.id as odp_id,
          v.year,
          SUM(c.area * (c.forest_percent/100.0)) AS forest_area,
          SUM(c.area * (c.other_wooded_land_percent/100.0)) AS other_wooded_land_area,
          SUM(c.area * (c.other_land_percent/100.0)) AS other_land_area,
        CASE 
          WHEN p.draft_id IS NULL
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
        LEFT OUTER JOIN odp_class c
          ON c.odp_version_id = v.id
        WHERE p.country_iso = $1 AND year IS NOT NULL
        GROUP BY odp_id, v.year, draft
        `
    , [countryIso]).then(result => R.reduce(odpReducer, {}, result.rows))

const listOriginalDataPoints = countryIso =>
  db.query(`SELECT p.id as odp_id FROM odp p WHERE country_iso = $1`, [countryIso])
    .then(res => Promise.all(res.rows.map(r => getOdp(r.odp_id))))
    .then(odps => R.sort((a, b) => Number(R.defaultTo(0, a.year)) - Number(R.defaultTo(0, b.year)), R.values(odps)))

module.exports.listOriginalDataPoints = listOriginalDataPoints

module.exports.listAndValidateOriginalDataPoints = countryIso =>
  listOriginalDataPoints(countryIso)
    .then(odps => R.map(odp => R.assoc('validationStatus', validateDataPoint(odp), odp), odps))


