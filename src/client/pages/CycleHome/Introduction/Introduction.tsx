import './introduction.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'

const Introduction: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return (
    <div className="home-introduction">
      <video autoPlay className="home-introduction__video" loop muted playsInline src="/video/FRA2020_Web.mp4" />

      <div className="home-introduction__about-fra">
        <div className="header">{t('common.globalFRA')}</div>
        <div className="process">{t('landing.about.fraProcess')}</div>
        <a
          className="home-link link-fra-process"
          href={`http://www.fao.org/forest-resources-assessment/${language}/`}
          rel="noreferrer"
          target="_blank"
        >
          &gt; {t('landing.about.linkFraProcess')}
        </a>

        <div className="home-introduction__area-selector">
          <hr />

          <div>{t('landing.about.selectArea')}</div>

          <div className="home-area-selector">
            <div className="home-area-selector__group">
              <img alt="" src="/img/iconGlobal.svg" />
              <Link
                className="home-link m-r"
                to={Routes.Country.generatePath({ countryIso: Global.WO, assessmentName, cycleName })}
              >
                {t(`area.${Global.WO}.listName`)}
              </Link>
            </div>

            <div className="home-area-selector__group">
              <img alt="" src="/img/iconRegions.svg" />
              <div>{t('common.regions')}</div>
              <AreaSelector includeRegions={['fra2020', 'secondary']} placeholder="common.select" />
            </div>

            <div className="home-area-selector__group">
              <img alt="" src="/img/iconCountries.svg" />
              <div>{t('common.countries')}</div>
              <AreaSelector includeCountries placeholder="common.select" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
