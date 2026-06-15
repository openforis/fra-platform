import './DataSources.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useIsPrintRoute } from 'client/hooks/routes'
import DataCell from 'client/components/DataGrid/DataCell'
import DataSourcesV1 from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1'
import DataSourcesV2 from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV2'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const components: Record<
  Cycle['props']['ndp']['dataSources']['version'],
  React.FC<{ originalDataPoint: OriginalDataPoint }>
> = {
  1: DataSourcesV1,
  2: DataSourcesV2,
}

const DataSources: React.FC<Props> = (props) => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const cycle = useCycle()

  const Component = components[Cycles.getNDPDataSourcesVersion({ cycle })]

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      {print && (
        <DataCell className="data-sources__year-header print-break-after-avoid" header lastCol>
          {originalDataPoint.year}
        </DataCell>
      )}

      <Component originalDataPoint={originalDataPoint} />
    </div>
  )
}

export default DataSources
