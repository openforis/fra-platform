import './dataDownload.less'
import React, { useEffect } from 'react'

import { useI18n } from '@webapp/components/hooks'
import { documentScrollTo } from '@webapp/utils/domUtils'

import Icon from '@webapp/components/icon'

import resources from './resources'

const DataDownload = () => {
  const i18n = useI18n()

  useEffect(documentScrollTo, [])

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title"> {i18n.t('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        <div>{i18n.t('dataDownload.bulkDownload')}</div>
        <a className="btn-s btn-primary nav__bulk-download" href="/api/export/bulk-download" alt="">
          <Icon className="icon-sub icon-white" name="hit-down" />
          ZIP
        </a>

        {resources.map((resource, idx) => (
          <React.Fragment key={String(idx)}>
            <div className="data-download__sep" />
            <div>
              {`${resource.idx}. `}
              {i18n.t(resource.labelKey)}
            </div>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={`/api/fileRepository/dataDownload/${`${resource.idx}_${resource.name}`}/ods`}
              alt=""
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              ODS
            </a>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={`/api/fileRepository/dataDownload/${`${resource.idx}_${resource.name}`}/xlsx`}
              alt=""
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
