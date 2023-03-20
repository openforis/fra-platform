import './Toolbar.scss'
import React from 'react'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'
import { Users } from '@meta/user'

import { useAssessment, useCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import AreaSelector from '@client/components/AreaSelector/AreaSelector'
import Icon from '@client/components/Icon'
import LinkHome from '@client/components/LinkHome'
import { Breakpoints } from '@client/utils'

import Lock from './Lock'
import Status from './Status'
import ToggleNavigationControl from './ToggleNavigationControl'

const Toolbar: React.FC = () => {
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const { print } = useIsPrint()
  const user = useUser()

  const isCountry = Areas.isISOCountry(countryIso)
  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  if (print) return null

  return (
    <div className="toolbar">
      <div className="toolbar__nav-options">
        <ToggleNavigationControl />

        <AreaSelector />
      </div>

      {isCountry && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          {user && <Status />}

          {user && country && Users.hasEditorRole({ user, countryIso, cycle }) && <Lock />}

          <div className="links-download">
            <Link
              className="btn btn-secondary"
              to={ClientRoutes.Assessment.Cycle.Country.PrintTables.getLink({
                countryIso,
                assessmentName,
                cycleName,
              })}
              target="_blank"
            >
              <Icon name="small-print" className="icon-margin-left icon-sub" />
              <Icon name="icon-table2" className="icon-no-margin icon-sub" />
            </Link>

            <Link
              className="btn btn-secondary"
              to={ClientRoutes.Assessment.Cycle.Country.Print.getLink({ countryIso, assessmentName, cycleName })}
              target="_blank"
            >
              <Icon name="small-print" className="icon-no-margin icon-sub" />
            </Link>
          </div>
        </MediaQuery>
      )}

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LinkHome />
      </MediaQuery>
    </div>
  )
}

export default Toolbar
