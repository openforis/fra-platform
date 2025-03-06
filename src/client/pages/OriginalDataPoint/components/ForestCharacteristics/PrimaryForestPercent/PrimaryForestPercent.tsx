import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { OriginalDataPoint } from 'meta/assessment'

import DiffText from 'client/components/DiffText'
import PercentInput from 'client/components/PercentInput'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

import { usePrimaryForestPercentChange } from './hooks/usePrimaryForestPercentChange'
import { useShouldUseTotal } from './hooks/useShouldUseTotal'
import { useUpdateValues } from './hooks/useUpdateValues'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const PrimaryForestPercent: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { t } = useTranslation()
  const useTotal = useShouldUseTotal(originalDataPoint)
  const updateValues = useUpdateValues()

  const field = 'primaryForestPercent'

  const displayHistory = useODPDisplayHistory()

  const primaryForestPercentChange = usePrimaryForestPercentChange({
    primaryForestPercent: originalDataPoint?.values?.primaryForestPercent,
  })

  return (
    <tr>
      <th className="fra-table__header-cell-left fra-table__divider" colSpan={2}>
        {t('common.totalPercentage')}
      </th>
      <td
        className={classNames({
          'fra-table__calculated-cell': !useTotal && !displayHistory,
          'fra-table__cell': useTotal || displayHistory,
        })}
      >
        {displayHistory ? (
          <div className="odp-percent-diff">
            <DiffText changes={primaryForestPercentChange} />
            <span>%</span>
          </div>
        ) : (
          <>
            {useTotal && (
              <PercentInput
                disabled={!canEditData}
                numberValue={originalDataPoint.values.primaryForestPercent}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = event.target
                  const updateProps = { field, value }
                  updateValues(updateProps)
                }}
                onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
                  const value = event.clipboardData.getData('text')
                  const updateProps = { field, value }
                  updateValues(updateProps)
                }}
              />
            )}
            {!useTotal && <>{Numbers.toFixed(originalDataPoint.values[field], 3)} %</>}
          </>
        )}
      </td>
    </tr>
  )
}
export default PrimaryForestPercent
