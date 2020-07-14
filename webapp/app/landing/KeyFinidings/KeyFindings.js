import './keyFindings.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

const KeyFindings = () => {
  const i18n = useI18n()
  const { language } = i18n
  const mapLegendLang = language === 'ru' ? 'en' : language

  return (
    <div className="home-key-findings">
      <div className="home-key-findings__map">
        <img alt="" src={`/img/mapLegend_${mapLegendLang}.png`} className="legend" />
        <img alt="" src="/img/map.png" className="map" />
      </div>

      <div className="home-key-findings__text">
        <div>{i18n.t('home.keyFindings1')}</div>
        <div>{i18n.t('home.keyFindings2')}</div>
      </div>
    </div>
  )
}

export default KeyFindings
