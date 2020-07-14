import './partners.less'
import React from 'react'

import { useI18n } from '@webapp/components/hooks'

const Partners = () => {
  const i18n = useI18n()

  return (
    <div className="partners">
      <div className="partners__imgs">
        <img alt="" src="/img/partners/UNECE.gif" />
        <img alt="" src={`/img/fao/FAO${i18n.language}_blue.svg`} />
        <img alt="" src="/img/partners/ForestEurope.png" />
        <img alt="" src="/img/partners/COMIFAC.png" />
        <img alt="" src="/img/partners/ITTO.gif" />
        <img alt="" src="/img/partners/MontrealProcess.png" />
      </div>

      <div className="partners__imgs">
        <div className="partners__support">{i18n.t('landing.overview.withFinancialSupportOf')}</div>
        <img alt="" src="/img/partners/EU.jpg" />
        <img alt="" src="/img/partners/NICFI.png" />
        <img alt="" src="/img/partners/mfafi.gif" className="mfafi" />
        <img alt="" src="/img/partners/mmmfi.png" />
      </div>

      <div className="partners__disclaimer">
        {i18n.t('disclaimer.part1')}
        <a href="https://ec.europa.eu/info/index_en" target="_blank" rel="noreferrer">
          {i18n.t('disclaimer.europeanUnion')}
        </a>
        {i18n.t('disclaimer.part2')}
        <a href="https://um.fi/frontpage" target="_blank" rel="noreferrer">
          {i18n.t('disclaimer.govFinland')}
        </a>
        {i18n.t('disclaimer.part3')}
        <a
          href="https://norad.no/en/front/thematic-areas/climate-change-and-environment/norways-international-climate-and-forest-initiative-nicfi/"
          target="_blank"
          rel="noreferrer"
        >
          {i18n.t('disclaimer.govNorway')}
        </a>
        {i18n.t('disclaimer.part4')}
      </div>
    </div>
  )
}

export default Partners
