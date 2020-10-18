import './panEuropeanHome.less'
import React from 'react'

import { useI18n } from '@webapp/components/hooks'

const PanEuropeanHome = () => {
  const i18n = useI18n()

  return (
    <div className="pan-eu-home">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </div>

      <div className="partners">
        <hr className="no-print" />
        <div className="partners__imgs">
          <img alt="" src={`/img/fao/FAO${i18n.language}_blue.svg`} />
          <img alt="" src="/img/partners/CHE.png" className="partner_che" />
        </div>
        <div className="partners__disclaimer">
          {i18n.t('disclaimer.part1')}
          <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
            {i18n.t('panEuropean.govSwitzerland')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default PanEuropeanHome
