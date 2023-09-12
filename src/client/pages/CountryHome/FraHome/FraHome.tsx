import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useSections } from './hooks/useSections'
import ButtonDownloadDashboard from './ButtonDownloadDashboard'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const sections = useSections()

  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {t(`area.${countryIso}.listName`)}
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
        {sections.length >= 1 && <Route index element={<Navigate replace to={sections[0].name} />} />}
      </Routes>
    </>
  )
}
export default FraHome
