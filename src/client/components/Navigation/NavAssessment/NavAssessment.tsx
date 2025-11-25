import './NavAssessment.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Routes } from 'meta/routes/routes'

import { useHistoryActivitiesIsActive } from 'client/store/data/history/hooks/activities'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'
import Header from 'client/components/Navigation/NavAssessment/Header'
import History from 'client/components/Navigation/NavAssessment/History'
import NavigationSection from 'client/components/Navigation/NavAssessment/Section'
import { Breakpoints } from 'client/utils/breakpoints'

const NavAssessment: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const sections = useSections()
  const historyActive = useHistoryActivitiesIsActive()

  const [showSections, setShowSections] = useState<boolean>(false)

  if (Objects.isEmpty(sections)) {
    return null
  }

  if (historyActive) {
    return <History />
  }

  return (
    <>
      <Header setShowSections={setShowSections} showSections={showSections} />

      {sections.map((section) => (
        <NavigationSection key={section.uuid} section={section} showSections={showSections} />
      ))}

      {Areas.isGlobal(countryIso) && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <div className="nav-header__sep-container">
            <Hr />
          </div>
          <Link
            className="nav-section__header nav-assessment__bulk-download"
            to={Routes.CountryDataDownload.generatePath({ assessmentName, cycleName, countryIso })}
          >
            <div className="nav-section__order">
              <Icon className="icon-white" name="hit-down" />
            </div>
            <div className="nav-section__label">{t('dataDownload.dataDownload')}</div>
          </Link>
        </MediaQuery>
      )}
    </>
  )
}

export default NavAssessment
