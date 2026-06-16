import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { FileSummary } from 'meta/file/file'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { FileRepository } from 'server/db/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  assessment: Assessment
  cycle?: Cycle
  files: Array<Express.Multer.File>
  user: User
}

export const createMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<FileSummary>> => {
  const { assessment, cycle, files, user } = props

  return client.tx(async (t) => {
    return Promise.all(
      files.map(async (multerFile) => {
        const { originalname: fileName, size } = multerFile
        const file = await FileRepository.create({ ...props, fileName, size }, t)
        const { uuid } = file
        const key = uuid
        const body = multerFile.buffer
        await FileStorage.File.upload({ key, body })

        const target = { fileName, uuid }
        const message = ActivityLogMessage.fileCreate
        const activityLog = { target, section: 'assessment', message, user }
        const activityLogParams = { activityLog, assessment, cycle }
        await ActivityLogRepository.insertActivityLog(activityLogParams, t)

        return file
      })
    )
  })
}
