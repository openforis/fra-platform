import React from 'react'

import { ODP, ODPs } from '@core/odp'
import * as NumberFormat from '@common/numberFormat'
import DefinitionLink from '@webapp/components/definitionLink'
import { useI18n } from '@webapp/components/hooks'
import { usePrintView } from '@webapp/store/app'

import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
  odp: ODP
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData, odp } = props

  const i18n = useI18n()
  const [printView] = usePrintView()
  const nationalClasses = odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  return (
    <div className="odp__section">
      {!printView && (
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
          <DefinitionLink
            document="tad"
            anchor="1a"
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
                <th className="fra-table__header-cell">{i18n.t('fraClass.forest')}</th>
                <th className="fra-table__header-cell">{i18n.t('fraClass.otherWoodedLand')}</th>
                <th className="fra-table__header-cell">{i18n.t('fraClass.otherLand')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ExtentOfForestRow key={nationalClass.className} canEditData={canEditData} index={index} odp={odp} />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <td className="fra-table__calculated-cell fra-table__divider">
                  {NumberFormat.formatDecimal(ODPs.calcTotalArea({ odp }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODPs.calcTotalFieldArea({ odp, field: 'forestPercent' }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODPs.calcTotalFieldArea({ odp, field: 'otherWoodedLandPercent' }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODPs.calcTotalLandArea({ odp }))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExtentOfForest
