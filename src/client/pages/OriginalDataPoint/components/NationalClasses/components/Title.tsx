import React from 'react'
import { useTranslation } from 'react-i18next'

import { useIsPrintRoute } from 'client/hooks/routes'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import { ButtonGridExport } from 'client/components/DataGrid'

type Props = {
  gridRef: React.MutableRefObject<HTMLDivElement>
  year?: number
}

export const Title = (props: Props) => {
  const { gridRef, year = -1 } = props
  const { cycleName } = useCycleRouteParams()

  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  if (print) return null

  return (
    <div className="odp__section-header">
      <ButtonGridExport disabled={year === -1} filename={`NDP${year}`} gridRef={gridRef} />
      <h3 className="subhead">
        {t(`nationalDataPoint.${cycleName !== '2020' ? 'nationalClassifications' : 'nationalClasses'}`)}
      </h3>
    </div>
  )
}
