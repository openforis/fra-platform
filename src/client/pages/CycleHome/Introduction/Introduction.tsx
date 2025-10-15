import './introduction.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'

import Countries from './Countries'
import Global from './Global'
import Regions from './Regions'

const Introduction: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()

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
            <Global />
            <Regions />
            <Countries />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
