import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'small-print'
const inverse = true
const size = ButtonSize.l

const LinkPrint: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const classNamePrint = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const path = Routes.Print.generatePath({ assessmentName, cycleName, countryIso })

  return (
    <Link className={classNamePrint} target="_blank" to={path}>
      <Icon className="icon-no-margin icon-sub" name="small-print" />
    </Link>
  )
}

export default LinkPrint
