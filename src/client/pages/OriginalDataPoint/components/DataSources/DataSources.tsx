import React from 'react'
import { useTranslation } from 'react-i18next'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import { useCanEditData } from 'client/pages/OriginalDataPoint/hooks/useCanEditData'

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
  const canEdit = useCanEditData(originalDataPoint)

  return (
    <div className="odp__section">
      {!print && <h3 className="subhead">{t('nationalDataPoint.dataSources')}</h3>}

      <DataGrid gridTemplateColumns={`${print ? `100px ` : ''}180px 1fr`} withActions={canEdit}>
        {print && (
          <DataCell gridRow="1/4" header lastRow>
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
