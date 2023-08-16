import './introduction.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Global } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import AreaSelector from 'client/components/AreaSelector/AreaSelector'

const Introduction: React.FC = () => {
  const { i18n, t } = useTranslation()

  const cycle = useCycle()

  return (
    <div className="home-introduction">
      <video className="home-introduction__video" autoPlay playsInline muted loop src="/video/FRA2020_Web.mp4" />

      <div className="home-introduction__about-fra">
        <div className="header">{t('common.globalFRA')}</div>
        <div className="process">{t('landing.about.fraProcess')}</div>
        <a
          className="home-link link-fra-process"
          href={`http://www.fao.org/forest-resources-assessment/${i18n.resolvedLanguage}/`}
          target="_blank"
          rel="noreferrer"
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
                to={ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
                  countryIso: Global.WO,
                  assessmentName: AssessmentNames.fra,
                  cycleName: cycle.name,
                })}
              >
                {t(`area.${Global.WO}.listName`)}
              </Link>
            </div>

            <div className="home-area-selector__group">
              <img alt="" src="/img/iconRegions.svg" />
              <div>{t('common.regions')}</div>
              <AreaSelector includeRegions placeholder="common.select" />
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
