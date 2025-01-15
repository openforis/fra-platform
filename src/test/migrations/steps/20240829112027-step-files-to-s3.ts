import { BaseProtocol, DB } from 'server/db'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export default async () => {
  try {
    await client.query(`create schema if not exists _legacy;`) // eg running vs partial db

    // Check if _legacy.file table exists
    const legacyTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = '_legacy.file'
      );
    `)

    if (!legacyTableExists[0].exists) {
      // Create a copy of the public.file table as _legacy.file
      await client.query(`
        CREATE TABLE _legacy.file AS
        TABLE public.file;
      `)
    } else {
      Logger.debug('_legacy.file table already exists, skipping creation.')
    }

    // Remove the 'file' column from the 'public.file' table
    await client.query(`
      ALTER TABLE public.file
      DROP COLUMN file;
    `)

    Logger.debug('File migration completed and file column removed.')
  } catch (err) {
    Logger.error('Error migrating files:', err)
  }
}
