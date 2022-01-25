import React from 'react'

import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'
import { useTranslation } from 'react-i18next'
import { Numbers } from '@core/utils'
import { ODPs } from '@meta/assessment/originalDataPoint'
import DefinitionLink from '@client/components/DefinitionLink'
import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const { i18n } = useTranslation()
  const [printView] = [false] // TODO: usePrintView()
  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

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
                    {originalDataPoint.year}
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
                <ExtentOfForestRow key={nationalClass.name} canEditData={canEditData} index={index} />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <td className="fra-table__calculated-cell fra-table__divider">
                  {Numbers.format(ODPs.calcTotalArea({ originalDataPoint }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' }))}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(ODPs.calcTotalLandArea({ originalDataPoint }))}
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
