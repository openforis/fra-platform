import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'
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
  const currentUserIsAlternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(
    currentUser,
    countryIso,
    cycle
  )

  const userIsCollaborator = Users.isCollaborator(user, countryIso, cycle)

  // National/Alternate national correspondents can edit only collaborators
  if ((currentUserIsNationalCorrespondent || currentUserIsAlternateNationalCorrespondent) && !userIsCollaborator)
    return null

  const currentUserIsReviewer = Users.isReviewer(currentUser, countryIso, cycle)
  const linkText = currentUserIsReviewer ? 'common.view' : 'userManagement.edit'

  return (
    <Link
      to={Routes.CountryUser.generatePath({
        countryIso,
        assessmentName,
        cycleName,
        id: user.id,
      })}
      type="button"
      className="link"
    >
      {t(linkText)}
    </Link>
  )
}

export default UserEditColumn
