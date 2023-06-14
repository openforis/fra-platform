import React from 'react'
import { useTranslation } from 'react-i18next'

const Overview: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  return (
    <div className="pan-eu-home">
      <div className="description">
        <h1>{t('panEuropean.home.title')}</h1>
      </div>
      <div className="description">{t('panEuropean.home.description1')}</div>
      <div className="description">{t('panEuropean.home.description2')}</div>

      <div className="partners">
        <div className="partners__disclaimer">
          <div>
            {t('panEuropean.disclaimer.platformDeveloped')}{' '}
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

      <div className="partners__disclaimer">
        <div>
          {t('panEuropean.disclaimer.technicalSupport')}{' '}
          <a href="https://foresteurope.org" rel="noreferrer" target="_blank">
            {t('panEuropean.disclaimer.forestEurope')}
          </a>
        </div>
      </div>
      <div className="partners__disclaimerLogos">
        <img alt="" className="forestEurope" src="/img/partners/ForestEurope.png" />
      </div>

      <div className="partners">
        <div className="partners__disclaimer">
          <div>
            {t('panEuropean.disclaimer.part1')}{' '}
            <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
              {t('panEuropean.disclaimer.govSwitzerland')}
            </a>{' '}
            {t('panEuropean.disclaimer.and')}{' '}
            <a href="https://www.skogsstyrelsen.se/en/" target="_blank" rel="noreferrer">
              {t('panEuropean.disclaimer.sweden')}
            </a>
          </div>
        </div>
        <div className="partners__disclaimerLogos">
          <img alt={t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          <img alt={t('panEuropean.disclaimer.sweden')} src="/img/partners/skogsstyrelsen.svg" />
        </div>
      </div>
    </div>
  )
}

export default Overview
