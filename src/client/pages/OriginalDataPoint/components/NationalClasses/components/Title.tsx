import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import { useIsPrint } from 'client/hooks/useIsPath'

export const Title = () => {
  const cycle = useCycle()
  const { print } = useIsPrint()

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
