import './panEuropeanLinks.less'
import React from 'react'
import { Link } from 'react-router-dom'

import * as PanEuropean from '@common/assessment/panEuropean'

import { useI18n } from '@webapp/components/hooks'
import * as BasePaths from '@webapp/main/basePaths'
import * as Area from '@common/country/area'

const PanEuropeanLinks = () => {
  const i18n = useI18n()

  return (
    <div className="pan-eu-links">
      <Link className="home-link" to={BasePaths.getAssessmentHomeLink(Area.levels.forest_europe, PanEuropean.type)}>
        &gt; {i18n.t('panEuropean.landing.link')}
      </Link>
    </div>
  )
}

export default PanEuropeanLinks
