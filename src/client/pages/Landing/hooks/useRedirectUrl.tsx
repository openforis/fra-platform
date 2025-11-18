import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUser } from 'client/store/user/hooks/user'

type Props = {
  assessment: Assessment
}

export const useRedirectUrl = (props: Props): string => {
  const { assessment } = props
  const user = useUser()

  let cycle = Assessments.getLastPublishedCycle(assessment)
  let countryIso: CountryIso

  // if admin, cycle -> last created cycle
  const admin = Users.isAdministrator(user)
  if (admin) {
    cycle = Assessments.getLastCreatedCycle(assessment)
  }
  // if other users, assessment, cycle, countryIso -> from last role
  const userLastRole = UserRoles.getLastRole({ assessment, user })
  if (!admin && !Objects.isNil(userLastRole)) {
    cycle = Assessments.getCycle({ assessment, cycleUuid: userLastRole.cycleUuid })
    countryIso = userLastRole.countryIso
  }

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  if (Objects.isNil(countryIso)) return Routes.Cycle.generatePath({ assessmentName, cycleName })

  return Routes.Country.generatePath({ assessmentName, cycleName, countryIso })
}
