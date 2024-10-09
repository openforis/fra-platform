import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ODPs, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import ButtonTableExport from 'client/components/ButtonTableExport'
import DefinitionLink from 'client/components/DefinitionLink'

import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const { assessmentName, cycleName } = useCycleRouteParams()

  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { print } = useIsPrintRoute()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  const nationalClassValidations = nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )

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
          <DefinitionLink
            anchor="1a"
            assessmentName={assessmentName}
            cycleName={cycleName}
            document="tad"
            lang={language}
            title={t('definition.definitionLabel')}
          />
        </div>
      )}
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table ref={tableRef} className="fra-table">
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
                  nationalClassValidation={nationalClassValidations[index]}
                  originalDataPoint={originalDataPoint}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
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
