// TODO: Change client to BaseProtocol = DB
export const getOdpVersionId = async (
  options: { odpId: number | string },
  client: any,
  schemaName = 'public'
): Promise<number> => {
  const { odpId } = options
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
  // TODO: Remove after migration to pg-promise done
  return (res.rows ? res.rows : res)[0].version_id
}
