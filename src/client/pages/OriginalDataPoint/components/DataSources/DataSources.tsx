import './DataSources.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import AdditionalComments from './AdditionalComments'
import MethodsUsed from './MethodsUsed'
import References from './References'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const DataSources: React.FC<Props> = (props) => {
  const { originalDataPoint } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const canEdit = useIsEditODPEnabled()
  const showReviewIndicator = useShowReviewIndicator()

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      <DataGrid gridTemplateColumns="180px 1fr" withActions={canEdit || showReviewIndicator}>
        {print && (
          <DataCell className="data-sources__year-header" gridColumn="1/-1" header lastCol>
            {originalDataPoint.year}
          </DataCell>
        )}

        <References originalDataPoint={originalDataPoint} />
        <MethodsUsed originalDataPoint={originalDataPoint} />
        <AdditionalComments originalDataPoint={originalDataPoint} />
      </DataGrid>
    </div>
  )
}

export default DataSources
