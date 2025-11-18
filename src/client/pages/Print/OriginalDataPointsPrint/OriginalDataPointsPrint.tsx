import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import DataSources from 'client/pages/OriginalDataPoint/components/DataSources'
import ExtentOfForest from 'client/pages/OriginalDataPoint/components/ExtentOfForest'
import ForestCharacteristics from 'client/pages/OriginalDataPoint/components/ForestCharacteristics'
import NationalClasses from 'client/pages/OriginalDataPoint/components/NationalClasses'
import { useOriginalDataPoints } from 'client/pages/Print/OriginalDataPointsPrint/useOriginalDataPoints'

type Props = {
  sectionName: string
}

const OriginalDataPointsPrint: React.FC<Props> = (props) => {
  const { sectionName } = props

  const i18n = useTranslation()
  const { loading, originalDataPoints } = useOriginalDataPoints()

  const isExtentOfForest = sectionName === SectionNames.extentOfForest

  const commentKey = isExtentOfForest ? TableNames.extentOfForest : TableNames.forestCharacteristics
  const odpsWithComments = useMemo<Array<OriginalDataPoint>>(
    () => (originalDataPoints ?? []).filter((odp) => !Objects.isEmpty(odp.comments?.[commentKey])),
    [commentKey, originalDataPoints]
  )

  if (loading || Objects.isEmpty(originalDataPoints)) return null

  return (
    <div className="print-break-after">
      <h2 className="headline">
        {isExtentOfForest
          ? i18n.t('nationalDataPoint.nationalData')
          : i18n.t('nationalDataPoint.nationalDataReferToSection1a')}
      </h2>

      {isExtentOfForest && (
        <>
          <div className="odp__section-print-mode">
            <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>
            {originalDataPoints.map((originalDataPoint) => (
              <DataSources key={originalDataPoint.id} originalDataPoint={originalDataPoint} />
            ))}
          </div>

          <div className="odp__section-print-mode">
            <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClassifications')}</h3>
            {originalDataPoints.map((originalDataPoint) => (
              <NationalClasses key={originalDataPoint.id} canEditData={false} originalDataPoint={originalDataPoint} />
            ))}
          </div>
        </>
      )}

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {originalDataPoints.map((originalDataPoint) => {
          const Component = isExtentOfForest ? ExtentOfForest : ForestCharacteristics
          return React.createElement(Component, {
            key: originalDataPoint.id,
            originalDataPoint,
            canEditData: false,
          })
        })}
      </div>

      {odpsWithComments.length > 0 && (
        <div className="odp__section-print-mode">
          <h3 className="subhead">{i18n.t('dataSource.comments')}</h3>
          <DataGrid className="odp__section" gridTemplateColumns="100px 1fr">
            {odpsWithComments.map((originalDataPoint, i) => {
              const lastRow = odpsWithComments.length - 1 === i
              const value = originalDataPoint.comments?.[commentKey]

              return (
                <React.Fragment key={originalDataPoint.id}>
                  <DataCell header lastRow={lastRow}>
                    {originalDataPoint.year}
                  </DataCell>
                  <DataCell lastCol lastRow={lastRow}>
                    <EditorWYSIWYG disabled onChange={undefined} repository value={value} />
                  </DataCell>
                </React.Fragment>
              )
            })}
          </DataGrid>
        </div>
      )}
    </div>
  )
}

export default OriginalDataPointsPrint
