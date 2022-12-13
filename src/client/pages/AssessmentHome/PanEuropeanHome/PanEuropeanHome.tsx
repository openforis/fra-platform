import './PanEuropeanHome.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentHomeRouteNames, ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'
import User from '@client/pages/User'

// eslint-disable-next-line import/no-unresolved
import { useSections } from './hooks/useSections'

const PanEuropeanHome = () => {
  const {
    t,
    i18n,
    i18n: { language },
  } = useTranslation()
  const sections = useSections()
  const countryIso = useCountryIso()

  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  return (
    <div className="pan-eu-home">
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

        <Route path={ClientRoutes.Assessment.Home.Users.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to={AssessmentHomeRouteNames.overview} />} />
      </Routes>
      <p>{t('panEuropean.home.description1')}</p>
      <p>
        {t('panEuropean.home.description2')}{' '}
        <a href="https://foresteurope.org/state-europes-forests-2020-report/" rel="noreferrer" target="_blank">
          {t('panEuropean.home.stateOfEuropeForest')}
        </a>{' '}
        {t('panEuropean.home.description3')}{' '}
      </p>

      <div className="partners">
        <hr className="no-print" />

        <div className="partners__disclaimer">
          <div>
            {t('panEuropean.disclaimer.platformDeveloped')}{' '}
            <a href={`http://www.fao.org/home/${language}/`} rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.fao')}
            </a>{' '}
            {t('panEuropean.disclaimer.and')}{' '}
            <a href="https://unece.org" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.unece')}
            </a>{' '}
            {t('panEuropean.disclaimer.technicalSupport')}{' '}
            <a href="https://foresteurope.org" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.forestEurope')}
            </a>
          </div>
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" src={`/img/fao/FAO${language}_blue.svg`} />
          <img alt="" src="/img/partners/UNECE.gif" />
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" className="forestEurope" src="/img/partners/ForestEurope.png" />
        </div>
      </div>

      <div className="partners">
        <hr className="no-print" />
        <div className="partners__disclaimer">
          <div className="partners__disclaimerLogos">
            <img alt={t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          </div>

          <div className="partners__disclaimerText">
            <div>{t('panEuropean.disclaimer.part1')}&nbsp;</div>
            <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
              {t('panEuropean.disclaimer.govSwitzerland')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanEuropeanHome
