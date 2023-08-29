import React from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ODPs, OriginalDataPoint } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import DefinitionLink from 'client/components/DefinitionLink'

import ForestCharacteristicsNaturallyRegenerating from './ForestCharacteristicsNaturallyRegenerating'
import ForestCharacteristicsPlantation from './ForestCharacteristicsPlantation'
import ForestCharacteristicsRow from './ForestCharacteristicsRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristics: React.FC<Props> = (props) => {
  const assessment = useAssessment()
  const cycle = useCycle()

  const { canEditData, originalDataPoint } = props

  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { print } = useIsPrintRoute()

  const nationalClasses = originalDataPoint.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)
  const plantationTotal = ODPs.calcTotalSubFieldArea({
    originalDataPoint,
    field: 'forestPercent',
    subField: 'forestPlantationPercent',
  })
  const naturallyRegeneratingForestTotal = ODPs.calcTotalSubFieldArea({
    originalDataPoint,
    field: 'forestPercent',
    subField: 'forestNaturalPercent',
  })

  const hasPlantation = plantationTotal && Numbers.greaterThanOrEqualTo(plantationTotal, 0)
  // Display primary_forest only for ODP/Cycle2025
  const hasNaturallyRegeneratingForest =
    cycle.name === '2025' &&
    naturallyRegeneratingForestTotal &&
    Numbers.greaterThanOrEqualTo(naturallyRegeneratingForestTotal, 0)

  const nationalClassValidations = nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )

  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <h3 className="subhead">{t('nationalDataPoint.forestCharacteristics')}</h3>

          <DefinitionLink
            assessmentName={assessment.props.name}
            cycleName={cycle.name}
            document="tad"
            anchor="1b"
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
                <th className="fra-table__header-cell">
                  {t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
                </th>
                <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.plantationForest')}</th>
                <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ForestCharacteristicsRow
                  originalDataPoint={originalDataPoint}
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
                <th className="fra-table__calculated-cell fra-table__divider">
                  {Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))}
                </th>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestNaturalPercent',
                    })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'forestPlantationPercent',
                    })
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {Numbers.format(
                    ODPs.calcTotalSubFieldArea({
                      originalDataPoint,
                      field: 'forestPercent',
                      subField: 'otherPlantedForestPercent',
                    })
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {hasNaturallyRegeneratingForest && (
        <ForestCharacteristicsNaturallyRegenerating
          canEditData={canEditData}
          nationalClassValidations={nationalClassValidations}
        />
      )}

      {hasPlantation && <ForestCharacteristicsPlantation canEditData={canEditData} />}
    </div>
  )
}

export default ForestCharacteristics
