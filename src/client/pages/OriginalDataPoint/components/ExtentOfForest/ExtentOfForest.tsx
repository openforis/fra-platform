import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from '@utils/numbers'

import { ODPs, OriginalDataPoint } from '@meta/assessment/originalDataPoint'

import { useCycle } from '@client/store/assessment'
import { useIsPrint } from '@client/hooks/useIsPath'
import DefinitionLink from '@client/components/DefinitionLink'

import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const cycle = useCycle()

  const { i18n } = useTranslation()
  const { print } = useIsPrint()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <h3 className="subhead">
            {i18n.t<string>(`nationalDataPoint.forestCategoriesLabel${cycle.name === '2025' ? '2025' : ''}`)}
          </h3>
          <DefinitionLink
            document="tad"
            anchor="1a"
            title={i18n.t<string>('definition.definitionLabel')}
            lang={i18n.language}
          />
        </div>
      )}

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">
            <tbody>
              <tr>
                {print && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 3}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell fra-table__divider" colSpan={2}>
                  {i18n.t<string>('nationalDataPoint.nationalClassifications')}
                </th>
                <th className="fra-table__header-cell" colSpan={3}>
                  {i18n.t<string>('nationalDataPoint.categories')}
                </th>
              </tr>
              <tr>
                <th className="fra-table__header-cell-left">{i18n.t<string>('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">
                  {i18n.t<string>('nationalDataPoint.area')}
                </th>
                <th className="fra-table__header-cell">{i18n.t<string>('fraClass.forest')}</th>
                <th className="fra-table__header-cell">{i18n.t<string>('fraClass.otherWoodedLand')}</th>
                <th className="fra-table__header-cell">{i18n.t<string>('fraClass.otherLand')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ExtentOfForestRow
                  originalDataPoint={originalDataPoint}
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{i18n.t<string>('nationalDataPoint.total')}</th>
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
