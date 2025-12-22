import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSectionRouteParams } from 'client/hooks/routeParams'

const Description2020: React.FC = () => {
  const { cycleName } = useSectionRouteParams()
  const {
    i18n: { language },
    t,
  } = useTranslation()
  return (
    <>
      <div className="description">
        <h1>{t(`panEuropean.home.title.${cycleName}`)}</h1>
      </div>
      <div className="description">{t('panEuropean.home.description1')}</div>
      <div className="description">{t('panEuropean.home.description2')}</div>
      <div className="partners">
        <div className="partners__disclaimer">
          <div>
            {t(`panEuropean.disclaimer.platformDeveloped.${cycleName}`)}{' '}
            <a href={`http://www.fao.org/home/${language}/`} rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.fao')}
            </a>{' '}
            {t('panEuropean.disclaimer.and')}{' '}
            <a href="https://unece.org" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.unece')}
            </a>
          </div>
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" src="/img/partners/UNECE.gif" />
          <img alt="" src={`/img/fao/FAO${language}_blue.svg`} />
        </div>
      </div>
    </>
  )
}

export default Description2020
