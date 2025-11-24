import './dataDownload.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Files } from 'meta/file/files'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'
import { DOMs } from 'client/utils/doms'

import resources from './resources'

const DataDownload: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  useEffect(() => {
    DOMs.scrollTo()
  }, [])

  const baseParams = `assessmentName=${assessmentName}&cycleName=${cycleName}&countryIso=${countryIso}`

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title"> {t('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        <div>{t('dataDownload.bulkDownload')}</div>
        <a className="btn-s btn-primary" href={`${ApiEndPoint.File.bulkDownload()}?${baseParams}`}>
          <Icon className="icon-white" name="hit-down" />
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
              className="btn-s btn-primary"
              href={Files.Static.getDataDownload({
                assessmentName,
                cycleName,
                countryIso,
                ext: 'ods',
                file: resource.name,
                language: lang,
              })}
            >
              <Icon className="icon-white" name="hit-down" />
              ODS
            </a>
            <a
              className="btn-s btn-primary"
              href={Files.Static.getDataDownload({
                assessmentName,
                cycleName,
                countryIso,
                ext: 'xlsx',
                file: resource.name,
                language: lang,
              })}
            >
              <Icon className="icon-white" name="hit-down" />
              XLS
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DataDownload
