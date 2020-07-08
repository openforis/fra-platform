import './partners.less'
import React from 'react'

import { useI18n } from '@webapp/components/hooks'

const Partners = () => {
  const i18n = useI18n()

  return (
    <div className="partners">
      <div>
        <img alt="" src="/img/partners/UNECE.gif" />
        <img alt="" src={`/img/fao/FAO${i18n.language}_blue.svg`} />
        <img alt="" src="/img/partners/ForestEurope.png" />
        <img alt="" src="/img/partners/COMIFAC.png" />
        <img alt="" src="/img/partners/ITTO.gif" />
        <img alt="" src="/img/partners/MontrealProcess.png" />
      </div>
      <div>
        <div className="partners__support">{i18n.t('landing.overview.withFinancialSupportOf')}</div>
        <img alt="" src="/img/partners/EC.png" />
        <img alt="" src="/img/partners/NICFI.png" />
        <img alt="" src="/img/partners/mfafi.gif" className="mfafi" />
        <img alt="" src="/img/partners/mmmfi.png" />
      </div>
    </div>
  )
}

export default Partners
