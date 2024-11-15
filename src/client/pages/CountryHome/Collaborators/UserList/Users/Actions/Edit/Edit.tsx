import React from 'react'
import { Link } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { CountryUserSummary, Users } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  countryUserSummary: CountryUserSummary
}

const Edit = (props: Props) => {
  const { countryUserSummary } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const currentUser = useUser()
  const { id } = countryUserSummary
  const cycle = useCycle()

  if (CountryUserSummaries.isInvitation(countryUserSummary, countryIso)) {
    return null
  }

  const currentUserIsReviewer = Users.isReviewer(currentUser, countryIso, cycle)
  // const text = t(currentUserIsReviewer ? 'common.view' : 'userManagement.edit')
  const icon = currentUserIsReviewer ? 'icon-eye' : 'pencil'

  const to = Routes.CountryUser.generatePath({ countryIso, assessmentName, cycleName, id })

  // TODO: Add tooltip: text
  return (
    <Link to={to} type="button">
      <Button iconName={icon} inverse size={ButtonSize.s} type={ButtonType.primary} />
    </Link>
  )
}
export default Edit
