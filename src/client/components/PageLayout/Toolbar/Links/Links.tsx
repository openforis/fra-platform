import React from 'react'
import MediaQuery from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { Breakpoints } from 'client/utils'

const iconName = 'small-print'
const inverse = true
const size = ButtonSize.l

const Links: React.FC = () => {
  const navigate = useNavigate()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const geoRoute = useIsGeoRoute()
  const user = useUser()
  const cycle = useCycle()
  const classNamePrint = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })
  const classNameGeo = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const withGeo = Users.isReviewer(user, countryIso, cycle)
  const pathPrint = Routes.Print.generatePath({ assessmentName, cycleName, countryIso })
  const pathGeo = Routes.Geo.generatePath({ assessmentName, cycleName, countryIso })

  return (
    <MediaQuery minWidth={Breakpoints.laptop}>
      {!geoRoute && (
        <Link className={classNamePrint} target="_blank" to={pathPrint}>
          <Icon className="icon-no-margin icon-sub" name="small-print" />
        </Link>
      )}

      {withGeo && (
        <>
          <div className="toolbar__separator" />
          {geoRoute ? (
            <Button iconName="earth" onClick={() => navigate(-1)} size={size} type={ButtonType.blackMap} />
          ) : (
            <Link className={classNameGeo} to={pathGeo}>
              <Icon className="icon-no-margin icon-sub" name="earth" />
            </Link>
          )}
        </>
      )}
    </MediaQuery>
  )
}

export default Links
