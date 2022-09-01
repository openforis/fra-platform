import React from 'react'

import { FRA } from '@core/assessment'
import { Objects } from '@core/utils'
import { useI18n } from '@webapp/hooks'
import { useODPs } from '@webapp/store/page/originalDataPoint'

import DataSources from '@webapp/components/OriginalDataPoint/DataSources'
import NationalClasses from '@webapp/components/OriginalDataPoint/NationalClasses'
import ExtentOfForest from '@webapp/components/OriginalDataPoint/ExtentOfForest'
import ForestCharacteristics from '@webapp/components/OriginalDataPoint/ForestCharacteristics'

type Props = {
  section: string
}

const OriginalDataPointsPrint: React.FC<Props> = (props) => {
  const { section } = props

  const i18n = useI18n()
  const data = useODPs().filter((odp) => !Objects.isEmpty(odp.year))

  if (data.length === 0) return null

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>
        {data.map((odp) => (
          <DataSources key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClasses')}</h3>
        {data.map((odp) => (
          <NationalClasses key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {data.map((odp) => {
          const Component = section === FRA.sections['1'].children.a.name ? ExtentOfForest : ForestCharacteristics
          return React.createElement(Component, { key: odp.odpId, odp, canEditData: false })
        })}
      </div>

      <div className="page-break" />
    </div>
  )
}

export default OriginalDataPointsPrint
