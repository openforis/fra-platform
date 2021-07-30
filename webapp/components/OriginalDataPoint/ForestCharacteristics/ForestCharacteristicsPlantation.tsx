import React from 'react'

import { ODP, ODPs } from '@core/odp'
import * as NumberUtils from '@common/bignumberUtils'
import { useI18n } from '@webapp/components/hooks'
import ForestCharacteristicsPlantationRow from './ForestCharacteristicsPlantationRow'

type Props = {
  canEditData: boolean
  odp: ODP
}

const ForestCharacteristicsPlantation: React.FC<Props> = (props) => {
  const { odp, canEditData } = props
  const i18n = useI18n()

  const nationalClasses = odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

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
              <ForestCharacteristicsPlantationRow
                key={nationalClass.className}
                canEditData={canEditData}
                index={index}
                odp={odp}
              />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {NumberUtils.formatNumber(
                  ODPs.calcTotalSubFieldArea({ odp, field: 'forestPercent', subField: 'plantationPercent' })
                )}
              </th>
              <td className="fra-table__calculated-cell">
                {NumberUtils.formatNumber(
                  ODPs.calcTotalSubSubFieldArea({
                    odp,
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
