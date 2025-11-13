import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'

import { exportTable } from './exportTable'
import { TABLES_TO_EXPORT } from './tables'

export const exportAll = async (client: BaseProtocol = DB): Promise<Array<ExportedTableData>> => {
  return Promise.all(TABLES_TO_EXPORT.map((tableConfig) => exportTable(tableConfig, client)))
}
