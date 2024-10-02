import { BaseProtocol } from 'server/db'
import { Logger } from 'server/utils/logger'

export default async (client: BaseProtocol, fileName: string) => {
  try {
    // === 1. Truncate migration_steps table and reset the primary key
    await client.none('truncate table migrations.steps restart identity')
    Logger.info('Truncated migrations.steps table and reset primary key')

    // === 2. Insert the current reset step into the migrations.steps table
    await client.none('insert into migrations.steps (name) values ($1)', [fileName])
    Logger.info(`Inserted reset step ${fileName} into migrations.steps table`)

    Logger.info('Database table migrations.steps reset completed successfully')
  } catch (error) {
    Logger.error('Error resetting database:', error)
    throw error
  }
}
