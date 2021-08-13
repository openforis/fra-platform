import { BaseProtocol, DB } from '@server/db'

export const getOdpVersionId = async (
  options: { odpId: number | string; schemaName?: string },
  client: BaseProtocol = DB
): Promise<number> => {
  const { odpId, schemaName = 'public' } = options
  const tableName = `${schemaName}.odp`
  const [{ version_id: versionId }] = await client.query(
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
  return versionId
}
