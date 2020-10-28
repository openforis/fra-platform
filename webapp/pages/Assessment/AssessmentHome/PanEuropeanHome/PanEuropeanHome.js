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
          {i18n.t('disclaimer.part1')}
          <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
            {i18n.t('panEuropean.govSwitzerland')}
          </a>
          <img alt="" src="/img/partners/CHE.png" className="partner_che" />
        </div>
      </div>
    </div>
  )
}

export default PanEuropeanHome
