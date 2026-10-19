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

import { useForestCharacteristicsTotalsChange } from './hooks/useForestCharacteristicsTotalsChange'
import { useHistoryHasNaturallyRegeneratingAndPlantationForest } from './hooks/useHistoryHasNaturallyRegeneratingAndPlantationForest'
import ForestCharacteristicsNaturallyRegenerating from './ForestCharacteristicsNaturallyRegenerating'
import ForestCharacteristicsPlantation from './ForestCharacteristicsPlantation'
import ForestCharacteristicsRow from './ForestCharacteristicsRow'

type Props = {
  canEditData: boolean
  originalDataPoint: OriginalDataPoint
}

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { canEditData, originalDataPoint } = props
  const { year } = originalDataPoint
  const { cycleName } = useCycleRouteParams()

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()

  const totalForestPercentArea = Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))
  const totalForestNaturalPercentArea = Numbers.format(
    ODPs.calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestNaturalPercent',
    })
  )
  const totalForestPlantationPercentArea = Numbers.format(
    ODPs.calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
    })
  )
  const totalOtherPlantedForestPercentArea = Numbers.format(
    ODPs.calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'otherPlantedForestPercent',
    })
  )

  const displayHistory = useODPDisplayHistory()

  const totalsChange = useForestCharacteristicsTotalsChange({
    totalForestNaturalPercentArea,
    totalForestPercentArea,
    totalForestPlantationPercentArea,
    totalOtherPlantedForestPercentArea,
  })

  const { historyHasNaturallyRegeneratingForest, historyHasPlantationForest } =
    useHistoryHasNaturallyRegeneratingAndPlantationForest()

  const { nationalClasses } = originalDataPoint
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

  const hasPlantationForest = plantationTotal && Numbers.greaterThanOrEqualTo(plantationTotal, 0)
  //  naturally regenerating forest is not available in Cycle 2020
  const hasNaturallyRegeneratingForest =
    cycleName !== '2020' &&
    naturallyRegeneratingForestTotal &&
    Numbers.greaterThanOrEqualTo(naturallyRegeneratingForestTotal, 0)

  const tableRef = useRef(null)

  const fileName = `odp-${t('nationalDataPoint.forestCharacteristics')} ${year ?? ''}`
  return (
    <div className="odp__section">
      {!print && (
        <div className="odp__section-header">
          <ButtonTableExport disabled={year === -1 || year === undefined} filename={fileName} tableRef={tableRef} />

          <h3 className="subhead">{t('nationalDataPoint.forestCharacteristics')}</h3>

          <DefinitionLink anchor="1b" document="tad" title={t('definition.definitionLabel')} />
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
                <th className="fra-table__header-cell">
                  {t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
                </th>
                <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.plantationForest')}</th>
                <th className="fra-table__header-cell">{t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
              </tr>

              {nationalClasses.map((nationalClass, index) => (
                <ForestCharacteristicsRow
                  key={nationalClass.name}
                  canEditData={canEditData}
                  index={index}
                  originalDataPoint={originalDataPoint}
                />
              ))}

              <tr>
                <th className="fra-table__header-cell-left">{t('nationalDataPoint.total')}</th>
                <th className="fra-table__calculated-cell fra-table__divider">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalForestPercentArea} />
                  ) : (
                    totalForestPercentArea
                  )}
                </th>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalForestNaturalPercentArea} />
                  ) : (
                    totalForestNaturalPercentArea
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalForestPlantationPercentArea} />
                  ) : (
                    totalForestPlantationPercentArea
                  )}
                </td>
                <td className="fra-table__calculated-cell">
                  {displayHistory ? (
                    <DiffText changes={totalsChange?.totalOtherPlantedForestPercentArea} />
                  ) : (
                    totalOtherPlantedForestPercentArea
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {(hasNaturallyRegeneratingForest || historyHasNaturallyRegeneratingForest) && (
        <ForestCharacteristicsNaturallyRegenerating canEditData={canEditData} originalDataPoint={originalDataPoint} />
      )}
      {(hasPlantationForest || historyHasPlantationForest) && (
        <ForestCharacteristicsPlantation canEditData={canEditData} originalDataPoint={originalDataPoint} />
      )}
    </div>
  )
}

export default ForestCharacteristics
