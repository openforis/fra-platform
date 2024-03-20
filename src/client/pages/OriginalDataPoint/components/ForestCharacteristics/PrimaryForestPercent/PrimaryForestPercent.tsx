import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Numbers } from 'utils/numbers'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import PercentInput from 'client/components/PercentInput'

import { useShouldUseTotal } from './hooks/useShouldUseTotal'
import { useUpdateValues } from './hooks/useUpdateValues'

type Props = {
  canEditData: boolean
}

const PrimaryForestPercent: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { t } = useTranslation()
  const useTotal = useShouldUseTotal()
  const updateValues = useUpdateValues()

  const field = 'primaryForestPercent'

  return (
    <tr>
      <th className="fra-table__header-cell-left fra-table__divider" colSpan={2}>
        {t('common.totalPercentage')}
      </th>
      {useTotal ? (
        <td className={classNames('fra-table__cell', {})}>
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
        </td>
      ) : (
        <td className="fra-table__calculated-cell">{Numbers.toFixed(originalDataPoint.values[field])} %</td>
      )}
    </tr>
  )
}
export default PrimaryForestPercent
