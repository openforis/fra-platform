import React from 'react'
import * as R from 'ramda'

import PercentInput from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'

import * as originalDataPoint from '../../originalDataPoint'
import { getValidationStatusRow, isCommentsOpen, numberUpdateCreator, updatePastedValues } from '../commonFunctions'

import { formatDecimal } from '@webapp/utils/numberFormat'

const mapIndexed = R.addIndex(R.map)

const SubcategoryTableBody = props => (
  <tbody>
  {
    R.pipe(
      R.filter(nationalClass => !nationalClass.placeHolder),
      mapIndexed((nationalClass, index) => (
        <SubcategoryRow
          key={index}
          index={index}
          {...props}
          {...nationalClass}/>
      ))
    )(props.odp.nationalClasses)
  }
  </tbody>
)

const SubcategoryRow = props => {

  const {
    canEditData, odp, i18n, index, countryIso, className, area,
    saveDraft, openThread,
    parentCategory, ancestorCategory = null, categoryColumns, targetSuffix,
    validationResultField, reviewTitleKey,
  } = props

  const nationalClass = odp.nationalClasses[index]
  const numberUpdated = numberUpdateCreator(saveDraft)
  const validationStatus = getValidationStatusRow(odp, index)[validationResultField]
  const displayError = () => validationStatus === false ? 'error' : ''
  const commentTarget = [odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, targetSuffix]
  const areaMultiplier = ancestorCategory ? nationalClass[parentCategory] * nationalClass[ancestorCategory] / 10000 : nationalClass[parentCategory] / 100
  const categoryArea = area ? area * areaMultiplier : null
  const allowedClass = nc => ancestorCategory ? nc[parentCategory] > 0 && nc[ancestorCategory] > 0 : nc[parentCategory] > 0

  return allowedClass(nationalClass)
    ? (
      <tr className={isCommentsOpen(commentTarget, openThread) ? 'fra-row-comments__open' : ''}>
        <th className="fra-table__category-cell">
          {className}
        </th>
        <th className={`fra-table__calculated-sub-cell fra-table__divider`}>
          {formatDecimal(categoryArea)}
        </th>
        {
          mapIndexed((col, colIndex) => {
            const currentCol = categoryColumns[colIndex].name
            return <td key={colIndex} className={`fra-table__cell ${displayError()}`}>
              <PercentInput
                disabled={!canEditData}
                numberValue={nationalClass[currentCol]}
                onChange={numberUpdated(countryIso, odp, index, currentCol, nationalClass[currentCol])}
                onPaste={updatePastedValues({
                  odp,
                  countryIso,
                  rowIndex: index,
                  colIndex: colIndex,
                  columns: categoryColumns,
                  saveDraft,
                  allowedClass
                })}
              />
            </td>
          }, categoryColumns)
        }
        <td className="fra-table__row-anchor-cell">
          {
            odp.odpId && canEditData &&
            <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.' + reviewTitleKey)}
                target={commentTarget}
                countryIso={countryIso}/>
            </div>
          }
        </td>
      </tr>
    )
    : null
}

const ForestCharacteristicsPlantationSection = props => {

  const { i18n, odp, countryIso, saveDraft, openThread, canEditData } = props

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table odp__sub-table">
          <thead>
          <tr>
            <th
              className="fra-table__header-cell-left">
              {i18n.t('fraForestCharacteristicsClass.plantationForest')}
            </th>
            <th className="fra-table__header-cell fra-table__divider">
              {i18n.t('nationalDataPoint.area')}
            </th>
            <th className="fra-table__header-cell">
              {i18n.t('fraForestCharacteristicsClass.ofWhichIntroduced')}
            </th>
          </tr>
          </thead>
          <SubcategoryTableBody
            canEditData={canEditData}
            odp={odp}
            countryIso={countryIso}
            saveDraft={saveDraft}
            openThread={openThread}
            parentCategory="plantationPercent"
            ancestorCategory="forestPercent"
            categoryColumns={[{ name: 'plantationIntroducedPercent', type: 'decimal' }]}
            targetSuffix="plantation_forest_introduced"
            validationResultField="validPlantationIntroducedPercentage"
            reviewTitleKey="plantationForest"
            i18n={i18n}/>
          <tfoot>
          <tr>
            <th className="fra-table__header-cell-left">
              {i18n.t('nationalDataPoint.total')}
            </th>
            <th className="fra-table__calculated-cell fra-table__divider">
              {formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}
            </th>
            <td className="fra-table__calculated-cell">
              {formatDecimal(originalDataPoint.subSubClassTotalArea(odp, 'forestPercent', 'plantationPercent', 'plantationIntroducedPercent'))}
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ForestCharacteristicsPlantationSection
