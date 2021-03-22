import './panEuropeanHome.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

const PanEuropeanHome = () => {
  const i18n = useI18n()

  return (
    <div className="pan-eu-home">
      <p>{i18n.t('panEuropean.home.description1')}</p>
      <p>
        {i18n.t('panEuropean.home.description2')}{' '}
        <a href="https://foresteurope.org/state-europes-forests-2020-report/" rel="noreferrer" target="_blank">
          {i18n.t('panEuropean.home.stateOfEuropeForest')}
        </a>{' '}
        {i18n.t('panEuropean.home.description3')}{' '}
      </p>

      <div className="partners">
        <hr className="no-print" />

        <div className="partners__disclaimer">
          <div>
            {i18n.t('panEuropean.disclaimer.platformDeveloped')}{' '}
            <a href="https://foresteurope.org/state-europes-forests-2020-report/" rel="noreferrer" target="_blank">
              {i18n.t('panEuropean.disclaimer.fao')}
            </a>{' '}
            {i18n.t('panEuropean.disclaimer.and')}{' '}
            <a href="https://unece.org" rel="noreferrer" target="_blank">
              {i18n.t('panEuropean.disclaimer.unece')}
            </a>{' '}
            {i18n.t('panEuropean.disclaimer.technicalSupport')}{' '}
            <a href="https://foresteurope.org" rel="noreferrer" target="_blank">
              {i18n.t('panEuropean.disclaimer.forestEurope')}
            </a>
          </div>
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" src={`/img/fao/FAO${i18n.language}_blue.svg`} />
          <img alt="" src="/img/partners/UNECE.gif" />
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" src="/img/partners/ForestEurope.png" />
        </div>
      </div>

      <div className="partners">
        <hr className="no-print" />
        <div className="partners__disclaimer">
          <div className="partners__disclaimerLogos">
            <img alt={i18n.t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          </div>

          <div className="partners__disclaimerText">
            <div>{i18n.t('panEuropean.disclaimer.part1')}&nbsp;</div>
            <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
              {i18n.t('panEuropean.disclaimer.govSwitzerland')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanEuropeanHome
