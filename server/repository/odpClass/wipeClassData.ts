export const wipeClassData = async (client: any, odpVersionId: any) =>
  await client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])
