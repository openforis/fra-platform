import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, AssessmentFile } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentFileRepository } from 'server/repository/assessment/file'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const createAssessmentFile = async (
  props: {
    assessment: Assessment
    countryIso?: CountryIso
    assessmentFile: Express.Multer.File
    user?: User
  },
  client: BaseProtocol = DB
): Promise<AssessmentFile> => {
  const { assessment, countryIso, assessmentFile, user } = props

  return client.tx(async (t) => {
    const createdAssessmentFile = await AssessmentFileRepository.create({ assessment, countryIso, file: assessmentFile }, t)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: { fileName: createdAssessmentFile.fileName },
          section: 'assessment',
          message: ActivityLogMessage.assessmentFileCreate,
          countryIso,
          user,
        },
        assessment,
      },
      t
    )

    return createdAssessmentFile
  })
}
