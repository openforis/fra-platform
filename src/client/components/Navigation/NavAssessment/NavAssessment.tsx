import './NavAssessment.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { Areas, CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'

import { useSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Hr from 'client/components/Hr'
import Icon from 'client/components/Icon'
import Header from 'client/components/Navigation/NavAssessment/Header'
import NavigationSection from 'client/components/Navigation/NavAssessment/Section'
import { Breakpoints } from 'client/utils'

import { useMaxHeight } from './hooks/useMaxHeight'

const NavAssessment: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const sections = useSections()

  const maxHeight = useMaxHeight()
  const [showSections, setShowSections] = useState<boolean>(false)

  if (Objects.isEmpty(sections)) return null

  return (
    <div className="nav-assessment" style={{ maxHeight }}>
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
              <Icon className="icon-sub icon-white" name="hit-down" />
            </div>
            <div className="nav-section__label">{t('dataDownload.dataDownload')}</div>
          </Link>
        </MediaQuery>
      )}
    </div>
  )
}

export default NavAssessment
