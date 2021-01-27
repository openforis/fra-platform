import './panEuropeanLinks.less'
import React from 'react'
import { Link } from 'react-router-dom'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
import { useI18n } from '@webapp/components/hooks'
import * as BasePaths from '@webapp/main/basePaths'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Area from '@common/country/area'

const PanEuropeanLinks = () => {
  const i18n = useI18n()
  return (
    <div className="pan-eu-links">
      <Link
        target="_blank"
        className="home-link"
        to={BasePaths.getAssessmentHomeLink(Area.levels.forest_europe, PanEuropean.type)}
      >
        &gt; {(i18n as any).t('panEuropean.landing.link')}
      </Link>
    </div>
  )
}
export default PanEuropeanLinks
