import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { FileRepository } from 'server/repository/public/file'
import { FileStorage } from 'server/service/fileStorage'

type Props = {
  assessment: Assessment
  cycle: Cycle
  uuid: string
  user: User
}

export const deleteOne = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, uuid, user } = props

  return client.tx(async (t) => {
    const fileSummary = await FileRepository.remove({ uuid })
    await FileStorage.removeFile({ key: fileSummary.uuid })

    const target = { fileName: fileSummary.name, uuid }
    const message = ActivityLogMessage.fileDelete
    const activityLog = { target, section: 'assessment', message, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)
  })
}
