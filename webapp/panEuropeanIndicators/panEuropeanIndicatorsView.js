import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import ReviewIndicator from '../review/reviewIndicator'
import Icon from '../reusableUiComponents/icon'

import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import { uploadQuestionnaire } from './actions'

class PanEuropeanIndicatorsView extends React.Component {

  onFileSelected () {
    this.props.uploadQuestionnaire(this.props.countryIso, this.refs.inputFile.files[0])
  }

  render () {
    const {i18n, countryIso} = this.props
    return <LoggedInPageTemplate>
      <div className="fra-view__content">

        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('panEuropeanIndicators.panEuropeanIndicators')}</h1>
        </div>

        <div className="pan-european__container">
          <div className="pan-european__buttons">
            <input ref="inputFile" type="file" style={{display: 'none'}} onChange={() => this.onFileSelected()}/>
            <button className="btn btn-primary"
                    onClick={() => this.refs.inputFile.dispatchEvent(new MouseEvent('click'))}>
              <Icon className="icon-sub icon-white" name="hit-down"/>
              {i18n.t('panEuropeanIndicators.uploadQuestionnaire')}
            </button>
            <button className="btn btn-primary">
              <Icon className="icon-sub icon-white" name="hit-down"/>
              {i18n.t('panEuropeanIndicators.downloadQuestionnaire')}
            </button>
          </div>
          <div>
            <ReviewIndicator
              section={'panEuropeanIndicators'}
              title={i18n.t('panEuropeanIndicators.panEuropeanIndicators')}
              target={['uploadQuestionnaire']}
              countryIso={countryIso}/>
          </div>
        </div>

      </div>
    </LoggedInPageTemplate>
  }

}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  countryIso: props.match.params.countryIso
})

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  uploadQuestionnaire
})(PanEuropeanIndicatorsView)
