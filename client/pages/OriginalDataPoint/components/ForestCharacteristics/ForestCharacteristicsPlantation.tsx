import React from 'react'

import { useTranslation } from 'react-i18next'
import { useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { ODPs } from '@meta/assessment'
import { Numbers } from '@core/utils'
import ForestCharacteristicsPlantationRow from './ForestCharacteristicsPlantationRow'

type Props = {
  canEditData: boolean
}

const ForestCharacteristicsPlantation: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()
  const { i18n } = useTranslation()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left">
                {i18n.t('fraForestCharacteristicsClass.plantationForest')}
              </th>
              <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
            </tr>
          </thead>

          <tbody>
            {nationalClasses.map((nationalClass, index) => (
              <ForestCharacteristicsPlantationRow key={nationalClass.name} canEditData={canEditData} index={index} />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {Numbers.format(
                  ODPs.calcTotalSubFieldArea({
                    originalDataPoint,
                    field: 'forestPercent',
                    subField: 'plantationPercent',
                  })
                )}
              </th>
              <td className="fra-table__calculated-cell">
                {Numbers.format(
                  ODPs.calcTotalSubSubFieldArea({
                    originalDataPoint,
                    field: 'forestPercent',
                    subField: 'plantationPercent',
                    subSubField: 'plantationIntroducedPercent',
                  })
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
