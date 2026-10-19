import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Numbers } from 'utils/numbers'

import DiffText from 'client/components/DiffText'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

import { usePlantationForestTotalsChange } from './hooks/usePlantationForestTotalsChange'
import ForestCharacteristicsPlantationRow from './ForestCharacteristicsPlantationRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristicsPlantation: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { t } = useTranslation()

  const nationalClasses = originalDataPoint?.nationalClasses

  const totalForestPlantationPercentArea =
    originalDataPoint &&
    Numbers.format(
      ODPs.calcTotalSubFieldArea({
        originalDataPoint,
        field: 'forestPercent',
        subField: 'forestPlantationPercent',
      })
    )

  const totalForestPlantationIntroducedPercentArea =
    originalDataPoint &&
    Numbers.format(
      ODPs.calcTotalSubSubFieldArea({
        originalDataPoint,
        field: 'forestPercent',
        subField: 'forestPlantationPercent',
        subSubField: 'forestPlantationIntroducedPercent',
      })
    )

  const displayHistory = useODPDisplayHistory()

  const totalsChange = usePlantationForestTotalsChange({
    totalForestPlantationIntroducedPercentArea,
    totalForestPlantationPercentArea,
  })

  return (
    <div className="fra-table__container print-break-inside-avoid">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">{t('fraForestCharacteristicsClass.plantationForest')}</th>
              <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses?.map((nationalClass, index) => (
              <ForestCharacteristicsPlantationRow
                key={nationalClass.name}
                canEditData={canEditData}
                index={index}
                originalDataPoint={originalDataPoint}
              />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {displayHistory ? (
                  <DiffText changes={totalsChange?.totalForestPlantationPercentArea} />
                ) : (
                  totalForestPlantationPercentArea
                )}
              </th>
              <td className="fra-table__calculated-cell">
                {displayHistory ? (
                  <DiffText changes={totalsChange?.totalForestPlantationIntroducedPercentArea} />
                ) : (
                  totalForestPlantationIntroducedPercentArea
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
export default ForestCharacteristicsPlantation
