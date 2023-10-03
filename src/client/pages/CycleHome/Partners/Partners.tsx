import './partners.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/useLanguage'

const Partners: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()

  return (
    <div className="partners">
      <div className="partners__imgs">
        <img alt="" className="partners__col1Mobile" src="/img/partners/UNECE.gif" />
        <img alt="" className="partners__col1Mobile" src={`/img/fao/FAO${language}_blue.svg`} />
        <img alt="" src="/img/partners/ForestEurope.png" />
        <img alt="" src="/img/partners/COMIFAC.png" />
        <img alt="" src="/img/partners/ITTO.gif" />
        <img alt="" src="/img/partners/MontrealProcess.png" />
      </div>

      <div className="partners__imgs">
        <div className="partners__support partners__col1Mobile">{t('landing.overview.withFinancialSupportOf')}</div>
        <img alt="" src="/img/partners/EU.jpg" />
        <img alt="" src="/img/partners/NICFI.png" />
        <img alt="" className="mfafi partners__col1Mobile" src="/img/partners/mfafi.gif" />
        <img alt="" className="mmmfi partners__col1Mobile" src="/img/partners/mmmfi.png" />
        <img alt="" className="partners__col1Mobile" src="/img/partners/GEF.webp" />
      </div>

      <div className="partners__disclaimer">
        {t('disclaimer.part1')}
        <a href="https://ec.europa.eu/info/index_en" target="_blank" rel="noreferrer">
          {t('disclaimer.europeanUnion')}
        </a>
        {t('disclaimer.part2')}
        <a href="https://um.fi/frontpage" target="_blank" rel="noreferrer">
          {t('disclaimer.govFinland')}
        </a>
        {t('disclaimer.part3')}
        <a
          href="https://norad.no/en/front/thematic-areas/climate-change-and-environment/norways-international-climate-and-forest-initiative-nicfi/"
          target="_blank"
          rel="noreferrer"
        >
          {t('disclaimer.govNorway')}
        </a>
        {t('disclaimer.part4')}
        <a href="https://www.thegef.org" target="_blank" rel="noreferrer">
          {t('disclaimer.gef')}
        </a>
        {t('disclaimer.part5')}
      </div>
    </div>
  )
}
export default Partners
