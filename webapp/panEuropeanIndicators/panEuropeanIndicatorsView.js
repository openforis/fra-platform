import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import ReviewIndicator from '../review/reviewIndicator'

import { fetchLastSectionUpdateTimestamp } from '../audit/actions'

class PanEuropeanIndicatorsView extends React.Component {

  render () {
    const {i18n, countryIso} = this.props
    return <LoggedInPageTemplate>
      <div className="fra-view__content">

        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('panEuropeanIndicators.panEuropeanIndicators')}</h1>
        </div>

        <div className="pan-european__container">
          <div className="pan-european__buttons">
            <button className="btn btn-primary">{i18n.t('panEuropeanIndicators.uploadQuestionnaire')}</button>
            <button className="btn btn-primary">{i18n.t('panEuropeanIndicators.downloadQuestionnaire')}</button>
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

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(PanEuropeanIndicatorsView)
