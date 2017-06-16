import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import {fetchOdps } from './actions'

import LoggedInPageTemplate from '../loggedInPageTemplate'

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetchOdps(countryIso)
  }

  render () {
    return <LoggedInPageTemplate>
      <div>hello</div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => R.merge(state.nationalDataEntry)

export default connect(mapStateToProps, {fetchOdps})(DataFetchingComponent)
