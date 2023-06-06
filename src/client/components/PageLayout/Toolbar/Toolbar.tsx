import './Toolbar.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Areas } from 'meta/area'
import { Users } from 'meta/user'

import { useAssessment, useCountry, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'
import Icon from 'client/components/Icon'
import LinkHome from 'client/components/LinkHome'
import { Breakpoints } from 'client/utils'

import Lock from './Lock'
import Status from './Status'
import ToggleNavigationControl from './ToggleNavigationControl'

const Toolbar: React.FC = () => {
  const { t } = useTranslation()
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

  const isAdmin = Users.isAdministrator(user)
  const includeGlobals = isAdmin || cycle.published
  const includeRegions = isAdmin || cycle.published

  return (
    <div className="toolbar">
      <div className="toolbar__nav-options">
        <ToggleNavigationControl />

        <AreaSelector
          enableDownload
          includeCountries
          includeGlobals={includeGlobals}
          includeRegions={includeRegions}
          placeholder="common.selectArea"
          selectedValue={countryIso}
          showCountryFlag
          showCountryRole
        />
      </div>

      {isCountry && (
        <>
          <MediaQuery minWidth={Breakpoints.laptop}>
            {user && <Status />}
            {country?.props?.deskStudy && <div className="toolbar__desk-study">({t('assessment.deskStudy')})</div>}
          </MediaQuery>

          <div className="toolbar__utils-container">
            {user && country && Users.hasEditorRole({ user, countryIso, cycle }) && (
              <>
                <Lock />
                <div className="toolbar__separator" />
              </>
            )}

            <MediaQuery minWidth={Breakpoints.laptop}>
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
            </MediaQuery>
          </div>
        </>
      )}

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LinkHome />
      </MediaQuery>
    </div>
  )
}

export default Toolbar
