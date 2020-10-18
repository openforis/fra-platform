import './panEuropeanLinks.less'
import React from 'react'

import * as PanEuropean from '@common/assessment/panEuropean'

import { useI18n } from '@webapp/components/hooks'
import AreaSelector from '@webapp/pages/Landing/Introduction/AreaSelector'

const PanEuropeanLinks = () => {
  const i18n = useI18n()

  return (
    <div className="pan-eu-links">
      <div>&gt; {i18n.t('panEuropean.landing.select')}</div>
      <AreaSelector assessmentType={PanEuropean.type} />
    </div>
  )
}

export default PanEuropeanLinks
