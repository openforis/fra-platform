import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import DataSources from 'client/pages/OriginalDataPoint/components/DataSources'
import ExtentOfForest from 'client/pages/OriginalDataPoint/components/ExtentOfForest'
import ForestCharacteristics from 'client/pages/OriginalDataPoint/components/ForestCharacteristics'
import NationalClasses from 'client/pages/OriginalDataPoint/components/NationalClasses'

import { useOriginalDataPoints } from './useOriginalDataPoints'

type Props = {
  sectionName: string
}

const OriginalDataPointsPrint: React.FC<Props> = (props) => {
  const { sectionName } = props

  const i18n = useTranslation()
  const { originalDataPoints, loading } = useOriginalDataPoints()

  if (loading || Objects.isEmpty(originalDataPoints)) return null

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>

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

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {originalDataPoints.map((originalDataPoint) => {
          const Component = sectionName === 'extentOfForest' ? ExtentOfForest : ForestCharacteristics
          return React.createElement(Component, {
            key: originalDataPoint.id,
            originalDataPoint,
            canEditData: false,
          })
        })}
      </div>

      <div className="page-break" />
    </div>
  )
}

export default OriginalDataPointsPrint
