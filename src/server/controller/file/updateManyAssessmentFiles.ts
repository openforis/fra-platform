import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { AssessmentFile, AssessmentFileProps } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentFileRepository } from 'server/repository/assessment/file'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  props?: AssessmentFileProps
  user?: User
  UUIDs: Array<string>
}

export const updateManyAssessmentFiles = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<AssessmentFile>> => {
  const { assessment, countryIso, UUIDs, props: _props, user } = props

  return client.tx(async (t) => {
    const updateProps = { assessment, UUIDs, props: _props }
    const updatedAssessmentFiles = await AssessmentFileRepository.updateMany(updateProps, t)

    const files = updatedAssessmentFiles.map(({ fileName, props }) => ({
      fileName,
      props,
    }))

    const target = { files }
    const message = ActivityLogMessage.assessmentFileUpdate
    const activityLog = { target, section: 'assessment', message, countryIso, user }
    const activityLogParams = { activityLog, assessment }
    await ActivityLogRepository.insertActivityLog(activityLogParams, t)

    return updatedAssessmentFiles
  })
}
