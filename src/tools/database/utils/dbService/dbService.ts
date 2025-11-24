import { initSchemas } from './initSchema/initSchema'
import { exportTables } from './exportTables'
import { importTables } from './importTables'

export const DBService = {
  exportTables,
  importTables,
  initSchemas,
}
