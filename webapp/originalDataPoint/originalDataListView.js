import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchOdps } from './actions'

import { Link } from './../link'
import LoggedInPageTemplate from '../loggedInPageTemplate'

const ODPListing = ({countryIso, odps = []}) => <div>
  <table>
    <thead>
    <tr>
      <th>Year</th>
      <th>Methods</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    { odps.map(odp => <tr>
      <td>{odp.year}</td>
      <td>-</td>
      <td><Link to={`/country/${countryIso}/odp/${odp.odpId}`}>Edit</Link></td>
    </tr> )}
    </tbody>
  </table>
  <Link className="btn btn-primary" to={`/country/${countryIso}/odp`}>
    <svg className="icon icon-middle icon-white">
      <use xlinkHref="img/icon.svg#icon-small-add"/>
    </svg>
    Add national data point
  </Link>
</div>

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
    console.log('list props', this.props)
    return <LoggedInPageTemplate>
      <ODPListing countryIso={this.props.match.params.countryIso} {...this.props} />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return R.merge({}, state.originalDataPoint)
}

export default connect(mapStateToProps, {fetchOdps})(DataFetchingComponent)
