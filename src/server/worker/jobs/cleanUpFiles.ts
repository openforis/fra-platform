import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { FileRepository } from 'server/db/repository/public/file'
import { Schemas } from 'server/db/schemas'
import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB
const name = 'Scheduler-FileCleanup'

export const cleanUpFiles = async (): Promise<void> => {
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
    // Remove public.file reference
    const files = await FileRepository.removeMany({ uuids })
    // Remove S3 files
    await Promises.each(files, async (file) => {
      await FileStorage.File.remove({ key: file.uuid })
    })

    files.forEach((file) => {
      Logger.info(`[${name}] removed file ${file.name} (${file.uuid})`)
    })
  }

  Logger.info(`[${name}] ** terminated`)
}
