import React from 'react'

import { ODP, ODPs } from '@core/odp'
import { Numbers } from '@core/utils/numbers'
import { useI18n } from '@webapp/hooks'
import { usePrintView } from '@webapp/store/app'

import DefinitionLink from '@webapp/components/definitionLink'
import ForestCharacteristicsRow from './ForestCharacteristicsRow'
import ForestCharacteristicsPlantation from './ForestCharacteristicsPlantation'

type Props = {
  canEditData: boolean
  odp: ODP
}

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { canEditData, odp } = props

  const i18n = useI18n()
  const [printView] = usePrintView()

  const nationalClasses = odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)
  const plantationTotal = ODPs.calcTotalSubFieldArea({ odp, field: 'forestPercent', subField: 'plantationPercent' })
  const hasPlantation = plantationTotal && Numbers.greaterThan(plantationTotal, 0)

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
                <th className="fra-table__header-cell fra-table__divider" colSpan={2}>
                  {i18n.t('nationalDataPoint.nationalClasses')}
                </th>
                <th className="fra-table__header-cell" colSpan={3}>
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
                <ForestCharacteristicsRow key={nationalClass.name} canEditData={canEditData} index={index} odp={odp} />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <th className="fra-table__calculated-cell fra-table__divider">
                  {Numbers.format(ODPs.calcTotalFieldArea({ odp, field: 'forestPercent' }))}
                </th>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({ odp, field: 'forestPercent', subField: 'naturalForestPercent' })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({ odp, field: 'forestPercent', subField: 'plantationPercent' })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({ odp, field: 'forestPercent', subField: 'otherPlantedPercent' })
                  )}
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

export default ForestCharacteristics
