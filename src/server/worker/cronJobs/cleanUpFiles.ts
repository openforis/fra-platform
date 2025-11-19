import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'
import { Job } from 'server/worker/job/job'

const name = 'Scheduler-FileCleanup'

export class CleanUpFiles extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    const assessments = await AssessmentController.getAll({})
    const uuids = await FileRepository.getUnusedUUIDs({ assessments })

    if (uuids.length > 0) {
      // Remove public.file reference
      const files = await FileRepository.removeMany({ uuids })
      // Remove S3 files
      await Promises.each(files, async (file) => {
        await FileStorage.File.remove({ key: file.uuid })
        this.logInfo(`removed file ${file.name} (${file.uuid})`)
      })
    }
  }
}
