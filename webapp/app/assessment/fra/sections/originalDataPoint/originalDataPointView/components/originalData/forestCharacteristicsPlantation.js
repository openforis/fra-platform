import React from 'react'
import PropTypes from 'prop-types'

import * as NumberUtils from '@common/bignumberUtils'

import { useI18n } from '@webapp/components/hooks'

import * as ODP from '../../../originalDataPoint'
import ForestCharacteristicsPlantationRow from './forestCharacteristicsPlantationRow'

const ForestCharacteristicsPlantation = (props) => {
  const { odp, canEditData } = props
  const nationalClasses = odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)
  const i18n = useI18n()
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
                {NumberUtils.formatNumber(ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}
              </th>
              <td className="fra-table__calculated-cell">
                {NumberUtils.formatNumber(
                  ODP.subSubClassTotalArea(odp, 'forestPercent', 'plantationPercent', 'plantationIntroducedPercent')
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

ForestCharacteristicsPlantation.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  odp: PropTypes.object.isRequired,
}

export default ForestCharacteristicsPlantation
