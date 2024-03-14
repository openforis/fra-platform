import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const iconName = 'small-print'
const inverse = true
const size = ButtonSize.l
const type = ButtonType.anonymous

const LinksPrint: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const className = useButtonClassName({ iconName, inverse, size, type })

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      <Link
        className={className}
        target="_blank"
        to={Routes.Print.generatePath({ countryIso, assessmentName, cycleName })}
      >
        <Icon className="icon-no-margin icon-sub" name={iconName} />
      </Link>
    </MediaQuery>
  )
}

export default LinksPrint
