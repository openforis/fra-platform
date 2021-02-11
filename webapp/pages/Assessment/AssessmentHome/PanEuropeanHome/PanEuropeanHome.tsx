import './panEuropeanHome.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

const PanEuropeanHome = () => {
  const i18n = useI18n()

  return (
    <div className="pan-eu-home">
      <p>{i18n.t('panEuropean.home.description1')}</p>
      <p>{i18n.t('panEuropean.home.description2')}</p>

      <div className="partners">
        <hr className="no-print" />
        <div className="partners__disclaimer">
          <div className="partners__disclaimerLogos">
            <img alt={i18n.t('panEuropean.disclaimer.forestEurope')} src="/img/partners/ForestEurope.png" />
            <img alt={i18n.t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          </div>

          <div className="partners__disclaimerText">
            <div>{i18n.t('panEuropean.disclaimer.part1')}&nbsp;</div>
            <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
              {i18n.t('panEuropean.disclaimer.govSwitzerland')}
            </a>
            <div>&nbsp;{i18n.t('panEuropean.disclaimer.and')}&nbsp;</div>
            <a href="https://foresteurope.org" target="_blank" rel="noreferrer">
              {i18n.t('panEuropean.disclaimer.forestEurope')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanEuropeanHome
