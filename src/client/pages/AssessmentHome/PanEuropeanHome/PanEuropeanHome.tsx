import './PanEuropeanHome.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'

const PanEuropeanHome = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(AssessmentActions.initApp({ assessmentName: 'panEuropean' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="pan-eu-home">
      <p>{t('panEuropean.home.description1')}</p>
      <p>
        {t('panEuropean.home.description2')}{' '}
        <a href="https://foresteurope.org/state-europes-forests-2020-report/" rel="noreferrer" target="_blank">
          {t('panEuropean.home.stateOfEuropeForest')}
        </a>{' '}
        {t('panEuropean.home.description3')}{' '}
      </p>

      <div className="partners">
        <hr className="no-print" />

        <div className="partners__disclaimer">
          <div>
            {t('panEuropean.disclaimer.platformDeveloped')}{' '}
            <a href={`http://www.fao.org/home/${language}/`} rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.fao')}
            </a>{' '}
            {t('panEuropean.disclaimer.and')}{' '}
            <a href="https://unece.org" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.unece')}
            </a>{' '}
            {t('panEuropean.disclaimer.technicalSupport')}{' '}
            <a href="https://foresteurope.org" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.forestEurope')}
            </a>
          </div>
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" src={`/img/fao/FAO${language}_blue.svg`} />
          <img alt="" src="/img/partners/UNECE.gif" />
        </div>

        <div className="partners__disclaimerLogos">
          <img alt="" className="forestEurope" src="/img/partners/ForestEurope.png" />
        </div>
      </div>

      <div className="partners">
        <hr className="no-print" />
        <div className="partners__disclaimer">
          <div className="partners__disclaimerLogos">
            <img alt={t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          </div>

          <div className="partners__disclaimerText">
            <div>{t('panEuropean.disclaimer.part1')}&nbsp;</div>
            <a href="https://www.admin.ch/gov/en/start.html" target="_blank" rel="noreferrer">
              {t('panEuropean.disclaimer.govSwitzerland')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanEuropeanHome
