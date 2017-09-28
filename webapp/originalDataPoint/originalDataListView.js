import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchOdps } from './actions'

import { Link } from './../link'
import LoggedInPageTemplate from '../loggedInPageTemplate'

const ODPListing = ({countryIso, odps = [], i18n, userInfo}) => <div className="odp-list__container">
  <h1 className="title">{i18n.t('nationalDataPoint.nationalData')}</h1>
  <table className="odp-list__list-table">
    <thead>
    <tr className='odp-list__header-row'>
      <th>{i18n.t('nationalDataPoint.year')}</th>
      <th></th>
      <th>{i18n.t('nationalDataPoint.methods')}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {odps.length > 0
      ? odps.map(odp => <tr className='odp-list__list-row' key={odp.odpId}>
        <td className='odp-list__year-column'>{odp.year == 0 ? '-' : odp.year}</td>
        <td className='odp-list__notification-column'>
          {!odp.validationStatus.valid
            ? <div>
                <svg className='icon icon-red'>
                  <use xlinkHref='img/icons.svg#alert'/>
                </svg>
              </div>
            : null}
          {odp.issuesSummary.issueStatus === "opened"
            ? <div>
                <div className={`open-issues ${odp.issuesSummary.hasUnreadIssues ? 'unread-issues' :''}`}></div>
              </div>
            : null}
        </td>
        <td>-</td>
        <td className='odp-list__edit-column'>
          <Link className="link" to={`/country/${countryIso}/odp/${odp.odpId}`}>
            {i18n.t('nationalDataPoint.edit')}
          </Link>
        </td>
      </tr>)
    : <tr className="odp-list__list-row">
        <td className="odp_list__empty-column" colSpan="4">{i18n.t('nationalDataPoint.noNationalDataAdded')}</td>
      </tr>}
    </tbody>
  </table>
  <Link className="btn btn-primary" to={`/country/${countryIso}/odp`}>
    <svg className="icon icon-sub icon-white">
      <use xlinkHref="img/icons.svg#small-add"/>
    </svg>
    {i18n.t('nationalDataPoint.addNationalDataPoint')}
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
    return <LoggedInPageTemplate>
      <ODPListing countryIso={this.props.match.params.countryIso} {...this.props} />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  ...state.originalDataPoint,
  i18n: state.user.i18n,
  userInfo: state.user.userInfo
})

export default connect(mapStateToProps, {fetchOdps})(DataFetchingComponent)
