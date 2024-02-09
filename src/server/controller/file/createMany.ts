import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { File } from 'meta/file'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'

type Props = {
  assessment: Assessment
  cycle?: Cycle
  files: Array<Express.Multer.File>
  user: User
}

export const createMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<File>> => {
  const { assessment, cycle, files, user } = props

  return client.tx(async (t) => {
    return Promise.all(
      files.map(async (multerFile) => {
        const file = await FileRepository.create({ ...props, file: multerFile }, t)

        const target = { fileName: file.fileName, uuid: file.uuid }
        const message = ActivityLogMessage.fileCreate
        const activityLog = { target, section: 'assessment', message, user }
        const activityLogParams = { activityLog, assessment, cycle }
        await ActivityLogRepository.insertActivityLog(activityLogParams, t)

        return file
      })
    )
  })
}
