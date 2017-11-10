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
import { acceptNextDecimal } from '../utils/numberInput'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { formatDecimal } from '../utils/numberFormat'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import { PercentInput } from '../reusableUiComponents/percentInput'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import MultiSelect from '../reusableUiComponents/multiSelect'
import handlePaste from './paste'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'

const years = ['', ...R.pipe(R.range(1980), R.reverse)(2021)]

const isCommentsOpen = (target, openThread = {}) => R.equals('odp', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

const OdpViewContent = ({match, saveDraft, markAsActual, remove, active, autoSaving, cancelDraft, copyPreviousNationalClasses, copyDisabled, openThread, i18n}) => {
  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !active.odpId || autoSaving
  const copyPreviousClassesDisabled = () => active.year && !autoSaving ? false : true
  const yearValidationStatusClass = () => active.validationStatus && !active.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], active.reservedYears)

  return <div className="fra-view__content">
    <div className="fra-view__page-header">
      <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
      {
        active.editStatus && active.editStatus !== 'newDraft'
        ? <button className="btn btn-secondary"
            disabled={saveControlsDisabled()}
            onClick={() => cancelDraft(countryIso, active.odpId)}>
              {i18n.t('nationalDataPoint.discardChanges')}
          </button>
        : null
      }
      <button className="btn btn-primary"
        disabled={saveControlsDisabled()}
        onClick={() => markAsActual(countryIso, active)}>
         {i18n.t('nationalDataPoint.doneEditing')}
      </button>
    </div>
    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
      <div className={`odp__year-selection ${yearValidationStatusClass()}`}>
        <select
          required
          className="select validation-error-sensitive-field"
          value={active.year || ''}
          onChange={
            (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), active))}>
          {
            years.map(
              year =>
                <option key={year}
                        value={year}
                        disabled={R.contains(year.toString(), unselectable)}
                        hidden={year ? false : true}>
                  {year ? year : i18n.t('nationalDataPoint.selectYear')}</option>
            )
          }
        </select>
      </div>
      <h3 className="subhead">
        {i18n.t('nationalDataPoint.dataSources')}
      </h3>
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper odp__data-source-table-wrapper">
          <table className="fra-table">
            <tbody>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.references')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <VerticallyGrowingTextField
                  value={active.dataSourceReferences || ''}
                  onChange={ (e) => saveDraft(countryIso, R.assoc('dataSourceReferences', e.target.value, active)) }
                />
              </td>
              <td className="fra-table__row-anchor-cell">
                {
                  active.odpId
                    ? <div className="odp__review-indicator-row-anchor">
                    <ReviewIndicator
                      section='odp'
                      title={i18n.t('nationalDataPoint.dataSources')}
                      target={[active.odpId, 'dataSourceReferences']}
                      countryIso={countryIso}/>
                  </div>
                    : null
                }
              </td>
            </tr>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.methodsUsed')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <MultiSelect
                  i18n={i18n}
                  localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                  values={active.dataSourceMethods}
                  options={[
                    'nationalForestInventory',
                    'sampleBasedRemoteSensingAssessment',
                    'fullCoverMaps',
                    'registersQuestionnaires',
                    'other'
                  ]}
                  onChange={ (values) =>
                    saveDraft(countryIso, R.assoc('dataSourceMethods', values, active))
                  }
                />
              </td>
              <td className="fra-table__row-anchor-cell">
                {
                  active.odpId
                    ? <div className="odp__review-indicator-row-anchor">
                        <ReviewIndicator
                          section='odp'
                          title={i18n.t('nationalDataPoint.dataSources')}
                          target={[active.odpId, 'dataSourceMethods']}
                          countryIso={countryIso}/>
                      </div>
                    : null
                }
              </td>
            </tr>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.additionalComments')}</th>
              <td className="fra-table__cell-left odp__data-source-input-column">
                <VerticallyGrowingTextField
                  value={active.dataSourceAdditionalComments || ''}
                  onChange={ (e) => saveDraft(countryIso, R.assoc('dataSourceAdditionalComments', e.target.value, active)) }
                />
              </td>
              <td className="fra-table__row-anchor-cell">
              {
                active.odpId
                  ? <div className="odp__review-indicator-row-anchor">
                  <ReviewIndicator
                    section='odp'
                    title={i18n.t('nationalDataPoint.dataSources')}
                    target={[active.odpId, 'dataSourceAdditionalComments']}
                    countryIso={countryIso}/>
                </div>
                  : null
              }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table odp__nc-table">
            <thead>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.nationalClass')}</th>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.definition')}</th>
            </tr>
            </thead>
            <tbody>
            {
              nationalClassRows(countryIso, active, saveDraft, openThread, i18n)
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div className="odp__section">
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>
      <div className="odp__section-header">
        <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
        <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      </div>
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">
            <thead>
            <tr>
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
            </thead>
            <tbody>
            {
              extentOfForestRows(countryIso, active, saveDraft, openThread, i18n)
            }
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
              <td className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.totalArea(active))}</td>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'forestPercent'))}</td>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'otherWoodedLandPercent'))}</td>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.classTotalArea(active, 'otherLandPercent'))}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      {
        originalDataPoint.classTotalArea(active, 'otherLandPercent')
        ? <div className="fra-table__container">
            <div className="fra-table__scroll-wrapper">
              <table className="fra-table odp__sub-table">
                <thead>
                <tr>
                  <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.otherLandCharacteristics')}</th>
                  <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
                  <th className="fra-table__header-cell">{i18n.t('fraOtherLandClass.palms')}</th>
                  <th className="fra-table__header-cell">{i18n.t('fraOtherLandClass.treeOrchards')}</th>
                  <th className="fra-table__header-cell">{i18n.t('fraOtherLandClass.agroforestry')}</th>
                  <th className="fra-table__header-cell">{i18n.t('fraOtherLandClass.treesUrbanSettings')}</th>
                </tr>
                </thead>
                <SubcategoryTableBody
                  odp={active}
                  countryIso={countryIso}
                  saveDraft={saveDraft}
                  openThread={openThread}
                  parentCategory="otherLandPercent"
                  categoryColumns={[{name: 'otherLandPalmsPercent', type: 'decimal'},
                                    {name: 'otherLandTreeOrchardsPercent', type: 'decimal'},
                                    {name: 'otherLandAgroforestryPercent', type: 'decimal'},
                                    {name: 'otherLandTreesUrbanSettingsPercent', type: 'decimal'}]}
                  targetSuffix="other_land_charasteristics"
                  validationResultField="validOtherLandPercentage"
                  reviewTitleKey="otherLandCharacteristics"
                  i18n={i18n} />
                <tfoot>
                  <tr>
                    <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                    <th className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(active, 'otherLandPercent'))}</th>
                    <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'otherLandPercent', 'otherLandPalmsPercent'))}</td>
                    <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'otherLandPercent', 'otherLandTreeOrchardsPercent'))}</td>
                    <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'otherLandPercent', 'otherLandAgroforestryPercent'))}</td>
                    <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'otherLandPercent', 'otherLandTreesUrbanSettingsPercent'))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
        </div>
      : null
      }
    </div>


    <div className="odp__section">
      <div className="odp__section-header">
        <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
        <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      </div>
      <div className="fra-table__container">
        <div className="fra-table__scroll-wrapper">
          <table className="fra-table">
            <thead>
            <tr>
              <th className="fra-table__header-cell fra-table__divider"
                  colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
              <th className="fra-table__header-cell"
                  colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
            </tr>
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
              <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
              <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
            </tr>
            </thead>
            <tbody>
            {
              foresCharaceristicsRows(countryIso, active, saveDraft, openThread, i18n)
            }
            <tr>
              <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
              <th className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(active, 'forestPercent'))}</th>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'forestPercent', 'naturalForestPercent'))}</td>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'forestPercent', 'plantationPercent'))}</td>
              <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'forestPercent', 'otherPlantedPercent'))}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      {
        originalDataPoint.subClassTotalArea(active, 'forestPercent', 'plantationPercent')
        ? <div className="fra-table__container">
            <div className="fra-table__scroll-wrapper">
              <table className="fra-table odp__sub-table">
                <thead>
                  <tr>
                    <th className="fra-table__header-cell-left">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
                    <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
                    <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
                  </tr>
                </thead>
                <SubcategoryTableBody
                  odp={active}
                  countryIso={countryIso}
                  saveDraft={saveDraft}
                  openThread={openThread}
                  parentCategory="plantationPercent"
                  ancestorCategory="forestPercent"
                  categoryColumns={[{name: 'plantationIntroducedPercent', type: 'decimal'}]}
                  targetSuffix="plantation_forest_introduced"
                  validationResultField="validPlantationIntroducedPercentage"
                  reviewTitleKey="plantationForest"
                  i18n={i18n} />
                <tfoot>
                  <tr>
                    <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                    <th className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.subClassTotalArea(active, 'forestPercent', 'plantationPercent'))}</th>
                    <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subSubClassTotalArea(active, 'forestPercent', 'plantationPercent', 'plantationIntroducedPercent'))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        : null
      }
    </div>

    <div className="odp__section">
      <div className="fra-description">
        <div className={
          isCommentsOpen([`${active.odpId}`, 'comments'], openThread)
            ? 'fra-description__description-wrapper fra-row-comments__open'
            : 'fra-description__description-wrapper'
        }>
          <CommentsEditor active={active} match={match} saveDraft={saveDraft} i18n={i18n} title={i18n.t('review.comments')} />
        </div>
        <div className="fra-description__review-indicator-wrapper">
        {
          active.odpId
            ? <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.nationalDataPoint')}
                target={[`${active.odpId}`, 'comments']}
                countryIso={countryIso}/>
            : null
        }
        </div>
      </div>
    </div>

    <div className="odp__bottom-buttons">
      <button className="btn btn-destructive"
        disabled={saveControlsDisabled()}
        onClick ={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
          ? remove(countryIso, active.odpId)
          : null
      }>
        {i18n.t('nationalDataPoint.delete')}
      </button>
      {
        active.editStatus && active.editStatus !== 'newDraft'
          ? <button className="btn btn-secondary"
              disabled={saveControlsDisabled()}
              onClick={() => cancelDraft(countryIso, active.odpId)}>
              {i18n.t('nationalDataPoint.discardChanges')}
            </button>
          : null
      }
      <button className="btn btn-primary"
        disabled={saveControlsDisabled()}
        onClick={() => markAsActual(countryIso, active)}>
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)


const updatePastedValues =
  ({
    odp,
    countryIso,
    rowIndex,
    colIndex,
    columns,
    saveDraft,
    allowGrow = false,
    allowedClass = (nc) => true
  }) => evt => {

  const rawPastedData = readPasteClipboard(evt, 'string')
  const {updatedOdp, firstPastedCellData} = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
  saveDraft(countryIso, updatedOdp)
  return firstPastedCellData
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

const NationalClassRow =
  ({
    odp,
    index,
    saveDraft,
    countryIso,
    className,
    definition,
    placeHolder,
    openThread,
    i18n
  }) => {

  return <tr className={`${isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
    <td className={`fra-table__cell-left odp__nc-table__name ${getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}`}>
      <div className="odp__nc-table__input-container">
        <input className="odp__nc-table__input validation-error-sensitive-field"
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
              className="odp__nc-table__remove"
              onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
              <svg className="icon">
                <use xlinkHref="img/icons.svg#remove"/>
              </svg>
            </div>
          }
        </div>
    </td>
    <td className="fra-table__cell-left">
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
            <ReviewIndicator
              section='odp'
              title={i18n.t('nationalDataPoint.nationalClasses')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'definition']}
              countryIso={countryIso}/>
          </div>
      }
    </td>
  </tr>
}

const extentOfForestCols = [
  {name: 'area', type: 'decimal'},
  {name: 'forestPercent', type: 'decimal'},
  {name: 'otherWoodedLandPercent', type: 'decimal'},
  {name: 'otherLandPercent', type: 'decimal'}]

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

const numberUpdateCreator = (saveDraft) => (countryIso, odp, index, fieldName, currentValue) => evt => {
  saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextDecimal(evt.target.value, currentValue)))
}

const ExtentOfForestRow =
  ({
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
   i18n
  }) => {

  const validationStatus = getValidationStatusRow(odp, index)
  const eofStatusPercentage = () => validationStatus.validEofPercentage === false ? 'error' : ''
  const numberUpdated = numberUpdateCreator(saveDraft)

  return <tr className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value'], openThread) ? 'fra-row-comments__open' : ''}>
    <th className="fra-table__category-cell">{className}</th>
    <td
      className={`fra-table__cell fra-table__divider ${validationStatus.validArea === false ? 'error' : ''}`}>
      <ThousandSeparatedDecimalInput
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
    <td className={`fra-table__cell ${eofStatusPercentage()}`}>
      <PercentInput
        numberValue={otherLandPercent}
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
            <ReviewIndicator
              section='odp'
              title={i18n.t('nationalDataPoint.forestCategoriesLabel')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}/>
          </div>
        : null}
    </td>
  </tr>
}

const forestCharacteristicsCols = [
  {name: 'area', type: 'decimal'},
  {name: 'naturalForestPercent', type: 'decimal'},
  {name: 'plantationPercent', type: 'decimal'},
  {name: 'otherPlantedPercent', type: 'decimal'}
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
     i18n
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const focStatusPercentage = () => validationStatus.validFocPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    const allowedClass = (nc) => nc.forestPercent > 0

    return !allowedClass(nationalClass)
      ? null
      : <tr className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics'], openThread) ? 'fra-row-comments__open' : ''}>
          <th className="fra-table__category-cell">{className}</th>
          <th className={`fra-table__calculated-sub-cell fra-table__divider`}>{formatDecimal(area ? area * nationalClass.forestPercent / 100 : null)}</th>
          <td className={`fra-table__cell ${focStatusPercentage()}`}>
            <PercentInput
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
            {odp.odpId
              ? <div className="odp__review-indicator-row-anchor">
                  <ReviewIndicator
                    section='odp'
                    title={i18n.t('nationalDataPoint.forestCharacteristics')}
                    target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
                    countryIso={countryIso}/>
                </div>
              : null}
          </td>
        </tr>
  }

const SubcategoryTableBody = props => <tbody>{
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <SubcategoryRow
      key={index}
      index={index}
      {...props}
      {...nationalClass}/>)
    )(props.odp.nationalClasses)
}</tbody>

const SubcategoryRow =
  ({
    odp,
    index,
    saveDraft,
    countryIso,
    className,
    area,
    openThread,
    parentCategory,
    ancestorCategory = null,
    categoryColumns,
    targetSuffix,
    validationResultField,
    reviewTitleKey,
    i18n,
    ...props
  }) => {
    const nationalClass = odp.nationalClasses[index]
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)[validationResultField]
    const displayError = () => validationStatus === false ? 'error' : ''
    const commentTarget = [odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, targetSuffix]
    const areaMultiplier = ancestorCategory ? nationalClass[parentCategory] * nationalClass[ancestorCategory] / 10000 : nationalClass[parentCategory] / 100
    const categoryArea = area ? area * areaMultiplier : null
    const allowedClass = nc => ancestorCategory ? nc[parentCategory] && nc[ancestorCategory] > 0 : nc[parentCategory] > 0

    return !allowedClass(nationalClass)
      ? null
      : <tr className={isCommentsOpen(commentTarget, openThread) ? 'fra-row-comments__open' : ''}>
          <th className="fra-table__category-cell">{className}</th>
          <th className={`fra-table__calculated-sub-cell fra-table__divider`}>{formatDecimal(categoryArea)}</th>
          {
            mapIndexed((col, colIndex) => {
              const currentCol = categoryColumns[colIndex].name
              return <td key={colIndex} className={`fra-table__cell ${displayError()}`}>
                <PercentInput
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
            {odp.odpId
              ? <div className="odp__review-indicator-row-anchor">
                <ReviewIndicator
                  section='odp'
                  title={i18n.t('nationalDataPoint.' + reviewTitleKey)}
                  target={commentTarget}
                  countryIso={countryIso}/>
              </div>
              : null}
          </td>
        </tr>
  }

class CommentsEditor extends React.Component {

  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  initCKeditor () {
    if (this.props.match.params.odpId) {
      this.descriptionEditor.setData(
        this.props.active.description,
        {callback: () => this.initCkeditorChangeListener()})
    } else {
      this.initCkeditorChangeListener()
    }
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
    this.descriptionEditor = CKEDITOR.replace(this.refs.originalDataPointDescription, ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    this.descriptionEditor.on('instanceReady', () => this.initCKeditor())
  }

  componentDidUpdate () {
    if (this.state.open && this.state.shouldStealFocus) {
      this.descriptionEditor.focus()
      this.setState({...this.state, shouldStealFocus: false})
    }
  }

  render () {
    const content = this.props.active.description || this.props.i18n.t('description.emptyLabel')
    return <div>
      <div className="fra-description__header-row">
        <h3 className="subhead fra-description__header">{this.props.title}</h3>
        <button className={`btn btn-s ${this.state.open ? 'btn-primary' : 'btn-secondary'}`} onClick={e => {
            this.state.open
              ? this.setState({open: false})
              : this.setState({open: true, shouldStealFocus: true})
            e.stopPropagation()
          }
        }>
        {this.state.open ? this.props.i18n.t('description.done') : this.props.i18n.t('description.edit')}
        </button>
      </div>
      <div className="cke_wrapper" style={{display: this.state.open ? 'block' : 'none'}}>
        <textarea ref="originalDataPointDescription"/>
      </div>
      <div className={`fra-description__${this.props.active.description ? 'preview' : 'placeholder'}`} style={{display: this.state.open ? 'none' : 'block'}} dangerouslySetInnerHTML={{__html: content}}/>
    </div>
  }

}

class OriginalDataPointView extends React.Component {

  componentDidMount () {
    const odpId = R.defaultTo(null, this.props.match.params.odpId)
    this.props.fetch(odpId, this.props.match.params.countryIso)
    // TODO this requires passing in target array containing odpId as well
    // also requires server-side support in the API to handle the target-array
    // this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, 'odp')
  }

  componentWillUnmount () {
    this.props.fetchCountryOverviewStatus(this.props.match.params.countryIso)
    this.props.clearActive()
  }

  render () {
    return <LoggedInPageTemplate>
      {
        this.props.active
          ? <OdpViewContent years={years}
                       copyDisabled={R.or(
                         R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.active)),
                         R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
                       {...this.props}/>
          : null

      }
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const odp = state.originalDataPoint
  const autoSaving = state.autoSave.status === 'saving'
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
  fetchCountryOverviewStatus,
  fetchLastSectionUpdateTimestamp
})(OriginalDataPointView)
