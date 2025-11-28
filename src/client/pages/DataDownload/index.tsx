import './dataDownload.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Files } from 'meta/file/files'
import { DataDownloadExt } from 'meta/file/static'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { DOMs } from 'client/utils/doms'

import resources, { DataDownloadResource } from './resources'

const DataDownload: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const linkClassName = useButtonClassName({ size: ButtonSize.m })

  const getHref = (resource: DataDownloadResource, ext: DataDownloadExt): string => {
    const { name: file } = resource
    return Files.Static.getDataDownload({ assessmentName, cycleName, countryIso, ext, file, language })
  }

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
        <a className={linkClassName} href={`${ApiEndPoint.File.bulkDownload()}?${baseParams}`}>
          <Icon name="hit-down" />
          ZIP
        </a>

        {resources.map((resource) => (
          <React.Fragment key={String(resource.labelKey)}>
            <div className="data-download__sep" />
            <div>
              {`${resource.idx}. `}
              {t(resource.labelKey)}
            </div>
            {[DataDownloadExt.ods, DataDownloadExt.xlsx].map((ext) => {
              return (
                <a key={ext} className={linkClassName} href={getHref(resource, ext)}>
                  <Icon name="hit-down" />
                  {ext}
                </a>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DataDownload
