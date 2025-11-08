import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import DiffText from 'client/components/DiffText'
import InputPercent from 'client/components/Inputs/InputPercent'
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
              <InputPercent
                disabled={!canEditData}
                onChange={(event): void => {
                  const { value } = event.target
                  const updateProps = { field, value }
                  updateValues(updateProps)
                }}
                onPaste={(event): void => {
                  const value = event.clipboardData.getData('text')
                  const updateProps = { field, value }
                  updateValues(updateProps)
                }}
                value={originalDataPoint.values.primaryForestPercent}
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
