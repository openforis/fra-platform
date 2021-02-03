import './navigation.less'
import React from 'react'

import * as FRA from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'
import * as BasePaths from '@webapp/main/basePaths'

import { useCountryIso, useI18n } from '@webapp/components/hooks'

import Icon from '@webapp/components/icon'
import { isISOGlobal } from '@common/country/area'
import { useAssessmentType } from '@webapp/store/app'

import Assessment from './components/assessment'

const Navigation = () => {
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const assessmentType = useAssessmentType()
  const assessment = [FRA, PanEuropean].find(({ type }) => type === assessmentType)

  // admin view - navigation is not rendered
  if (!countryIso) return null

  return (
    <div className="nav no-print">
      <Assessment assessment={assessment} />

      {isISOGlobal(countryIso) && (
        <a
          className="btn-s btn-primary nav__bulk-download"
          href={BasePaths.getAssessmentDataDownloadLink(countryIso, assessmentType)}
          alt=""
        >
          <Icon className="icon-sub icon-white" name="hit-down" />
          {i18n.t('dataDownload.dataDownload')}
        </a>
      )}
    </div>
  )
}
export default Navigation
