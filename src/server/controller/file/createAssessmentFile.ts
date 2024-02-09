import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { AssessmentFile, AssessmentFileProps } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentFileRepository } from 'server/repository/assessment/file'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  file: Express.Multer.File
  countryIso?: CountryIso
  props?: AssessmentFileProps
  user?: User
}
/**
 * @Deprecated
 */
export const createAssessmentFile = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentFile> => {
  const { assessment, countryIso, user } = props

  return client.tx(async (t) => {
    const createdAssessmentFile = await AssessmentFileRepository.create(props, t)

    const target = { fileName: createdAssessmentFile.fileName }
    const message = ActivityLogMessage.assessmentFileCreate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return createdAssessmentFile
  })
}
