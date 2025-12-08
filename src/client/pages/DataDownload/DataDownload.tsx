import './DataDownload.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Files } from 'meta/file/files'
import { DataDownloadExt } from 'meta/file/static'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import LinkBulkDownload from 'client/pages/DataDownload/LinkBulkDownload'
import resources, { DataDownloadResource } from 'client/pages/DataDownload/resources'
import { DOMs } from 'client/utils/doms'

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

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title"> {t('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        <div>{t('dataDownload.bulkDownload')}</div>
        <LinkBulkDownload />

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
