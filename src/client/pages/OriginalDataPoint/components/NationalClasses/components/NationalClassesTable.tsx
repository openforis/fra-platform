import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import NationalClass from 'client/pages/OriginalDataPoint/components/NationalClasses/components/NationalClass'
import NationalClassesDownload from 'client/pages/OriginalDataPoint/components/NationalClasses/components/NationalClassesDownload'
import { useCanEditData } from 'client/pages/OriginalDataPoint/hooks/useCanEditData'

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const NationalClassesTable = (props: Props) => {
  const { originalDataPoint } = props
  const { nationalClasses, year } = originalDataPoint
  const { t } = useTranslation()
  const cycle = useCycle()
  const { print } = useIsPrintRoute()
  const canEdit = useCanEditData(originalDataPoint)

  return (
    <>
      <NationalClassesDownload nationalClasses={nationalClasses} year={year} />
      <DataGrid gridTemplateColumns={`${print ? `100px ` : ''}minmax(240px, 40%) 1fr`} withActions={canEdit}>
        {print && (
          <DataCell gridRow={`1/${nationalClasses.length + 2}`} header lastRow>
            {year}
          </DataCell>
        )}

        <DataCell header>
          {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClass'}`)}
        </DataCell>
        <DataCell header lastCol>
          {t('nationalDataPoint.definition')}
        </DataCell>
        {canEdit && <div />}

        {nationalClasses.map((nationalClass, idx) => (
          <NationalClass index={idx} key={nationalClass.uuid} originalDataPoint={originalDataPoint} />
        ))}
      </DataGrid>
    </>
  )
}
