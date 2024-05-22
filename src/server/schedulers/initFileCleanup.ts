import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { FileRepository } from 'server/repository/public/file'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export const initFileCleanup = (connection: IORedis): Worker => {
  const name = 'Scheduler-FileCleanup'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async () => {
      Logger.info(`[${name}] ** started`)

      const assessments = await AssessmentController.getAll({})
      const schemaNames = assessments.flatMap((assessment) =>
        assessment.cycles.map((cycle) => Schemas.getNameCycle(assessment, cycle))
      )
      let where = schemaNames
        .map((schemaName) => `not exists (select 1 from ${schemaName}.repository where file_uuid = public.file.uuid)`)
        .join(' and ')

      // Don't remove files that are still in use by users (profile picture)
      where += ' and not exists (select 1 from public.users where profile_picture_file_uuid = public.file.uuid)'

      const query = `
        select uuid from public.file
        where ${where}
        `
      const uuids = await client.map(query, [], (row) => row.uuid)

      if (uuids.length > 0) {
        const files = await FileRepository.removeMany({ uuids })

        files.forEach((file) => {
          Logger.info(`[${name}] removed file ${file.name} (${file.uuid})`)
        })
      }

      Logger.info(`[${name}] ** terminated`)
    },
    { concurrency: 1, connection, lockDuration: 10_000, maxStalledCount: 0 }
  )

  queue.add(`${name}-scheduler`, undefined, {
    repeat: { pattern: '0 0 * * 0' },
    removeOnComplete: true,
    removeOnFail: false,
  })

  return worker
}
