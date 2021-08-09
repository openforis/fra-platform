// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'

import * as db from '@server/db/db_deprecated'

import { OdpClassRepository } from '@server/repository'
import { ODP } from '@core/odp'
import { getOdpVersionId } from './getOdpVersionId'

export const getOdp = async (odpId: any, schemaName = 'public'): Promise<ODP> => {
  const versionId = await getOdpVersionId({ odpId }, db.pool, schemaName)
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const nationalClasses = await OdpClassRepository.getOdpNationalClasses(db.pool, versionId, schemaName)
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
