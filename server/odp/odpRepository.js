const R = require('ramda')
const Promise = require('bluebird')
const camelize = require('camelize')

const db = require('../db/db')

const {insertAudit} = require('./../audit/auditRepository')
const {deleteIssues} = require('../review/reviewRepository')

const {validateDataPoint} = require('../../common/validateOriginalDataPoint')
const {checkCountryAccess} = require('../utils/accessControl')

const {updateOrInsertDraft} = require('./odpDraftRepository')
const {wipeClassData, getOdpNationalClasses, wipeNationalClassIssues} = require('./odpClassRepository')
const {eofReducer, focReducer} = require('./odpRepositoryUtils')

const saveDraft = async (client, countryIso, user, draft) => {
  const odpId = draft.odpId
    ? draft.odpId
    : await createOdp(client, countryIso, user)

  return await updateOrInsertDraft(client, user, odpId, countryIso, draft)
}

const deleteDraft = async (client, odpId, user) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)
  const actualRes = await client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId])
  const actualId = actualRes.rows[0].actual_id

  if (actualId) {
    await client.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
    const odpVersionId = await getOdpVersionId(client, odpId)
    const odpClasses = await getOdpNationalClasses(client, odpVersionId)
    return await wipeNationalClassIssues(client, odpId, countryIso, odpClasses)
  } else {
    return await deleteOdp(client, odpId, user)
  }
}

const createOdp = async (client, countryIso, user) => {
  await client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso])
  const resSelectId = await client.query('SELECT last_value FROM odp_id_seq')
  const odpId = resSelectId.rows[0].last_value

  await insertAudit(client, user.id, 'createOdp', countryIso, 'odp', {odpId})
  return odpId
}

const markAsActual = async (client, odpId, user) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const checkCountryAccessPromise = getAndCheckOdpCountryId(client, odpId, user)
  const updateOdpPromise = client.query('UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL', [odpId])

  const {oldActualId, countryIso} = await Promise.join(
    currentOdpPromise, checkCountryAccessPromise, updateOdpPromise,
    (oldActualResult, countryIso) => {
      if (oldActualResult.rowCount > 0 && oldActualResult.rows[0].draft_id) {
        return ({oldActualId: oldActualResult.rows[0].actual_id, countryIso})
      }
      return ({countryIso})
    })

  await insertAudit(client, user.id, 'markAsActual', countryIso, 'odp', {odpId})

  if (oldActualId) {
    return await Promise.all([
      wipeClassData(client, oldActualId),
      client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId])
    ])
  }
  return null
}

const getAndCheckOdpCountryId = async (client, odpId, user) => {
  const res = await client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
  const countryIso = res.rows[0].country_iso
  checkCountryAccess(countryIso, user)

  return countryIso
}

const deleteOdp = async (client, odpId, user) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)

  const odpVersionId = await getOdpVersionId(client, odpId)

  await client.query('DELETE FROM odp WHERE id = $1', [odpId])

  return await Promise.all([
    wipeClassData(client, odpVersionId)
      .then(() => client.query('DELETE FROM odp_version WHERE id = $1', [odpVersionId]))
    , deleteIssues(client, countryIso, 'odp', 0, odpId)
    , insertAudit(client, user.id, 'deleteOdp', countryIso, 'odp', {odpId})
  ])

}

const getOdpVersionId = async (client, odpId) => {
  const res = await client.query(`
    SELECT
      CASE WHEN draft_id IS NULL
        THEN actual_id
        ELSE draft_id
      END AS version_id
    FROM odp
    WHERE id = $1`
    , [odpId])

  return res.rows[0].version_id
}

const getOdp = async odpId => {
  const versionId = await getOdpVersionId(db, odpId)
  const nationalClasses = await getOdpNationalClasses(db, versionId)

  const resEditStatus = await db.query(
    `SELECT
          p.id AS odp_id,
          p.country_iso,
          v.year,
          v.description,
          v.data_source_references,
          v.data_source_methods,
          v.data_source_additional_comments,
          CASE
            WHEN (p.draft_id IS NOT NULL) AND (p.actual_id IS NOT NULL) THEN 'actualDraft'
            WHEN (p.draft_id IS NOT NULL) AND (p.actual_id IS NULL) THEN 'newDraft'
            WHEN (p.draft_id IS NULL) AND (p.actual_id IS NOT NULL) THEN 'noChanges'
            ELSE 'unknown' -- Should never happen
          END AS edit_status
        FROM odp p
        JOIN odp_version v
        ON v.id = $2
        WHERE p.id = $1
        `, [odpId, versionId])
  const editStatus = camelize(resEditStatus.rows[0])

  const dataSourceMethods = R.path(['dataSourceMethods', 'methods'], editStatus)
  return {...editStatus, nationalClasses, dataSourceMethods}
}

const readEofOdps = async (countryIso) => {
  const res = await db.query(`
    SELECT
      p.id as odp_id,
      v.year,
      v.data_source_methods,
      SUM(c.area * c.forest_percent / 100.0) AS forest_area,
      SUM(c.area * c.other_wooded_land_percent / 100.0) AS other_wooded_land_area,
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
    GROUP BY odp_id, v.year, v.data_source_methods, draft`
    , [countryIso])

  return R.reduce(eofReducer, [], res.rows)
}

const readFocOdps = async (countryIso) => {
  const res = await db.query(`
    SELECT
      p.id as odp_id,
      v.year,
      v.data_source_methods,
      SUM(c.area * c.forest_percent * c.forest_natural_percent / 10000.0) AS natural_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent / 10000.0) AS plantation_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent * c.forest_plantation_introduced_percent / 1000000.0) AS plantation_forest_introduced_area,
      SUM(c.area * c.forest_percent * c.other_planted_forest_percent / 10000.0) AS other_planted_forest_area,
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
    GROUP BY odp_id, v.year, v.data_source_methods, draft`
    , [countryIso])

  return R.reduce(focReducer, [], res.rows)
}

const listOriginalDataPoints = async countryIso => {
  const res = await db.query(`SELECT p.id as odp_id FROM odp p WHERE country_iso = $1`, [countryIso])
  const odps = await Promise.all(res.rows.map(r => getOdp(r.odp_id)))

  return R.pipe(
    R.sortBy(R.prop('year')),
    R.reverse
  )(R.values(odps))
}

const listAndValidateOriginalDataPoints = async countryIso => {
  const odps = await listOriginalDataPoints(countryIso)
  return R.map(odp => R.assoc('validationStatus', validateDataPoint(odp), odp), odps)
}

module.exports = {
  saveDraft,
  deleteDraft,

  getOdp,
  markAsActual,
  deleteOdp,

  readEofOdps,
  readFocOdps,
  listOriginalDataPoints,
  listAndValidateOriginalDataPoints
}
