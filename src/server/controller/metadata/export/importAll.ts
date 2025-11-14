import { ExportedTableData } from 'meta/metadata/export'

import { BaseProtocol, DB } from 'server/db/db'

import { importTable } from './importTable'

export const importAll = async (allData: Array<ExportedTableData>, client: BaseProtocol = DB): Promise<void> => {
  await Promise.all(allData.map((tableData) => importTable(tableData, client)))
}
