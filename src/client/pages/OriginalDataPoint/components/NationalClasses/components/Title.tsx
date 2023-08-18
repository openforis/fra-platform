import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

export const Title = () => {
  const cycle = useCycle()
  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  if (print) return null

  return (
    <div className="odp__section-header">
      <h3 className="subhead">
        {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClasses'}`)}
      </h3>
    </div>
  )
}
