import './PanEuropeanHome.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from 'meta/area'
import { SectionNames } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useSections } from './hooks/useSections'

const PanEuropeanHome: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const sections = useSections()

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
              {t(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} path={`${name}/*`} element={React.createElement(component, {})} />
        ))}

        <Route index element={<Navigate replace to={SectionNames.Country.Home.overview} />} />
      </Routes>
    </>
  )
}
export default PanEuropeanHome
