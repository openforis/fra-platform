import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { AssessmentFile } from 'meta/cycleData'
import { Authorizer, User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentFileRepository } from 'server/repository/assessment/file'

type Props = {
  assessment: Assessment
  cycle?: Cycle
  countryIso?: CountryIso
  fileName?: string
  uuid?: string
  user?: User
}

export const getAssessmentFile = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentFile> => {
  const { assessment, cycle, countryIso, user } = props

  const assessmentFile = await AssessmentFileRepository.getOne(props, client)

  const canViewCountryFile = Authorizer.canViewCountryFile({ assessment, countryIso, user, cycle, assessmentFile })

  if (!canViewCountryFile) {
    throw new Error('userNotAuthorized')
  }

  return assessmentFile
}
