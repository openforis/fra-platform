import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { User, Users } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

interface Props {
  user: User
}

const UserEditColumn: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { t } = useTranslation()

  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycle = useCycle()
  const cycleName = cycle.name
  const countryIso = useCountryIso()
  const currentUser = useUser()

  const currentUserIsNationalCorrespondent = Users.isNationalCorrespondent(currentUser, countryIso, cycle)

  const userIsReviewer = Users.isReviewer(user, countryIso, cycle)

  // National correspondents can't edit reviewers
  if (currentUserIsNationalCorrespondent && userIsReviewer) return null

  return (
    <Link
      to={ClientRoutes.Assessment.Cycle.Country.Users.User.getLink({
        countryIso,
        assessmentName,
        cycleName,
        id: user.id,
      })}
      type="button"
      className="link"
    >
      {t('userManagement.edit')}
    </Link>
  )
}

export default UserEditColumn
