import './dataDownload.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'
import { DOMs } from 'client/utils/dom'

import resources from './resources'

const _url = (fileName: string, fileType: string, language: string): string =>
  `/api/file/dataDownload?fileName=${fileName}&fileType=${fileType}&language=${language}`

const AssessmentDataDownload: React.FC = () => {
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  useEffect(DOMs.scrollTo, [])

  const href = `/api/file/bulk-download?assessmentName=${assessment.props.name}&cycleName=${cycle.name}&countryIso=${countryIso}`

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title"> {i18n.t<string>('dataDownload.dataDownload')}</h1>
      </div>

      <div className="data-download">
        {cycle.published && (
          <>
            <div>{i18n.t<string>('dataDownload.bulkDownload')}</div>
            <a className="btn-s btn-primary nav__bulk-download" href={href}>
              <Icon className="icon-sub icon-white" name="hit-down" />
              ZIP
            </a>
          </>
        )}

        {resources.map((resource) => (
          <React.Fragment key={String(resource.labelKey)}>
            <div className="data-download__sep" />
            <div>
              {`${resource.idx}. `}
              {i18n.t<string>(resource.labelKey)}
            </div>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={_url(`${resource.idx}_${resource.name}`, 'ods', i18n.language)}
            >
              <Icon className="icon-sub icon-white" name="hit-down" />
              ODS
            </a>
            <a
              className="btn-s btn-primary nav__bulk-download"
              href={_url(`${resource.idx}_${resource.name}`, 'xlsx', i18n.language)}
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

export default AssessmentDataDownload
