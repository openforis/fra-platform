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
