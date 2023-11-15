import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'

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

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
              <References originalDataPoint={originalDataPoint} />

              <MethodsUsed originalDataPoint={originalDataPoint} />

              <AdditionalComments originalDataPoint={originalDataPoint} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSources
