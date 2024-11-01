import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  user: User
}

const Edit = (props: Props) => {
  const { user } = props
  const currentUser = useUser()
  const { id } = user
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const cycle = useCycle()

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
