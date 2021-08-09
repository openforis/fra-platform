import { BaseProtocol, DB } from '@server/db'

export const wipeClassData = async (options: { odpVersionId: number }, client: BaseProtocol = DB) => {
  const { odpVersionId } = options
  return client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])
}
