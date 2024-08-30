import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { FileSummary } from 'meta/file'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
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
        const fileName = multerFile.originalname
        const file = await FileRepository.create({ ...props, fileName }, t)
        const { uuid } = file
        const key = uuid
        const body = multerFile.buffer
        await FileStorage.uploadFile({ key, body })

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
