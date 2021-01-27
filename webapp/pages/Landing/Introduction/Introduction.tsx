import './introduction.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

import AreaSelector from './AreaSelector'

const Introduction = () => {
  const i18n = useI18n()

  return (
    <div className="home-introduction">
      <video className="home-introduction__video" autoPlay playsInline muted loop src="/video/FRA2020_Web.mp4" />

      <div className="home-introduction__about-fra">
        <div className="header">{i18n.t(`common.globalFRA`)}</div>
        <div className="process">{i18n.t('landing.about.fraProcess')}</div>
        <a
          className="home-link link-fra-process"
          href={`http://www.fao.org/forest-resources-assessment/${i18n.language}/`}
          target="_blank"
          rel="noreferrer"
        >
          &gt; {i18n.t('landing.about.linkFraProcess')}
        </a>

        <div className="home-introduction__area-selector">
          <hr />
          <div>{i18n.t('landing.about.selectArea')}</div>
          <AreaSelector />
        </div>
      </div>
    </div>
  )
}

export default Introduction
