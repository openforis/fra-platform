import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import NationalClass from 'client/pages/OriginalDataPoint/components/NationalClasses/components/NationalClass'
import { useCanEditData } from 'client/pages/OriginalDataPoint/hooks/useCanEditData'

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
  const canEdit = useCanEditData(originalDataPoint)

  return (
    <DataGrid
      gridTemplateColumns={`${print ? `100px ` : ''}minmax(240px, 40%) 1fr`}
      ref={gridRef}
      withActions={canEdit}
    >
      {print && (
        <DataCell gridRow={`1/${nationalClasses.length + 2}`} header lastRow>
          {year}
        </DataCell>
      )}

      <DataCell header>
        {t(`nationalDataPoint.${cycleName === '2025' ? 'nationalClassifications' : 'nationalClass'}`)}
      </DataCell>
      <DataCell header lastCol>
        {t('nationalDataPoint.definition')}
      </DataCell>
      {canEdit && <div />}

      {nationalClasses.map((nationalClass, idx) => (
        <NationalClass index={idx} key={nationalClass.uuid} originalDataPoint={originalDataPoint} />
      ))}
    </DataGrid>
  )
}
