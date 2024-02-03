import React from 'react'
import { useTranslation } from 'react-i18next'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { ButtonGridExport } from 'client/components/DataGrid'

type Props = {
  gridRef: React.MutableRefObject<HTMLDivElement>
  year?: number
}

export const Title = (props: Props) => {
  const { gridRef, year } = props
  const { cycleName } = useCycleRouteParams()

  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  if (print) return null

  return (
    <div className="odp__section-header">
      <ButtonGridExport
        disabled={year === undefined || year === -1}
        filename={`FRA${cycleName}-NDP${year}.csv`}
        gridRef={gridRef}
      />
      <h3 className="subhead">
        {t(`nationalDataPoint.${cycleName === '2025' ? 'nationalClassifications' : 'nationalClasses'}`)}
      </h3>
    </div>
  )
}

Title.defaultProps = {
  year: -1,
}
