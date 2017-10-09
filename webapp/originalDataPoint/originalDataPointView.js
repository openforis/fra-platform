import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as originalDataPoint from './originalDataPoint'
import {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft
} from './actions'
import { fetchCountryOverviewStatus } from '../navigation/actions'
import { acceptNextInteger, acceptNextDecimal } from '../utils/numberInput'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { formatDecimal } from '../utils/numberFormat'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import { PercentInput } from '../reusableUiComponents/percentInput'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const years = ['', ...R.pipe(R.range(1990), R.reverse)(2021)]

const isCommentsOpen = (target, openThread = {}) => R.equals('NDP', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

const DataInput = ({match, saveDraft, markAsActual, remove, active, autoSaving, cancelDraft, copyPreviousNationalClasses, copyDisabled, openThread, i18n}) => {
  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !active.odpId || autoSaving
  const copyPreviousClassesDisabled = () => active.year && !autoSaving ? false : true
  const yearValidationStatusClass = () => active.validationStatus && !active.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], active.reservedYears)

  return <div className="odp__data-input-component odp_validate-form">
    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.year')}</h3>
      <div className={`${yearValidationStatusClass()}`}>
        <select
          className="select validation-error-sensitive-field"
          value={active.year || ''}
          onChange={
            (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), active))}>
          {
            years.map(
              year =>
                <option key={year}
                        value={year}
                        disabled={R.contains(year, unselectable)}>
                  {year}</option>
            )
          }
        </select>
      </div>
    </div>
    <div className="odp__section">
      <div className="odp__section-header">
        <h3 className="subhead">
          {i18n.t('nationalDataPoint.nationalClasses')}
        </h3>
        <button disabled={copyDisabled || copyPreviousClassesDisabled()}
                className="btn btn-primary btn-copy-prev-values"
                onClick={() => copyPreviousNationalClasses(countryIso, active)}>
          {i18n.t('nationalDataPoint.copyPreviousValues')}
        </button>
      </div>
      <table className="fra-table odp__national-class-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.nationalClass')}</th>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.definition')}</th>
        </tr>
        </thead>
        <tbody>
        {
          nationalClassRows(countryIso, active, saveDraft, openThread, i18n)
        }
        </tbody>
      </table>
    </div>
    <div className="odp__section">
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>
      <div className="odp__section-header">
        <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
        <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      </div>
      <table className="fra-table odp__eof-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell-middle fra-table__divider"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="fra-table__header-cell-middle"
              colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
        </tr>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.class')}</th>
          <th className="fra-table__header-cell-right fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraClass.forest')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraClass.otherWoodedLand')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraClass.otherLand')}</th>
        </tr>
        </thead>
        <tbody>
        {
          extentOfForestRows(countryIso, active, saveDraft, openThread, i18n)
        }
        <tr>
          <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
          <td
            className="fra-table__aggregate-cell fra-table__divider">{formatDecimal(originalDataPoint.totalArea(active))}</td>
          <td
            className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'forestPercent'))}</td>
          <td
            className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'otherWoodedLandPercent'))}</td>
          <td
            className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'otherLandPercent'))}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div className="odp__section">
      <table className="fra-table odp__ol-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.otherLandCharacteristics')}</th>
          <th className="fra-table__header-cell-right fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraOtherLandClass.palms')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraOtherLandClass.treeOrchards')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraOtherLandClass.agroforestry')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraOtherLandClass.treesUrbanSettings')}</th>
        </tr>
        </thead>
        <tbody>
        {
          otherLandCharacteristicsRows(countryIso, active, saveDraft, openThread, i18n)
        }
        <tr>
          <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
          <td className="fra-table__header-cell-right fra-table__divider">{formatDecimal(originalDataPoint.otherLandTotalArea(active))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.otherLandClassTotalArea(active, 'otherLandPalmsPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.otherLandClassTotalArea(active, 'otherLandTreeOrchardsPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.otherLandClassTotalArea(active, 'otherLandAgroforestryPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.otherLandClassTotalArea(active, 'otherLandTreesUrbanSettingsPercent'))}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div className="odp__section">
      <div className="odp__section-header">
        <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
        <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      </div>
      <table className="fra-table odp__foc-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell-middle fra-table__divider"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="fra-table__header-cell-middle"
              colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
        </tr>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.class')}</th>
          <th className="fra-table__header-cell-right fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
        </tr>
        </thead>
        <tbody>
        {
          foresCharaceristicsRows(countryIso, active, saveDraft, openThread, i18n)
        }
        <tr>
          <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
          <td className="fra-table__header-cell-right fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(active, 'forestPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.forestClassTotalArea(active, 'naturalForestPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.forestClassTotalArea(active, 'plantationPercent'))}</td>
          <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.forestClassTotalArea(active, 'otherPlantedPercent'))}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div className="odp__section">
      <table className="fra-table odp__foc-sub-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}</th>
            <th className="fra-table__header-cell-right fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
            <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.ofWhichPrimary')}</th>
          </tr>
        </thead>
        <tbody>
          {
            naturalForestPrimaryRows(countryIso, active, saveDraft, openThread, i18n)
          }
          <tr>
            <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
            <td className="fra-table__header-cell-right fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(active, 'naturalForestPercent'))}</td>
            <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.naturalForestTotalArea(active, 'naturalForestPrimaryPercent'))}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="odp__section">
      <table className="fra-table odp__foc-sub-table">
        <thead>
          <tr>
            <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
            <th className="fra-table__header-cell-right fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
            <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
          </tr>
        </thead>
        <tbody>
          {
            plantationIntroducedRows(countryIso, active, saveDraft, openThread, i18n)
          }
          <tr>
            <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
            <td className="fra-table__header-cell-right fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(active, 'plantationPercent'))}</td>
            <td className="fra-table__aggregate-cell">{formatDecimal(originalDataPoint.plantationForestTotalArea(active, 'plantationIntroducedPercent'))}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="odp__section">
      <h3 className="subhead">{i18n.t('review.comments')}</h3>
      <div
        className={`odp__cke_wrapper ${isCommentsOpen([`${active.odpId}`, 'comments'], openThread) ? 'fra-row-comments__open' : '' }`}>
        <div className="cke_wrapper">
          <CommentsEditor active={active} match={match} saveDraft={saveDraft}/>
        </div>
        {active.odpId
          ? <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[`${active.odpId}`, 'comments']}
                             countryIso={countryIso}/>
          : null}
      </div>
    </div>

    <div className="odp__bottom-buttons">
      <span
        className={saveControlsDisabled() ? 'btn btn-destructive disabled' : 'btn btn-destructive'}
        onClick={() => {
          if(window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
            saveControlsDisabled() ? null : remove(countryIso, active.odpId)
          }
        }}>
         {i18n.t('nationalDataPoint.delete')}
      </span>
      <div>
        <a className="btn btn-secondary odp__cancel-button"
           onClick={() => cancelDraft(countryIso, active.odpId)}>
          {i18n.t('nationalDataPoint.cancel')}
        </a>
        <button disabled={saveControlsDisabled()}
                className="btn btn-primary"
                onClick={() => markAsActual(countryIso, active)}>
          {i18n.t('nationalDataPoint.saveData')}
        </button>
      </div>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)

const sanitizerFor = type =>
  type === 'decimal' ?
    acceptNextDecimal
    : (type === 'integer' ? acceptNextInteger : R.identity)

const updatePastedValues = ({
                              odp,
                              countryIso,
                              rowIndex,
                              colIndex,
                              columns,
                              saveDraft,
                              allowGrow = false,
                            }) => evt => {
  const updateOdp = (odp, rowNo, colNo, rawValue) => {
    if (R.isNil(columns[colNo]))
      return R.clone(odp)
    const value = sanitizerFor(columns[colNo].type)(rawValue, null)
    const fieldName = columns[colNo].name
    return originalDataPoint.updateNationalClass(odp, rowNo, fieldName, value)
  }
  const rowCount = R.filter(v => !v.placeHolder, odp.nationalClasses).length
  const pastedData = allowGrow ? readPasteClipboard(evt, 'string')
    : R.take(rowCount - rowIndex, readPasteClipboard(evt, 'string'))

  var tempOdp = R.clone(odp)
  mapIndexed((r, i) => {
    const row = rowIndex + i
    mapIndexed((c, j) => {
      const col = colIndex + j
      tempOdp = updateOdp(tempOdp, row, col, c)
    }, r)
  }, pastedData)
  saveDraft(countryIso, tempOdp)
  return sanitizerFor(columns[colIndex].type)(pastedData[0][0])
}

const getValidationStatusRow = (odp, index) => odp.validationStatus
  ? R.defaultTo({}, R.find(R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses))
  : {}

const nationalClassCols = [{name: 'className', type: 'text'}, {name: 'definition', type: 'text'}]
const nationalClassRows = (countryIso, odp, saveDraft, openThread, i18n) => {
  return mapIndexed((nationalClass, index) => <NationalClassRow
    key={index}
    index={index}
    odp={odp}
    saveDraft={saveDraft}
    countryIso={countryIso}
    openThread={openThread}
    i18n={i18n}
    {...nationalClass}/>, odp.nationalClasses)
}

const NationalClassRow = ({odp, index, saveDraft, countryIso, className, definition, placeHolder, openThread, i18n}) =>
  <tr
    className={`${isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
    <td
      className={`fra-table__cell odp__national-class-name ${getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}`}>
        <input className="fra-table__input odp__national-class-input validation-error-sensitive-field"
               type="text"
               placeholder={placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
               value={className || ''}
               onChange={(evt) =>
                 saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value))}
               onPaste={updatePastedValues({
                 odp,
                 countryIso,
                 rowIndex: index,
                 colIndex: 0,
                 columns: nationalClassCols,
                 saveDraft,
                 allowGrow: true
               })}
        />
        {
          placeHolder
          ? null //placeHolder-rows can't be removed
          : <div
            className="odp__national-class-remove"
            onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
            <svg className="icon">
              <use xlinkHref="img/icons.svg#remove"/>
            </svg>
          </div>
        }
    </td>
    <td className="fra-table__cell">
      <VerticallyGrowingTextField
        value={definition || ''}
        onChange={(evt) =>
          saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))}
        onPaste={updatePastedValues({
          odp,
          countryIso,
          rowIndex: index,
          colIndex: 1,
          columns: nationalClassCols,
          saveDraft,
          allowGrow: true
        })}
      />

    </td>
    <td className="fra-table__row-anchor-cell">
      {placeHolder || !odp.odpId
        ? null
        : <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition']}
                             countryIso={countryIso}/>
          </div>
      }
    </td>
  </tr>

const extentOfForestCols = [
  {name: 'area', type: 'decimal'},
  {name: 'forestPercent', type: 'integer'},
  {name: 'otherWoodedLandPercent', type: 'integer'},
  {name: 'otherLandPercent', type: 'integer'}]

const extentOfForestRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ExtentOfForestRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const numberUpdateCreator = (saveDraft, type = 'integer') => (countryIso, odp, index, fieldName, currentValue) => evt => {
  saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, type === 'integer' ?
    acceptNextInteger(evt.target.value, currentValue) : acceptNextDecimal(evt.target.value, currentValue)
  ))
}

const ExtentOfForestRow = ({
                             odp,
                             index,
                             saveDraft,
                             countryIso,
                             className,
                             area,
                             forestPercent,
                             otherWoodedLandPercent,
                             otherLandPercent,
                             openThread,
                             i18n,
                             ...props
                           }) => {

  const validationStatus = getValidationStatusRow(odp, index)
  const eofStatusPercentage = () => validationStatus.validEofPercentage === false ? 'error' : ''

  const numberUpdated = numberUpdateCreator(saveDraft)
  const decimalUpdated = numberUpdateCreator(saveDraft, 'decimal')

  return <tr
    className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value'], openThread) ? 'fra-row-comments__open' : ''}>
    <td className="fra-table__header-cell-sub"><span>{className}</span></td>
    <td
      className={`fra-table__cell fra-table__divider ${validationStatus.validArea === false ? 'error' : ''}`}>
      <ThousandSeparatedDecimalInput numberValue={area}
                                     className="fra-table__integer-input"
                                     onChange={decimalUpdated(countryIso, odp, index, 'area', area)}
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
        value={forestPercent || ''}
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
        value={otherWoodedLandPercent || ''}
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
    <td className={`fra-table__cell ${eofStatusPercentage()}`}>
      <PercentInput
        value={otherLandPercent || ''}
        onChange={numberUpdated(countryIso, odp, index, 'otherLandPercent', otherLandPercent)}
        onPaste={updatePastedValues({
          odp,
          countryIso,
          rowIndex: index,
          colIndex: 3,
          columns: extentOfForestCols,
          saveDraft
        })}
      />
    </td>
    <td className="fra-table__row-anchor-cell">
      {odp.odpId
        ? <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
                             countryIso={countryIso}/>
          </div>
        : null}
    </td>
  </tr>
}

const otherLandCharacteristicsCols = [
  {name: 'area', type: 'decimal'},
  {name: 'otherLandPalmsPercent', type: 'integer'},
  {name: 'otherLandTreeOrchardsPercent', type: 'integer'},
  {name: 'otherLandAgroforestryPercent', type: 'integer'},
  {name: 'otherLandTreesUrbanSettingsPercent', type: 'integer'}
]
const otherLandCharacteristicsRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <OtherLandCharacteristicsRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const OtherLandCharacteristicsRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     otherLandPalmsPercent,
     otherLandTreeOrchardsPercent,
     otherLandAgroforestryPercent,
     otherLandTreesUrbanSettingsPercent,
     openThread,
     i18n
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const otherLandStatusPercentage = () => validationStatus.validOtherLandPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    return nationalClass.otherLandPercent <= 0
      ? null
      : <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'other_land_charasteristics'], openThread) ? 'fra-row-comments__open' : ''}>
      <td className="fra-table__header-cell-sub"><span>{className}</span></td>
      <td className={`fra-table__header-cell-sub-right fra-table__divider`}>{formatDecimal(area ? area * nationalClass.otherLandPercent / 100 : null)}</td>
      <td className={`fra-table__cell ${otherLandStatusPercentage()}`}>
        <PercentInput
          value={otherLandPalmsPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherLandPalmsPercent', otherLandPalmsPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: otherLandCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${otherLandStatusPercentage()}`}>
        <PercentInput
          value={otherLandTreeOrchardsPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherLandTreeOrchardsPercent', otherLandTreeOrchardsPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 2,
            columns: otherLandCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${otherLandStatusPercentage()}`}>
        <PercentInput
          value={otherLandAgroforestryPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherLandAgroforestryPercent', otherLandAgroforestryPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 3,
            columns: otherLandCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${otherLandStatusPercentage()}`}>
        <PercentInput
          value={otherLandTreesUrbanSettingsPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherLandTreesUrbanSettingsPercent', otherLandTreesUrbanSettingsPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 4,
            columns: otherLandCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId
          ? <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'other_land_charasteristics']}
                             countryIso={countryIso}/>
          </div>
          : null}
      </td>
    </tr>
  }


const forestCharacteristicsCols = [
  {name: 'area', type: 'decimal'},
  {name: 'naturalForestPercent', type: 'integer'},
  {name: 'plantationPercent', type: 'integer'},
  {name: 'otherPlantedPercent', type: 'integer'}
  ]
const foresCharaceristicsRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ForestCharacteristicsRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const ForestCharacteristicsRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     naturalForestPercent,
     plantationPercent,
     otherPlantedPercent,
     openThread,
     i18n,
     ...props
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const focStatusPercentage = () => validationStatus.validFocPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    return nationalClass.forestPercent <= 0
      ? null
      : <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics'], openThread) ? 'fra-row-comments__open' : ''}>
      <td className="fra-table__header-cell-sub"><span>{className}</span></td>
      <td className={`fra-table__header-cell-sub-right fra-table__divider`}>{formatDecimal(area ? area * nationalClass.forestPercent / 100 : null)}</td>
      <td className={`fra-table__cell ${focStatusPercentage()}`}>
        <PercentInput
          value={naturalForestPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'naturalForestPercent', naturalForestPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: forestCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${focStatusPercentage()}`}>
        <PercentInput
          value={plantationPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'plantationPercent', plantationPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 2,
            columns: forestCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${focStatusPercentage()}`}>
        <PercentInput
          value={otherPlantedPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherPlantedPercent', otherPlantedPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 3,
            columns: forestCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId
          ? <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator section='NDP'
                               name={i18n.t('nationalDataPoint.nationalDataPoint')}
                               target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
                               countryIso={countryIso}/>
            </div>
          : null}
      </td>
    </tr>
  }

const naturalForestPrimaryCols = [
  {name: 'area', type: 'decimal'},
  {name: 'naturalForestPrimaryPercent', type: 'integer'}
  ]

const naturalForestPrimaryRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <NaturalForestPrimaryRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const NaturalForestPrimaryRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     naturalForestPrimaryPercent,
     openThread,
     i18n,
     ...props
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const naturalForestPrimaryStatusPercentage = () => validationStatus.validNaturalForestPrimaryPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    return nationalClass.naturalForestPercent <= 0
      ? null
      : <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'natural_forest_primary'], openThread) ? 'fra-row-comments__open' : ''}>
      <td className="fra-table__header-cell-sub"><span>{className}</span></td>
      <td className={`fra-table__header-cell-sub-right fra-table__divider`}>{formatDecimal(area ? area * nationalClass.naturalForestPercent / 100 : null)}</td>
      <td className={`fra-table__cell ${naturalForestPrimaryStatusPercentage()}`}>
        <PercentInput
          value={naturalForestPrimaryPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'naturalForestPrimaryPercent', naturalForestPrimaryPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: naturalForestPrimaryCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId
          ? <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'natural_forest_primary']}
                             countryIso={countryIso}/>
          </div>
          : null}
      </td>
    </tr>
  }

const plantationIntroducedCols = [
  {name: 'area', type: 'decimal'},
  {name: 'plantationIntroducedPercent', type: 'integer'}
  ]

const plantationIntroducedRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <PlantationIntroducedRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const PlantationIntroducedRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     plantationIntroducedPercent,
     openThread,
     i18n,
     ...props
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const plantationIntroducedStatusPercentage = () => validationStatus.validplantationIntroducedPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    return nationalClass.plantationPercent <= 0
      ? null
      : <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'natural_forest_primary'], openThread) ? 'fra-row-comments__open' : ''}>
      <td className="fra-table__header-cell-sub"><span>{className}</span></td>
      <td className={`fra-table__header-cell-sub-right fra-table__divider`}>{formatDecimal(area ? area * nationalClass.plantationPercent / 100 : null)}</td>
      <td className={`fra-table__cell ${plantationIntroducedStatusPercentage()}`}>
        <PercentInput
          value={plantationIntroducedPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'plantationIntroducedPercent', plantationIntroducedPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: plantationIntroducedCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId
          ? <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator section='NDP'
                             name={i18n.t('nationalDataPoint.nationalDataPoint')}
                             target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'natural_forest_primary']}
                             countryIso={countryIso}/>
          </div>
          : null}
      </td>
    </tr>
  }

class CommentsEditor extends React.Component {

  initCKeditor () {
    if (this.props.match.params.odpId)
      this.descriptionEditor.setData(
        this.props.active.description,
        {callback: () => this.initCkeditorChangeListener()})
    else
      this.initCkeditorChangeListener()
  }

  initCkeditorChangeListener () {
    this.descriptionEditor.on('change', (evt) => {
        this.props.saveDraft(
          this.props.match.params.countryIso,
          {...this.props.active, description: evt.editor.getData()})
      }
    )
  }

  componentWillUnmount () {
    this.descriptionEditor.destroy(false)
    this.descriptionEditor = null
  }

  componentDidMount () {
    this.descriptionEditor = CKEDITOR.replace(document.getElementById('originalDataPointDescription'), ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    this.descriptionEditor.on('instanceReady', () => this.initCKeditor())
  }

  render () {
    return <textarea id="originalDataPointDescription"/>
  }

}

class OriginalDataPointView extends React.Component {

  componentDidMount () {
    const odpId = R.defaultTo(null, this.props.match.params.odpId)
    this.props.fetch(odpId, this.props.match.params.countryIso)
  }

  componentWillUnmount () {
    this.props.fetchCountryOverviewStatus(this.props.match.params.countryIso)
    this.props.clearActive()
  }

  render () {
    return <LoggedInPageTemplate>
      <div className="odp__container">
        <div className="odp_data-page-header">
          <h1 className="title">{this.props.i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        </div>
        {
          this.props.active
            ? <DataInput years={years}
                         copyDisabled={R.or(
                           R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.active)),
                           R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
                         {...this.props}/>
            : null

        }
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const odp = state.originalDataPoint
  const autoSaving = !!state.autoSave.status
  const active = odp.active
  const openThread = R.defaultTo({target: [], section: ''}, R.path(['review', 'openThread'], state))
  return {...odp, active, autoSaving, openThread, i18n: state.user.i18n}
}

export default connect(mapStateToProps, {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft,
  fetchCountryOverviewStatus
})(OriginalDataPointView)
