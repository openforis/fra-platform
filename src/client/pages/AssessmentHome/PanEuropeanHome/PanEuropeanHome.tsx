import './PanEuropeanHome.scss'
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

const PanEuropeanHome = () => {
  const { i18n } = useTranslation()
  const sections = useSections()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const user = useUser()
  const cycle = useCycle()
  const dispatch = useAppDispatch()

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
      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              to={name}
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
        {sections.map(({ name, component }) => (
          <Route key={name} path={name} element={React.createElement(component, {})} />
        ))}

        <Route path={ClientRoutes.Assessment.Cycle.Country.Home.Users.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to={AssessmentHomeRouteNames.overview} />} />
      </Routes>
    </>
  )
}
export default PanEuropeanHome
