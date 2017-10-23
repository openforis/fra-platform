import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchOdps } from './actions'

import { Link } from './../reusableUiComponents/link'
import LoggedInPageTemplate from '../loggedInPageTemplate'

const ODPListing = ({countryIso, odps = [], i18n, userInfo}) => {
  return <div className="fra-view__content">
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('nationalDataPoint.nationalData')}</h1>
      <Link className="btn btn-primary" to={`/country/${countryIso}/odp`}>
        <svg className="icon icon-sub icon-white">
          <use xlinkHref="img/icons.svg#small-add"/>
        </svg>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <table className="odp-list__list-table">
      <thead>
      <tr>
        <th className="odp-list__header-cell" colSpan="2">{i18n.t('nationalDataPoint.year')}</th>
        <th className="odp-list__header-cell">{i18n.t('nationalDataPoint.methods')}</th>
        <th className="odp-list__header-cell"></th>
        <th className="odp-list__header-cell"></th>
      </tr>
      </thead>
      <tbody>
      {odps.length > 0
        ? odps.map(odp => <tr className="odp-list__list-row" key={odp.odpId}>
          <td className="odp-list__cell odp-list__year-column">
            {odp.year == 0 ? '–' : odp.year}
          </td>
          <td className="odp-list__cell odp-list__method-column">
            {odp.dataSourceMethods
              ? R.join(', ',
                  R.map(key => i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${key}`), odp.dataSourceMethods)
                )
              : null
            }
          </td>
          <td className="odp-list__cell odp-list__edit-status-column">
            {odp.editStatus !== 'noChanges' ? i18n.t(`nationalDataPoint.${odp.editStatus}`) : null}
          </td>
          <td className="odp-list__cell">
            <div className="odp-list__notification-column">
              {!odp.validationStatus.valid
                ? <svg className="icon icon-red">
                    <use xlinkHref="img/icons.svg#alert"/>
                  </svg>
                : null}
              {odp.issuesSummary.issueStatus === "opened"
                ? <div className={`open-issues ${odp.issuesSummary.hasUnreadIssues ? 'unread-issues' :''}`}></div>
                : null}
            </div>
          </td>
          <td className="odp-list__cell odp-list__edit-column">
            <Link className="link" to={`/country/${countryIso}/odp/${odp.odpId}`}>
              {i18n.t('nationalDataPoint.edit')}
            </Link>
          </td>
        </tr>)
      : <tr className="odp-list__list-row">
          <td className="odp-list__cell odp_list__empty-column" colSpan="4">{i18n.t('nationalDataPoint.noNationalDataAdded')}</td>
        </tr>}
      </tbody>
    </table>
  </div>
}

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
