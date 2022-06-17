import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { Areas } from '@meta/area'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { AssessmentHomeRouteNames } from '@client/basePaths'
import { ClientRoutes } from '@client/clientRoutes'

import { useSections } from './hooks/useSections'
import ButtonDownloadStatisticalFactsheets from './ButtonDownloadStatisticalFactsheets'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const sections = useSections()
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          <>
            {i18n.t(`area.${countryIso}.listName`)}

            <ButtonDownloadStatisticalFactsheets />
          </>
        </h1>

        {Areas.isISOGlobal(countryIso) && <CountrySelector />}
      </div>

      {Areas.isISOGlobal(countryIso) && <SelectedCountries />}

      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              to={ClientRoutes.Assessment.home.generatePath({ countryIso, assessmentName, cycleName, route: name })}
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
          <Route
            key={name}
            path={ClientRoutes.Assessment.home.generatePath({ countryIso, assessmentName, cycleName, route: name })}
            element={React.createElement(component, {})}
          />
        ))}

        <Route
          path="*"
          element={
            <Navigate
              to={ClientRoutes.Assessment.home.generatePath({
                countryIso,
                assessmentName,
                cycleName,
                route: AssessmentHomeRouteNames.overview,
              })}
              replace
            />
          }
        />
      </Routes>
    </>
  )
}
export default FraHome
