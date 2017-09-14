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
import { acceptNextInteger } from '../utils/numberInput'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { separateThousandsWithSpaces } from '../utils/numberFormat'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { PercentInput } from '../reusableUiComponents/percentInput'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'

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
      <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
      <table className="fra-table odp__eof-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell-middle odp__input-table__divde-after-cell"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="fra-table__header-cell-middle"
              colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
        </tr>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.class')}</th>
          <th className="fra-table__header-cell-right odp__input-table__divde-after-cell">{i18n.t('nationalDataPoint.area')}</th>
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
            className="fra-table__aggregate-cell odp__input-table__divde-after-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalArea(active)))}</td>
          <td
            className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'forestPercent')))}</td>
          <td
            className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherWoodedLandPercent')))}</td>
          <td
            className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherLandPercent')))}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.otherLandCharacteristics')}</h3>
      <table className="fra-table odp__ol-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell-middle odp__input-table__divde-after-cell"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="fra-table__header-cell-middle"
              colSpan="4">{i18n.t('nationalDataPoint.fraClassesOfWhich')}</th>
        </tr>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.class')}</th>
          <th className="fra-table__header-cell-right odp__input-table__divde-after-cell">{i18n.t('nationalDataPoint.area')}</th>
          <th className="fra-table__header-cell-right">
            <div>{i18n.t('fraOtherLandClass.palms')}</div>
            <div className="odp__input-table__sub-header">{i18n.t('fraOtherLandClass.palmsClasses')}</div>
          </th>
          <th className="fra-table__header-cell-right">
            <div>{i18n.t('fraOtherLandClass.treeOrchards')}</div>
            <div className="odp__input-table__sub-header">{i18n.t('fraOtherLandClass.treeOrchardsClasses')}</div>
          </th>
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
          <td className="fra-table__header-cell-right odp__input-table__divde-after-cell">{separateThousandsWithSpaces(Number(originalDataPoint.otherLandTotalArea(active)))}</td>
          <td className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.otherLandClassTotalArea(active, 'otherLandPalmsPercent')))}</td>
          <td className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.otherLandClassTotalArea(active, 'otherLandTreeOrchardsPercent')))}</td>
          <td className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.otherLandClassTotalArea(active, 'otherLandAgroforestryPercent')))}</td>
          <td className="fra-table__aggregate-cell">{separateThousandsWithSpaces(Number(originalDataPoint.otherLandClassTotalArea(active, 'otherLandTreesUrbanSettingsPercent')))}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div className="odp__section">
      <h3 className="subhead">{i18n.t('forestCharacteristics.forestCharacteristics')}</h3>
      <table className="fra-table odp__foc-table">
        <thead>
        <tr>
          <th className="fra-table__header-cell odp__input-table__divde-after-cell"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="fra-table__header-cell"
              colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
        </tr>
        <tr>
          <th className="fra-table__header-cell">{i18n.t('nationalDataPoint.class')}</th>
          <th className="fra-table__header-cell-right odp__input-table__divde-after-cell">{i18n.t('nationalDataPoint.area')}</th>
          <th className="fra-table__header-cell-right">{i18n.t('fraForestCharacteristicsClass.naturallyGenerated')}</th>
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
          <td className="fra-table__header-cell-right odp__input-table__divde-after-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalArea(active)))}</td>
          <td className="odp__input-table__class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'naturalForestPercent')))}</td>
          <td className="odp__input-table__class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'plantationPercent')))}</td>
          <td className="odp__input-table__class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherPlantedPercent')))}</td>
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

const updatePastedValues = ({
                              odp,
                              countryIso,
                              rowIndex,
                              colIndex,
                              columnNames,
                              saveDraft,
                              type = 'integer',
                              allowGrow = false,
                            }) => evt => {
  const updateOdp = (rowNo, colNo, value) => {
    odp = originalDataPoint.updateNationalClass(odp, rowNo, columnNames[colNo], value)
  }
  const rowCount = R.filter(v => !v.placeHolder, odp.nationalClasses).length
  const pastedData = allowGrow ? readPasteClipboard(evt, type) : R.take(rowCount - rowIndex, readPasteClipboard(evt, type))

  mapIndexed((r, i) => {
    const row = rowIndex + i
    mapIndexed((c, j) => {
      const col = colIndex + j
      updateOdp(row, col, c)
    }, r)
  }, pastedData)
  saveDraft(countryIso, odp)
}

const getValidationStatusRow = (odp, index) => odp.validationStatus
  ? R.defaultTo({}, R.find(R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses))
  : {}

const nationalClassCols = ['className', 'definition']
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
                 columnNames: nationalClassCols,
                 saveDraft,
                 type: 'text',
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
        id={`odp-description-field-${index}`}
        value={definition || ''}
        onChange={(evt) =>
          saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))}
        onPaste={updatePastedValues({
          odp,
          countryIso,
          rowIndex: index,
          colIndex: 1,
          columnNames: nationalClassCols,
          saveDraft,
          type: 'text',
          allowGrow: true
        })}
      />

    </td>
    <td className="odp__col-review">
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

const extentOfForestCols = ['area', 'forestPercent', 'otherWoodedLandPercent', 'otherLandPercent']
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

const numberUpdateCreator = saveDraft => (countryIso, odp, index, fieldName, currentValue) => evt => {
  saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextInteger(evt.target.value, currentValue)))
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

  return <tr
    className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value'], openThread) ? 'fra-row-comments__open' : ''}>
    <td className="fra-table__header-cell-sub"><span>{className}</span></td>
    <td
      className={`fra-table__cell odp__input-table__divde-after-cell ${validationStatus.validArea === false ? 'error' : ''}`}>
      <ThousandSeparatedIntegerInput integerValue={area}
                                     className="fra-table__integer-input"
                                     onChange={numberUpdated(countryIso, odp, index, 'area', area)}
                                     onPaste={updatePastedValues({
                                       odp,
                                       countryIso,
                                       rowIndex: index,
                                       colIndex: 0,
                                       columnNames: extentOfForestCols,
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
          columnNames: extentOfForestCols,
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
          columnNames: extentOfForestCols,
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
          columnNames: extentOfForestCols,
          saveDraft
        })}
      />
    </td>
    <td className="odp__col-review">
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


const otherLandCharacteristicsCols = ['area', 'otherLandPalmsPercent', 'otherLandTreeOrchardsPercent', 'otherLandAgroforestryPercent', 'otherLandTreesUrbanSettingsPercent']
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
     i18n,
     ...props
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
      <td
        className={`fra-table__cell-mute odp__input-table__divde-after-cell`}>
        <ThousandSeparatedIntegerInput integerValue={area ? area * nationalClass.otherLandPercent / 100 : null}
                                       className="fra-table__integer-input"
                                       disabled={true}
                                       onChange={numberUpdated(countryIso, odp, index, 'area', area)}
                                       onPaste={updatePastedValues({
                                         odp,
                                         countryIso,
                                         rowIndex: index,
                                         colIndex: 0,
                                         columnNames: otherLandCharacteristicsCols,
                                         saveDraft
                                       })}
        />
      </td>
      <td className={`fra-table__cell ${otherLandStatusPercentage()}`}>
        <PercentInput
          value={otherLandPalmsPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherLandPalmsPercent', otherLandPalmsPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columnNames: otherLandCharacteristicsCols,
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
            columnNames: otherLandCharacteristicsCols,
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
            columnNames: otherLandCharacteristicsCols,
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
            columnNames: otherLandCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className="odp__col-review">
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


const forestCharacteristicsCols = ['area', 'naturalForestPercent', 'plantationPercent', 'otherPlantedPercent']
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
     naturalForestPrimaryPercent,
     plantationPercent,
     plantationIntroducedPercent,
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
      <td
        className={`odp__input-table__disabled-cell odp__input-table__divde-after-cell`}>
        <ThousandSeparatedIntegerInput integerValue={area}
                                       disabled={true}
                                       onChange={numberUpdated(countryIso, odp, index, 'area', area)}
                                       onPaste={updatePastedValues({
                                         odp,
                                         countryIso,
                                         rowIndex: index,
                                         colIndex: 0,
                                         columnNames: forestCharacteristicsCols,
                                         saveDraft
                                       })}
        />
      </td>
      <td className={`${focStatusPercentage()}`}>
        <PercentInput
          value={naturalForestPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'naturalForestPercent', naturalForestPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columnNames: forestCharacteristicsCols,
            saveDraft
          })}
        />
        <PercentInput
          prefix={i18n.t('nationalDataPoint.prefixPrimary')}
          value={naturalForestPrimaryPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'naturalForestPrimaryPercent', naturalForestPrimaryPercent)}
        />
      </td>
      <td className={`${focStatusPercentage()}`}>
        <PercentInput
          value={plantationPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'plantationPercent', plantationPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 2,
            columnNames: forestCharacteristicsCols,
            saveDraft
          })}
        />
        <PercentInput
          prefix={i18n.t('nationalDataPoint.prefixIntroduced')}
          value={plantationIntroducedPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'plantationIntroducedPercent', plantationIntroducedPercent)}
        />
      </td>
      <td className={`${focStatusPercentage()}`}>
        <PercentInput
          value={otherPlantedPercent || ''}
          onChange={numberUpdated(countryIso, odp, index, 'otherPlantedPercent', otherPlantedPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 3,
            columnNames: forestCharacteristicsCols,
            saveDraft
          })}
        />
      </td>
      <td className="odp__col-review">
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
