import { VisitCycleLinksQueueFactory } from 'server/controller/cycleData/links/visitCycleLinks/queueFactory'
import { WorkerFactory as VisitLinksWorkerFactory } from 'server/controller/cycleData/links/visitCycleLinks/workerFactory'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/updateDependencies'
import { WorkerFactory } from 'server/controller/cycleData/updateDependencies/workerFactory'
import { BaseProtocol, DB } from 'server/db'
import { RedisData } from 'server/repository/redis/redisData'

/**
 * Close the database connection and the Redis connection
 * @param withRedis - Whether to close the Redis connection
 */
const close = async (withRedis: boolean) => {
  await DB.$pool.end()

  if (withRedis) {
    UpdateDependenciesQueueFactory.connection.quit()
    WorkerFactory.connection.quit()
    VisitCycleLinksQueueFactory.connection.quit()
    VisitLinksWorkerFactory.connection.quit()
    RedisData.getInstance().quit()
  }
}

/**
 * Get the DDL for the migrations table
 * @returns The DDL for the migrations table
 */
const _getDDL = (tableName: string) => {
  return `
    create schema if not exists migrations;

    do $$ 
    begin
      create table if not exists migrations.${tableName} (
        id serial primary key,
        name character varying(255) unique not null,
        run_on timestamp without time zone not null default now()
      );
    end $$;
  `
}

/**
 * Create a table in the migrations schema
 * @param tableName - The name of the table to create
 * @param client
 */
const createTable = async (tableName: string, client: BaseProtocol = DB) => {
  await client.query(_getDDL(tableName))
}

/**
 * Get the previous migrations
 * @param tableName - The name of the table to get the previous migrations from
 * @param client
 * @returns The previous migrations
 */
const getPreviousMigrations = async (tableName: string, client: BaseProtocol = DB) => {
  const result = await client.map(`select * from migrations.${tableName}`, [], (row) => row.name)
  return result
}

export const MigrationUtils = {
  close,
  createTable,
  getPreviousMigrations,
}
