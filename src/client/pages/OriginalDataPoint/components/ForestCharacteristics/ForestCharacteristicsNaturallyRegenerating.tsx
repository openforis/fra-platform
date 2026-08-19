import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Numbers } from 'utils/numbers'

import DiffText from 'client/components/DiffText'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

import { useNaturalForestPercentAndAreaTotalsChange } from './hooks/useNaturalForestPercentAndAreaTotalsChange'
import ForestCharacteristicsNaturallyRegeneratingRow from './ForestCharacteristicsNaturallyRegeneratingRow'
import PrimaryForestPercent from './PrimaryForestPercent'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsNaturallyRegenerating: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { t } = useTranslation()

  const nationalClasses = originalDataPoint?.nationalClasses

  const totalForestNaturalPercentArea =
    originalDataPoint &&
    Numbers.format(
      ODPs.calcTotalSubFieldArea({
        originalDataPoint,
        field: 'forestPercent',
        subField: 'forestNaturalPercent',
      })
    )

  const totalPrimaryForestNaturalPercentArea =
    originalDataPoint?.values.primaryForest &&
    Numbers.format(Numbers.toBigNumber(originalDataPoint.values.primaryForest))

  const displayHistory = useODPDisplayHistory()

  const totalsChange = useNaturalForestPercentAndAreaTotalsChange({
    totalForestNaturalPercentArea,
    totalPrimaryForestNaturalPercentArea,
  })

  return (
    <div className="fra-table__container print-break-inside-avoid">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table odp__sub-table-naturally-regenerating">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">
                {t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
              </th>
              <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.ofWhichPrimaryForest')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses?.map((nationalClass, index) => (
              <ForestCharacteristicsNaturallyRegeneratingRow
                key={nationalClass.name}
                canEditData={canEditData}
                index={index}
                originalDataPoint={originalDataPoint}
              />
            ))}
          </tbody>

          <tfoot>
            <PrimaryForestPercent canEditData={canEditData} originalDataPoint={originalDataPoint} />
            <tr>
              <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {displayHistory ? (
                  <DiffText changes={totalsChange?.forestNaturalPercentArea} />
                ) : (
                  totalForestNaturalPercentArea
                )}
              </th>
              <td className="fra-table__calculated-cell">
                {displayHistory ? (
                  <DiffText changes={totalsChange?.primaryForestNaturalPercentArea} />
                ) : (
                  totalPrimaryForestNaturalPercentArea
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
export default ForestCharacteristicsNaturallyRegenerating
