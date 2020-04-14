import React from 'react'
import PropTypes from 'prop-types'

import * as NumberUtils from '@common/bignumberUtils'
import DefinitionLink from '@webapp/components/definitionLink'
import { useI18n, usePrintView } from '@webapp/components/hooks'

import * as ODP from '../../../originalDataPoint'
import ForestCharacteristicsRow from './forestCharacteristicsRow'
import ForestCharacteristicsPlantation from './forestCharacteristicsPlantation'

const ForestCharacteristics = (props) => {
  const { canEditData, odp } = props
  const nationalClasses = odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)
  const plantationTotal = ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
  const hasPlantation = plantationTotal && NumberUtils.greaterThan(plantationTotal, 0)

  const i18n = useI18n()
  const [printView] = usePrintView()

  return (
    <div className="odp__section">
      {!printView && (
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
          <DefinitionLink
            document="tad"
            anchor="1b"
            title={i18n.t('definition.definitionLabel')}
            lang={i18n.language}
          />
        </div>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {printView && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 3}>
                    {odp.year}
                  </th>
                )}
                <th className="fra-table__header-cell fra-table__divider" colSpan="2">
                  {i18n.t('nationalDataPoint.nationalClasses')}
                </th>
                <th className="fra-table__header-cell" colSpan="3">
                  {i18n.t('nationalDataPoint.fraClasses')}
                </th>
              </tr>
              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
                <th className="fra-table__header-cell">
                  {i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
                </th>
                <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
                <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ForestCharacteristicsRow
                  key={nationalClass.className}
                  canEditData={canEditData}
                  index={index}
                  odp={odp}
                />
              ))}
              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <th className="fra-table__calculated-cell fra-table__divider">
                  {NumberUtils.formatNumber(ODP.classTotalArea(odp, 'forestPercent'))}
                </th>
                <td className="fra-table__calculated-cell">
                  {NumberUtils.formatNumber(ODP.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent'))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberUtils.formatNumber(ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberUtils.formatNumber(ODP.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent'))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {hasPlantation && <ForestCharacteristicsPlantation canEditData={canEditData} odp={odp} />}
    </div>
  )
}

ForestCharacteristics.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  odp: PropTypes.object.isRequired,
}

export default ForestCharacteristics
