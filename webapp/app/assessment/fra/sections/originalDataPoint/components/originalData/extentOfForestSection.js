import React from 'react'

import DefinitionLink from '@webapp/components/definitionLink'
import ThousandSeparatedDecimalInput from '@webapp/components/thousandSeparatedDecimalInput'
import PercentInput from '@webapp/components/percentInput'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'

import * as originalDataPoint from '../../originalDataPoint'
import { getValidationStatusRow, isCommentsOpen, numberUpdateCreator, updatePastedValues } from '../commonFunctions'

import { formatDecimal } from '@common/numberFormat'
import { add, sub } from '@common/bignumberUtils'

const extentOfForestCols = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' }]

const ExtentOfForestRow = props => {

  const {
    odp, i18n, index, countryIso, className,
    area, forestPercent, otherWoodedLandPercent,
    saveDraft, openThread, canEditData,
  } = props

  const validationStatus = getValidationStatusRow(odp, index)
  const eofStatusPercentage = () => validationStatus.validEofPercentage === false ? 'error' : ''
  const numberUpdated = numberUpdateCreator(saveDraft)

  return (
    <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value'], openThread) ? 'fra-row-comments__open' : ''}>
      <th className="fra-table__category-cell">{className}</th>
      <td
        className={`fra-table__cell fra-table__divider ${validationStatus.validArea === false ? 'error' : ''}`}>
        <ThousandSeparatedDecimalInput
          disabled={!canEditData}
          numberValue={area}
          onChange={numberUpdated(countryIso, odp, index, 'area', area)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 0,
            columns: extentOfForestCols,
            saveDraft
          })}/>
      </td>
      <td className={`fra-table__cell ${eofStatusPercentage()}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={forestPercent}
          onChange={numberUpdated(countryIso, odp, index, 'forestPercent', forestPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: extentOfForestCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${eofStatusPercentage()}`}>
        <PercentInput
          disabled={!canEditData}
          numberValue={otherWoodedLandPercent}
          onChange={numberUpdated(countryIso, odp, index, 'otherWoodedLandPercent', otherWoodedLandPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 2,
            columns: extentOfForestCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__calculated-cell">
        {formatDecimal(sub(100, add(forestPercent, otherWoodedLandPercent)))}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>
      <td className="fra-table__row-anchor-cell">
        {
          odp.odpId && canEditData &&
          <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              section='odp'
              title={i18n.t('nationalDataPoint.forestCategoriesLabel')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}/>
          </div>
        }
      </td>
    </tr>
  )
}

const ExtentOfForestSection = props => {

  const {
    canEditData, odp, countryIso, saveDraft, openThread, i18n,
    printView = false
  } = props

  const nationalClasses = odp.nationalClasses.filter(nationalClass => !nationalClass.placeHolder)

  return (
    <div className="odp__section">

      {
        !printView &&
        <div className="odp__section-header">
          <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
          <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
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
              <th className="fra-table__header-cell fra-table__divider"
                  colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
              <th className="fra-table__header-cell"
                  colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
            </tr>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
              <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraClass.forest')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraClass.otherWoodedLand')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraClass.otherLand')}</th>
            </tr>

            {
              nationalClasses.map((nationalClass, index) => (
                <ExtentOfForestRow
                  canEditData={canEditData}
                  key={index}
                  index={index}
                  odp={odp}
                  saveDraft={saveDraft}
                  countryIso={countryIso}
                  openThread={openThread}
                  i18n={i18n}
                  {...nationalClass}/>)
              )
            }
            <tr>
              <th className="fra-table__header-cell-left">
                {i18n.t('nationalDataPoint.total')}</th>
              <td className="fra-table__calculated-cell fra-table__divider">
                {formatDecimal(originalDataPoint.totalArea(odp))}
              </td>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.classTotalArea(odp, 'forestPercent'))}
              </td>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.classTotalArea(odp, 'otherWoodedLandPercent'))}
              </td>
              <td className="fra-table__calculated-cell">
                {formatDecimal(originalDataPoint.otherLandTotalArea(odp))}
              </td>
            </tr>
            </tbody>

          </table>

        </div>
      </div>

    </div>
  )
}

export default ExtentOfForestSection
