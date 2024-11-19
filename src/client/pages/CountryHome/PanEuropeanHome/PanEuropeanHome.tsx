import './PanEuropeanHome.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from 'meta/area'
import { SectionNames } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useSections } from './hooks/useSections'

// TODO: Where to put country message button?

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
              className={(navData) =>
                classNames('btn landing__page-menu-button', {
                  disabled: navData.isActive,
                })
              }
              to={name}
            >
              {t(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} element={React.createElement(component, {})} path={`${name}/*`} />
        ))}

        <Route element={<Navigate replace to={SectionNames.Country.Home.overview} />} index />
      </Routes>
    </>
  )
}
export default PanEuropeanHome
