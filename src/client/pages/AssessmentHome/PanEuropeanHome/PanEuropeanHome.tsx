import './PanEuropeanHome.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentHomeRouteNames, ClientRoutes } from 'meta/app'
import { Areas } from 'meta/area'

import { useCountryIso } from 'client/hooks'
import User from 'client/pages/User'

import { useSections } from './hooks/useSections'

const PanEuropeanHome: React.FC = () => {
  const { i18n } = useTranslation()
  const sections = useSections()
  const countryIso = useCountryIso()

  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

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

        <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to={AssessmentHomeRouteNames.overview} />} />
      </Routes>
    </>
  )
}
export default PanEuropeanHome
