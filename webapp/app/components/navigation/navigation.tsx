import './navigation.less'
import React from 'react'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: any[]; className: string; href: ... Remove this comment to see the full error message
        <a className="btn-s btn-primary nav__bulk-download" href="/api/export/bulk-download" alt="">
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
          <Icon className="icon-sub icon-white" name="hit-down" />
          {(i18n as any).t('navigation.bulkDownload')}
        </a>
      )}
    </div>
  )
}
export default Navigation
