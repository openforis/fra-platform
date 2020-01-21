import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as R from 'ramda'

import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'
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
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import { isAssessmentLocked } from '@webapp/utils/assessmentAccess'

const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]

const OriginalDataPoint = (props) => {

  const {
    match, i18n, odp,
    saveDraft, markAsActual, remove, cancelDraft, openThread,
    autoSaving, canEditData
  } = props
  const { countryIso, tab } = match.params
  const history = useHistory()
  const saveControlsDisabled = () => !odp.odpId || autoSaving
  const yearValidationStatusClass = () => odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], odp.reservedYears)

  const handleSave = () => {
    markAsActual(countryIso, odp, history)
  }  

  return (
    <div className="fra-view__content">
      <div className="fra-view__page-header">
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        {
          canEditData && odp.editStatus && odp.editStatus !== 'newDraft'
            ? <button
              className="btn btn-secondary margin-right"
              disabled={saveControlsDisabled()}
              onClick={() => cancelDraft(countryIso, odp.odpId, tab)}>
              {i18n.t('nationalDataPoint.discardChanges')}
            </button>
            : null
        }
        {
          canEditData &&
          <button
            className="btn btn-primary"
            disabled={saveControlsDisabled()}
            onClick={handleSave}>
            {i18n.t('nationalDataPoint.doneEditing')}
          </button>
        }
        {
          canEditData &&
          <div className="odp-v-divider"></div>
        }
        {
          canEditData &&
          <button
            className="btn btn-destructive"
            disabled={saveControlsDisabled()}
            onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
              ? remove(countryIso, odp.odpId, tab)
              : null
            }>
            {i18n.t('nationalDataPoint.delete')}
          </button>
        }
      </div>

      <div className="odp__section">
        <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
        <div className={`odp__year-selection ${yearValidationStatusClass()}`}>
          <select
            disabled={!canEditData}
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
            <CommentsEditor
              canEditData={canEditData}
              i18n={i18n}
              match={match}
              odp={odp}
              saveDraft={saveDraft}
              title={i18n.t('review.comments')}/>
          </div>
          <div className="fra-description__review-indicator-wrapper">
            {
              odp.odpId && canEditData
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

      {
        canEditData &&
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
            onClick={handleSave}>
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
      }
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
    return <>
      {
        this.props.odp &&
        <OriginalDataPoint
          years={years}
          copyDisabled={R.or(
            R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.odp)),
            R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
          {...this.props}/>
      }
    </>
  }
}

const mapStateToProps = state => {
  const autoSaving = state.autoSave.status === 'saving'
  const odp = state.originalDataPoint.active
  const openThread = R.defaultTo({ target: [], section: '' }, R.path(['review', 'openThread'], state))
  const useOriginalDataPointsInFoc = !!R.path(['country', 'config', 'useOriginalDataPointsInFoc'], state)

  const locked = isAssessmentLocked(state, 'fra2020')
  const canEditData = R.path(['country', 'status', 'assessments', 'fra2020', 'canEditData'], state) && !locked

  return {
    ...state.originalDataPoint,
    canEditData,
    odp,
    autoSaving,
    openThread,
    i18n: state.user.i18n,
    useOriginalDataPointsInFoc
  }
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
