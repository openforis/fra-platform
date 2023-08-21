import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ODPs, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import DefinitionLink from 'client/components/DefinitionLink'

import NationalClassValidations from '../NationalClassValidations'
import ExtentOfForestRow from './ExtentOfForestRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ExtentOfForest: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const assessment = useAssessment()
  const cycle = useCycle()

  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { print } = useIsPrintRoute()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)

  const nationalClassValidations = nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )

  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <h3 className="subhead">
            {t(`nationalDataPoint.forestCategoriesLabel${cycle.name === '2025' ? '2025' : ''}`)}
          </h3>
          <DefinitionLink
            assessmentName={assessment.props.name}
            cycleName={cycle.name}
            document="tad"
            anchor="1a"
            title={t('definition.definitionLabel')}
            lang={language}
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
                  {t(`nationalDataPoint.${cycle.name === '2025' ? 'nationalClassifications' : 'nationalClasses'}`)}
                </th>
                <th className="fra-table__header-cell" colSpan={3}>
                  {t(`nationalDataPoint.fraClasses`)}
                </th>
              </tr>
              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.class')}</th>
                <th className="fra-table__header-cell fra-table__divider">{t('nationalDataPoint.area')}</th>
                <th className="fra-table__header-cell">{t('fraClass.forest')}</th>
                <th className="fra-table__header-cell">
                  {t(`${cycle.name === '2025' ? 'fra.extentOfForest.otherWoodedLand' : 'fraClass.otherWoodedLand'}`)}
                </th>
                <th className="fra-table__header-cell">
                  {t(`${cycle.name === '2025' ? 'fra.extentOfForest.remainingLandArea' : 'fraClass.otherLand'}`)}
                </th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ExtentOfForestRow
                  originalDataPoint={originalDataPoint}
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                  nationalClassValidation={nationalClassValidations[index]}
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

          <NationalClassValidations
            nationalClasses={nationalClasses}
            nationalClassValidations={nationalClassValidations}
            variable="validExtentOfForestPercentage"
          />
        </div>
      </div>
    </div>
  )
}

export default ExtentOfForest
