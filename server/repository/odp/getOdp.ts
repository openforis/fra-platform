// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as camelize from 'camelize'

import { OdpClassRepository } from '@server/repository'
import { ODP } from '@core/odp'
import { BaseProtocol, DB } from '@server/db'
import { getOdpVersionId } from './getOdpVersionId'

export const getOdp = async (
  options: { odpId: string | number; schemaName?: string },
  client: BaseProtocol = DB
): Promise<ODP> => {
  const { odpId, schemaName = 'public' } = options
  const versionId = await getOdpVersionId({ odpId }, client, schemaName)
  const tableNameOdp = `${schemaName}.odp`
  const tableNameOdpVersion = `${schemaName}.odp_version`
  const nationalClasses = await OdpClassRepository.getOdpNationalClasses(client, versionId, schemaName)
  const resEditStatus = await client.query(
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
  const editStatus = camelize(resEditStatus[0])
  const dataSourceMethods = editStatus?.dataSourceMethods?.methods
  return { ...editStatus, nationalClasses, dataSourceMethods }
}
