import { BaseProtocol, DB } from '@server/db'

export const wipeClassData = async (
  options: { odpVersionId: number | string },
  client: BaseProtocol = DB
): Promise<void> => {
  const { odpVersionId } = options
  return client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])
}
