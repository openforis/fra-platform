import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Numbers } from 'utils/numbers'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import ButtonTableExport from 'client/components/ButtonTableExport'
import DiffText from 'client/components/DiffText'
import DefinitionLink from 'client/components/Links/DefinitionLink'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

import { useTotalsChange } from './hooks/useTotalsChange'
import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const { cycleName } = useCycleRouteParams()

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  const totalArea = Numbers.format(ODPs.calcTotalArea({ originalDataPoint }))
  const totalForestPercentArea = Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))
  const totalOtherWoodedLandPercentArea = Numbers.format(
    ODPs.calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' })
  )
  const totalLandArea = Numbers.format(ODPs.calcTotalLandArea({ originalDataPoint }))

  const displayHistory = useODPDisplayHistory()

  const _totals = { totalArea, totalForestPercentArea, totalLandArea, totalOtherWoodedLandPercentArea }
  const totalsChange = useTotalsChange(_totals)

  const tableRef = useRef(null)

  const fileName = `odp-${t(`nationalDataPoint.forestCategoriesLabel${cycleName !== '2020' ? '2025' : ''}`)} ${
    year ?? ''
  }`
  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <ButtonTableExport disabled={year === -1 || year === undefined} filename={fileName} tableRef={tableRef} />
          <h3 className="subhead">
            {t(`nationalDataPoint.forestCategoriesLabel${cycleName !== '2020' ? '2025' : ''}`)}
          </h3>
          <DefinitionLink anchor="1a" document="tad" title={t('definition.definitionLabel')} />
        </div>
      )}
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table ref={tableRef} className="fra-table ">
            <tbody>
              <tr>
                {print && (
                  <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 3}>
                    {originalDataPoint.year}
                  </th>
                )}
                <th className="fra-table__header-cell fra-table__divider" colSpan={2}>
                  {t(`nationalDataPoint.${cycleName !== '2020' ? 'nationalClassifications' : 'nationalClasses'}`)}
                </th>
                <th className="fra-table__header-cell" colSpan={3}>
                  {t(`nationalDataPoint.fraClasses`)}
                </th>
              </tr>
              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
                <th className="fra-table__header-cell">{t('fraClass.forest')}</th>
                <th className="fra-table__header-cell">{t(`fra.extentOfForest.otherWoodedLand`)}</th>
                <th className="fra-table__header-cell">
                  {t(`${cycleName !== '2020' ? 'fra.extentOfForest.remainingLandArea' : 'fraClass.otherLand'}`)}
                </th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ExtentOfForestRow
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                  originalDataPoint={originalDataPoint}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
                <td className="fra-table__calculated-cell fra-table__divider">
                  {displayHistory ? <DiffText changes={totalsChange?.totalArea} /> : totalArea}
                </td>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalForestPercentArea} />
                  ) : (
                    totalForestPercentArea
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalOtherWoodedLandPercentArea} />
                  ) : (
                    totalOtherWoodedLandPercentArea
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? <DiffText changes={totalsChange?.totalLandArea} /> : totalLandArea}
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
