import React from 'react'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberFormat from '@common/numberFormat'
import DefinitionLink from '@webapp/components/definitionLink'
import { useI18n, usePrintView } from '@webapp/components/hooks'
import * as ODP from '../../../originalDataPoint'
import ExtentOfForestRow from './extentOfForestRow'

type Props = {
  canEditData: boolean
  odp: any
}
const ExtentOfForest = (props: Props) => {
  const { canEditData, odp } = props
  const nationalClasses = odp.nationalClasses.filter((nationalClass: any) => !nationalClass.placeHolder)
  const i18n = useI18n()
  const [printView] = usePrintView()
  return (
    <div className="odp__section">
      {!printView && (
        <div className="odp__section-header">
          <h3 className="subhead">{(i18n as any).t('nationalDataPoint.forestCategoriesLabel')}</h3>
          <DefinitionLink
            document="tad"
            anchor="1a"
            title={(i18n as any).t('definition.definitionLabel')}
            lang={(i18n as any).language}
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
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'. */}
                <th className="fra-table__header-cell fra-table__divider" colSpan="2">
                  {(i18n as any).t('nationalDataPoint.nationalClasses')}
                </th>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'. */}
                <th className="fra-table__header-cell" colSpan="3">
                  {(i18n as any).t('nationalDataPoint.fraClasses')}
                </th>
              </tr>
              <tr>
                <th className="fra-table__header-cell-left">{(i18n as any).t('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">
                  {(i18n as any).t('nationalDataPoint.area')}
                </th>
                <th className="fra-table__header-cell">{(i18n as any).t('fraClass.forest')}</th>
                <th className="fra-table__header-cell">{(i18n as any).t('fraClass.otherWoodedLand')}</th>
                <th className="fra-table__header-cell">{(i18n as any).t('fraClass.otherLand')}</th>
              </tr>

              {nationalClasses.map((nationalClass: any, index: any) => (
                <ExtentOfForestRow key={nationalClass.className} canEditData={canEditData} index={index} odp={odp} />
              ))}
              <tr>
                <th className="fra-table__header-cell-left">{(i18n as any).t('nationalDataPoint.total')}</th>
                <td className="fra-table__calculated-cell fra-table__divider">
                  {NumberFormat.formatDecimal(ODP.totalArea(odp))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODP.classTotalArea(odp, 'forestPercent'))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODP.classTotalArea(odp, 'otherWoodedLandPercent'))}
                </td>
                <td className="fra-table__calculated-cell">
                  {NumberFormat.formatDecimal(ODP.otherLandTotalArea(odp))}
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
