import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { FRA } from '@core/assessment'
import { useI18n } from '@webapp/components/hooks'

import {
  DataSources,
  ExtentOfForest,
  ForestCharacteristics,
  NationalClasses,
} from '@webapp/components/OriginalDataPoint'
import * as OriginalDataPointState from './originalDataPointState'

type Props = {
  section: string
}

const NationalDataPointsPrintView = (props: Props) => {
  const { section } = props
  const i18n = useI18n()
  const data = useSelector((state) =>
    OriginalDataPointState.getOdps(state)
      .filter((ndp: any) => !(R.isNil(ndp.year) || R.isEmpty(ndp.year)))
      .sort((a: any, b: any) => Number(a.year) - Number(b.year))
  )

  if (data.length === 0) return null

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.nationalData')}</h2>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.dataSources')}</h3>
        {data.map((odp: any) => (
          <DataSources key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.nationalClasses')}</h3>
        {data.map((odp: any) => (
          <NationalClasses key={odp.odpId} canEditData={false} odp={odp} />
        ))}
      </div>

      <div className="odp__section-print-mode">
        <h3 className="subhead">{i18n.t('nationalDataPoint.reclassificationLabel')}</h3>
        {data.map((odp: any) => {
          const component = section === FRA.sections['1'].children.a.name ? ExtentOfForest : ForestCharacteristics
          return React.createElement(component, { key: odp.odpId, ...props, odp, canEditData: false })
        })}
      </div>

      <div className="page-break" />
    </div>
  )
}
export default NationalDataPointsPrintView
