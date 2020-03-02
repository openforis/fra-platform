import React from 'react'

import DefinitionLink from '@webapp/components/definitionLink'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import PercentInput from '@webapp/components/percentInput'
import ForestCharacteristicsPlantationSection from './forestCharacteristicsPlantationSection'

import * as originalDataPoint from '../../originalDataPoint'
import { getValidationStatusRow, isCommentsOpen, numberUpdateCreator, updatePastedValues } from '../commonFunctions'

import { greaterThan } from '@common/bignumberUtils'
import { formatDecimal } from '@common/numberFormat'

const forestCharacteristicsCols = [
  { name: 'area', type: 'decimal' },
  { name: 'naturalForestPercent', type: 'decimal' },
  { name: 'plantationPercent', type: 'decimal' },
  { name: 'otherPlantedPercent', type: 'decimal' }
]

const ForestCharacteristicsRow = props => {

  const {
    i18n, odp, area, countryIso, index, className,
    naturalForestPercent, plantationPercent, otherPlantedPercent,
    saveDraft, openThread, canEditData,
  } = props

  const numberUpdated = numberUpdateCreator(saveDraft)
  const validationStatus = getValidationStatusRow(odp, index)
  const focStatusPercentage = () => validationStatus.validFocPercentage === false ? 'error' : ''
  const nationalClass = odp.nationalClasses[index]
  const allowedClass = (nc) => nc.forestPercent > 0

  return allowedClass(nationalClass)
    ? (
      <tr
        className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics'], openThread) ? 'fra-row-comments__open' : ''}>
        <th className="fra-table__category-cell">{className}</th>
        <th
          className={`fra-table__calculated-sub-cell fra-table__divider`}>{formatDecimal(area ? area * nationalClass.forestPercent / 100 : null)}</th>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            disabled={!canEditData}
            numberValue={naturalForestPercent}
            onChange={numberUpdated(countryIso, odp, index, 'naturalForestPercent', naturalForestPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 1,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            disabled={!canEditData}
            numberValue={plantationPercent}
            onChange={numberUpdated(countryIso, odp, index, 'plantationPercent', plantationPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 2,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            disabled={!canEditData}
            numberValue={otherPlantedPercent}
            onChange={numberUpdated(countryIso, odp, index, 'otherPlantedPercent', otherPlantedPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 3,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className="fra-table__row-anchor-cell">
          {
            odp.odpId && canEditData &&
            <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.forestCharacteristics')}
                target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
                countryIso={countryIso}/>
            </div>
          }
        </td>
      </tr>
    )
    : null
}

const ForestCharacteristicsSection = props => {
  const {
    odp, countryIso, saveDraft, openThread, i18n, canEditData,
    printView = false
  } = props

  const plantationTotal = originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
  const hasPlantation = plantationTotal && greaterThan(plantationTotal, 0)

  const nationalClasses = odp.nationalClasses.filter(nationalClass => !nationalClass.placeHolder)

  return (
    <div className="odp__section">

      {
        !printView &&
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
          <DefinitionLink document="tad" anchor="1b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        </div>
      }

      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">

            <tbody>
            <tr>
              {
                printView &&
                <th className="fra-table__header-cell odp__year-column" rowSpan={nationalClasses.length + 3}>
                  {odp.year}
                </th>
              }
              <th className="fra-table__header-cell fra-table__divider" colSpan="2">
                {i18n.t('nationalDataPoint.nationalClasses')}
              </th>
              <th className="fra-table__header-cell" colSpan="3">
                {i18n.t('nationalDataPoint.fraClasses')}
              </th>
            </tr>
            <tr>
              <th className="fra-table__header-cell-left">
                {i18n.t('nationalDataPoint.class')}
              </th>
              <th className="fra-table__header-cell fra-table__divider">
                {i18n.t('nationalDataPoint.area')}
              </th>
              <th className="fra-table__header-cell">
                {i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}
              </th>
              <th className="fra-table__header-cell">
                {i18n.t('fraForestCharacteristicsClass.plantationForest')}
              </th>
              <th className="fra-table__header-cell">
                {i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}
              </th>
            </tr>

            {
              nationalClasses.map((nationalClass, index) => (
                <ForestCharacteristicsRow
                  canEditData={canEditData}
                  key={index}
                  index={index}
                  odp={odp}
                  saveDraft={saveDraft}
                  countryIso={countryIso}
                  openThread={openThread}
                  i18n={i18n}
                  {...nationalClass}/>

              ))
            }
            <tr>
              <th className="fra-table__header-cell-left">
                {i18n.t('nationalDataPoint.total')}
              </th>
              <th className="fra-table__calculated-cell fra-table__divider">
                {formatDecimal(originalDataPoint.classTotalArea(odp, 'forestPercent'))}
              </th>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent'))}
              </td>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}
              </td>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent'))}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      {
        hasPlantation &&
        <ForestCharacteristicsPlantationSection {...props}/>
      }

    </div>

  )
}

export default ForestCharacteristicsSection
