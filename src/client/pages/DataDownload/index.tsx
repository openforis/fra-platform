import './dataDownload.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { useLanguage } from 'client/hooks/useLanguage'
import Icon from 'client/components/Icon'
import { DOMs } from 'client/utils/dom'

import resources from './resources'

const _url = (baseParams: string, fileName: string, fileType: string, language: string): string =>
  `${ApiEndPoint.File.dataDownload()}?${baseParams}&fileName=${fileName}&fileType=${fileType}&language=${language}`

const DataDownload: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  useEffect(() => {
    DOMs.scrollTo()
  }, [])

  const baseParams = `assessmentName=${assessment.props.name}&cycleName=${cycle.name}&countryIso=${countryIso}`

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title"> {t('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        <div>{t('dataDownload.bulkDownload')}</div>
        <a className="btn-s btn-primary nav__bulk-download" href={`${ApiEndPoint.File.bulkDownload()}?${baseParams}`}>
          <Icon className="icon-sub icon-white" name="hit-down" />
          ZIP
        </a>

        {resources.map((resource) => (
          <React.Fragment key={String(resource.labelKey)}>
            <div className="data-download__sep" />
            <div>
              {`${resource.idx}. `}
              {t(resource.labelKey)}
            </div>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={_url(baseParams, `${resource.idx}_${resource.name}`, 'ods', lang)}
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              ODS
            </a>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={_url(baseParams, `${resource.idx}_${resource.name}`, 'xlsx', lang)}
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              XLS
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DataDownload
