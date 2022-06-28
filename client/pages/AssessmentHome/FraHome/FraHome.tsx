import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router'
import { NavLink, Route, Switch } from 'react-router-dom'

import { Areas } from '@meta/area'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { AssessmentHomeRouteNames, BasePaths } from '@client/basePaths'

import { useSections } from './hooks/useSections'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

  const sections = useSections()
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  useEffect(() => {
    if (user) {
      dispatch(
        UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [countryIso, cycle, assessment, user])

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {i18n.t<string>(`area.${countryIso}.listName`)}
          <ButtonDownloadDashboard />
        </h1>

        {Areas.isISOGlobal(countryIso) && <CountrySelector />}
      </div>

      {Areas.isISOGlobal(countryIso) && <SelectedCountries />}

      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              to={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, name)}
              className="btn landing__page-menu-button"
              activeClassName="disabled"
            >
              {i18n.t<string>(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Switch>
        <Redirect
          from={BasePaths.Assessment.home()}
          to={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, AssessmentHomeRouteNames.overview)}
          exact
        />
        {sections.map(({ name, component }) => (
          <Route
            key={name}
            path={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, name)}
            component={component}
          />
        ))}
      </Switch>
    </>
  )
}
export default FraHome
