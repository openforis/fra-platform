import './NationalClassesTable.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import NationalClass from 'client/pages/OriginalDataPoint/components/NationalClasses/components/NationalClass'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

type Props = {
  gridRef: React.MutableRefObject<HTMLDivElement>
  originalDataPoint: OriginalDataPoint
}

export const NationalClassesTable = (props: Props) => {
  const { gridRef, originalDataPoint } = props
  const { nationalClasses, year } = originalDataPoint
  const { t } = useTranslation()
  const { cycleName } = useCycleRouteParams()

  const { print } = useIsPrintRoute()
  const canEdit = useIsEditODPEnabled()
  const showReviewIndicator = useShowReviewIndicator()

  return (
    <DataGrid ref={gridRef} gridTemplateColumns="minmax(240px, 40%) 1fr" withActions={canEdit || showReviewIndicator}>
      {print && (
        <DataCell className="national-classes__year-header" gridColumn="1/-1" header lastCol>
          {year}
        </DataCell>
      )}

      <DataCell header>
        {t(`nationalDataPoint.${cycleName !== '2020' ? 'nationalClassifications' : 'nationalClass'}`)}
      </DataCell>
      <DataCell header lastCol>
        {t('nationalDataPoint.definition')}
      </DataCell>
      {(canEdit || showReviewIndicator) && <div />}

      {nationalClasses.map((nationalClass, idx) => (
        <NationalClass key={nationalClass.uuid} index={idx} originalDataPoint={originalDataPoint} />
      ))}
    </DataGrid>
  )
}
