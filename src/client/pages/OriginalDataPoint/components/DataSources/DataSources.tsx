import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

import AdditionalComments from './AdditionalComments'
import MethodsUsed from './MethodsUsed'
import References from './References'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const DataSources: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const updateOriginalDataPoint = useUpdateDataSources()

  const reviewIndicator = originalDataPoint.id && !print && canEditData

  const disabled = Boolean(print || !canEditData || !originalDataPoint.year)

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
              <References
                originalDataPoint={originalDataPoint}
                updateOriginalDataPoint={updateOriginalDataPoint}
                reviewIndicator={reviewIndicator}
                disabled={disabled}
              />

              <MethodsUsed
                originalDataPoint={originalDataPoint}
                updateOriginalDataPoint={updateOriginalDataPoint}
                reviewIndicator={reviewIndicator}
                disabled={disabled}
              />

              <AdditionalComments
                originalDataPoint={originalDataPoint}
                updateOriginalDataPoint={updateOriginalDataPoint}
                reviewIndicator={reviewIndicator}
                disabled={disabled}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSources
