import * as R from 'ramda'

// @ts-ignore
import * as camelize from 'camelize'
import * as Promise from 'bluebird'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import * as db from '../../db/db'
import { insertAudit } from '../audit/auditRepository'
import { deleteIssues } from '../review/reviewRepository'
import { checkCountryAccess } from '../../utils/accessControl'
import { updateOrInsertDraft } from '../odpDraft/odpDraftRepository'
import { wipeClassData, getOdpNationalClasses, wipeNationalClassIssues } from '../odpClass/odpClassRepository'
import { eofReducer, focReducer } from './odpRepositoryUtils'

export const saveDraft = async (client: any, countryIso: any, user: any, draft: any) => {
  const odpId = draft.odpId ? draft.odpId : await createOdp(client, countryIso, user)
  return await updateOrInsertDraft(client, user, odpId, countryIso, draft)
}
export const deleteDraft = async (client: any, odpId: any, user: any) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)
  const actualRes = await client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId])
  const actualId = actualRes.rows[0].actual_id
  if (actualId) {
    await client.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
    const odpVersionId = await getOdpVersionId(client, odpId)
    const odpClasses = await getOdpNationalClasses(client, odpVersionId)
    return await wipeNationalClassIssues(client, odpId, countryIso, odpClasses)
  }

  return await deleteOdp(client, odpId, user)
}
export const createOdp = async (client: any, countryIso: any, user: any) => {
  await client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso])
  const resSelectId = await client.query('SELECT last_value FROM odp_id_seq')
  const odpId = resSelectId.rows[0].last_value
  await insertAudit(client, user.id, 'createOdp', countryIso, 'odp', { odpId })
  return odpId
}
export const markAsActual = async (client: any, odpId: any, user: any) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const checkCountryAccessPromise = getAndCheckOdpCountryId(client, odpId, user)
  const updateOdpPromise = client.query(
    'UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL',
    [odpId]
  )
  const { oldActualId, countryIso } = await (Promise as any).join(
    currentOdpPromise,
    checkCountryAccessPromise,
    updateOdpPromise,
    (oldActualResult: any, countryIso: any) => {
      if (oldActualResult.rowCount > 0 && oldActualResult.rows[0].draft_id) {
        return { oldActualId: oldActualResult.rows[0].actual_id, countryIso }
      }
      return { countryIso }
    }
  )
  await insertAudit(client, user.id, 'markAsActual', countryIso, 'odp', { odpId })
  if (oldActualId) {
    return await Promise.all([
      wipeClassData(client, oldActualId),
      client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId]),
    ])
  }
  return null
}
export const getAndCheckOdpCountryId = async (client: any, odpId: any, user: any) => {
  const res = await client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
  const countryIso = res.rows[0].country_iso
  checkCountryAccess(countryIso, user)
  return countryIso
}
export const deleteOdp = async (client: any, odpId: any, user: any) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)
  const odpVersionId = await getOdpVersionId(client, odpId)
  await client.query('DELETE FROM odp WHERE id = $1', [odpId])
  return await Promise.all([
    wipeClassData(client, odpVersionId).then(() =>
      client.query('DELETE FROM odp_version WHERE id = $1', [odpVersionId])
    ),
    deleteIssues(client, countryIso, 'odp', 0, odpId),
    insertAudit(client, user.id, 'deleteOdp', countryIso, 'odp', { odpId }),
  ])
}
export const getOdpVersionId = async (client: any, odpId: any, schemaName = 'public') => {
  const tableName = `${schemaName}.odp`
  const res = await client.query(
    `
    SELECT
      CASE WHEN draft_id IS NULL
        THEN actual_id
        ELSE draft_id
      END AS version_id
    FROM ${tableName}
    WHERE id = $1`,
    [odpId]
  )
  return res.rows[0].version_id
}
export const getOdp = async (odpId: any, schemaName = 'public') => {
  const versionId = await getOdpVersionId(db.pool, odpId, schemaName)
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const nationalClasses = await getOdpNationalClasses(db.pool, versionId, schemaName)
  const resEditStatus = await db.pool.query(
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
        FROM ${tableNameOdp} p
        JOIN ${tableNameOdpVersion} v
        ON v.id = $2
        WHERE p.id = $1
        `,
    [odpId, versionId]
  )
  const editStatus = camelize(resEditStatus.rows[0])
  const dataSourceMethods = editStatus?.dataSourceMethods?.methods
  return { ...editStatus, nationalClasses, dataSourceMethods }
}
export const readEofOdps = async (countryIso: any, schemaName = 'public') => {
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const tableNameOdpClass = `${schemaName}.odp_class`
  const res = await db.pool.query(
    `
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
    FROM ${tableNameOdp} p
    JOIN ${tableNameOdpVersion} v
    ON v.id =
      CASE WHEN p.draft_id IS NULL
      THEN p.actual_id
      ELSE p.draft_id
    END
    LEFT OUTER JOIN ${tableNameOdpClass} c
      ON c.odp_version_id = v.id
    WHERE p.country_iso = $1 AND year IS NOT NULL
    GROUP BY odp_id, v.year, v.data_source_methods, draft`,
    [countryIso]
  )
  return R.reduce(eofReducer, [], res.rows)
}
export const readFocOdps = async (countryIso: any, schemaName = 'public') => {
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const tableNameOdpClass = `${schemaName}.odp_class`
  const res = await db.pool.query(
    `
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
    FROM ${tableNameOdp} p
    JOIN ${tableNameOdpVersion} v
    ON v.id =
      CASE WHEN p.draft_id IS NULL
      THEN p.actual_id
      ELSE p.draft_id
    END
    LEFT OUTER JOIN ${tableNameOdpClass} c
      ON c.odp_version_id = v.id
    WHERE p.country_iso = $1 AND year IS NOT NULL
    GROUP BY odp_id, v.year, v.data_source_methods, draft`,
    [countryIso]
  )
  // TODO: Remove ramda
  return R.reduce(focReducer, [], res.rows)
}

export const listOriginalDataPoints = async (countryIso: any, schemaName = 'public') => {
  const tableName = `${schemaName}.odp`
  const res = await db.pool.query(
    `
    SELECT p.id as odp_id
    FROM ${tableName} p
    WHERE country_iso = $1
  `,
    [countryIso]
  )
  const odps = await Promise.all(res.rows.map((r: any) => getOdp(r.odp_id, schemaName)))
  return [...odps].sort((odp1, odp2) => odp1.year - odp2.year)
}

export const listAndValidateOriginalDataPoints = async (countryIso: any) => {
  const odps = await listOriginalDataPoints(countryIso)
  return odps.map((odp: any) => ({ ...odp, validationStatus: validateDataPoint(odp) }))
}

export default {
  saveDraft,
  deleteDraft,
  getOdp,
  markAsActual,
  deleteOdp,
  readEofOdps,
  readFocOdps,
  listOriginalDataPoints,
  listAndValidateOriginalDataPoints,
}
