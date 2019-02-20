import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import ReviewIndicator from '../review/reviewIndicator'
import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'
import OriginalData from './components/originalData/originalData'
import CommentsEditor from './components/commentsEditor'

import * as originalDataPoint from './originalDataPoint'
import { isCommentsOpen } from './components/commonFunctions'

import {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft
} from './actions'
import { fetchCountryOverviewStatus } from '../country/actions'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'

const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]

const OriginalDataPoint = (props) => {

  const {
    match, saveDraft, markAsActual, remove,
    odp, autoSaving, cancelDraft, copyPreviousNationalClasses,
    copyDisabled, openThread, i18n, useOriginalDataPointsInFoc
  } = props

  const { countryIso, tab } = match.params

  const saveControlsDisabled = () => !odp.odpId || autoSaving
  const yearValidationStatusClass = () => odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], odp.reservedYears)

  return (
    <div className="fra-view__content">
      <div className="fra-view__page-header">
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        {
          odp.editStatus && odp.editStatus !== 'newDraft'
            ? <button
              className="btn btn-secondary margin-right"
              disabled={saveControlsDisabled()}
              onClick={() => cancelDraft(countryIso, odp.odpId, tab)}>
              {i18n.t('nationalDataPoint.discardChanges')}
            </button>
            : null
        }
        <button
          className="btn btn-primary"
          disabled={saveControlsDisabled()}
          onClick={() => markAsActual(countryIso, odp, tab)}>
          {i18n.t('nationalDataPoint.doneEditing')}
        </button>
        <div className="odp-v-divider"></div>
        <button
          className="btn btn-destructive"
          disabled={saveControlsDisabled()}
          onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
            ? remove(countryIso, odp.odpId, tab)
            : null
          }>
          {i18n.t('nationalDataPoint.delete')}
        </button>
      </div>

      <div className="odp__section">
        <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
        <div className={`odp__year-selection ${yearValidationStatusClass()}`}>
          <select
            className="select validation-error-sensitive-field"
            value={odp.year || ''}
            onChange={
              (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), odp))}>
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
      </div>

      <DataSources {...props}/>

      <NationalClasses {...props} />

      <OriginalData {...props} />

      <div className="odp__section">
        <div className="fra-description">
          <div className={
            isCommentsOpen([`${odp.odpId}`, 'comments'], openThread)
              ? 'fra-description__wrapper fra-row-comments__open'
              : 'fra-description__wrapper'
          }>
            <CommentsEditor odp={odp} match={match} saveDraft={saveDraft} i18n={i18n}
                            title={i18n.t('review.comments')}/>
          </div>
          <div className="fra-description__review-indicator-wrapper">
            {
              odp.odpId
                ? <ReviewIndicator
                  section='odp'
                  title={i18n.t('nationalDataPoint.nationalDataPoint')}
                  target={[`${odp.odpId}`, 'comments']}
                  countryIso={countryIso}/>
                : null
            }
          </div>
        </div>
      </div>

      <div className="odp__bottom-buttons">
        {
          odp.editStatus && odp.editStatus !== 'newDraft'
            ? <button
              className="btn btn-secondary"
              disabled={saveControlsDisabled()}
              onClick={() => cancelDraft(countryIso, odp.odpId, tab)}>
              {i18n.t('nationalDataPoint.discardChanges')}
            </button>
            : null
        }
        <button
          className="btn btn-primary"
          disabled={saveControlsDisabled()}
          onClick={() => markAsActual(countryIso, odp, tab)}>
          {i18n.t('nationalDataPoint.doneEditing')}
        </button>
        <div className="odp-v-divider"></div>
        <button
          className="btn btn-destructive"
          disabled={saveControlsDisabled()}
          onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
            ? remove(countryIso, odp.odpId, tab)
            : null
          }>
          {i18n.t('nationalDataPoint.delete')}
        </button>
      </div>
    </div>
  )
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
        this.props.odp &&
        <OriginalDataPoint
          years={years}
          copyDisabled={R.or(
            R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.odp)),
            R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
          {...this.props}/>
      }

    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const autoSaving = state.autoSave.status === 'saving'
  const odp = state.originalDataPoint.active
  const openThread = R.defaultTo({ target: [], section: '' }, R.path(['review', 'openThread'], state))
  const useOriginalDataPointsInFoc = !!R.path(['country', 'config', 'useOriginalDataPointsInFoc'], state)
  return { ...state.originalDataPoint, odp, autoSaving, openThread, i18n: state.user.i18n, useOriginalDataPointsInFoc }
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
