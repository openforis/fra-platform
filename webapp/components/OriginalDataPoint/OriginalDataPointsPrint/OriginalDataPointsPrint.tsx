import React from 'react'
import { useSelector } from 'react-redux'

import { FRA } from '@core/assessment'
import { ODP } from '@core/odp'
import { Objects } from '@core/utils'
import { useI18n } from '@webapp/components/hooks'
import * as OriginalDataPointState from '@webapp/sectionSpec/fra/originalDataPoint/originalDataPointState'

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
  const data: Array<ODP> = useSelector((state) => {
    const odps: Array<ODP> = OriginalDataPointState.getOdps(state)
    return odps.filter((odp) => !Objects.isEmpty(odp.year)).sort((a, b) => Number(a.year) - Number(b.year))
  })

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
