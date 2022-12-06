import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentHomeRouteNames, ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'
import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import User from '@client/pages/User'

import { useSections } from './hooks/useSections'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'
import FraHomeSections from './FraHomeSections'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const sections = useSections()

  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  useEffect(() => {
    if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
      dispatch(
        UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [countryIso, cycle, assessment, user, dispatch])

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
              to={ClientRoutes.Assessment.Home.Section.getLink({
                assessmentName: assessment.props.name,
                countryIso,
                cycleName: cycle.name,
                sectionName: name as unknown as AssessmentHomeRouteNames,
              })}
              className={(navData) =>
                classNames('btn landing__page-menu-button', {
                  disabled: navData.isActive,
                })
              }
            >
              {i18n.t<string>(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Routes>
        <Route path={`${ClientRoutes.Assessment.Home.Section.path.relative}/*`} element={<FraHomeSections />} />

        <Route path={ClientRoutes.Assessment.Home.Users.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to={AssessmentHomeRouteNames.overview} />} />
      </Routes>
    </>
  )
}
export default FraHome
