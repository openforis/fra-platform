import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchOdps } from './actions'

import { Link } from './../reusableUiComponents/link'
import LoggedInPageTemplate from '../loggedInPageTemplate'

const TableRow = ({odp, i18n, countryIso}) => {
  const odpUrl = `/country/${countryIso}/odp/${odp.odpId}`
  const navigateTo = (url) => window.location.href = '#' + url

  return <tr className="odp-list__link-row" onClick={() => navigateTo(odpUrl)}>
    <td className="odp-list__year-column">
      {odp.year == 0 ? '–' : odp.year}
    </td>
    <td className="odp-list__editstatus-column">
      {
        odp.editStatus !== 'noChanges'
          ? <svg className="icon"><use xlinkHref="img/icons.svg#pencil"/></svg>
          : null
      }
    </td>
    <td className="odp-list__method-column">
      {
        odp.dataSourceMethods
          ? R.pipe(
              R.map(key => i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${key}`)),
              R.join(', ')
            )(odp.dataSourceMethods.sort())
          : null
      }
    </td>
    <td className="odp-list__notification-column">
      <div className="odp-list__notification-container">
        {
          !odp.validationStatus.valid
            ? <svg className="icon icon-red">
                <use xlinkHref="img/icons.svg#alert"/>
              </svg>
            : null
        }
        {
          odp.issuesSummary.issueStatus === "opened"
            ? <div className={`open-issues ${odp.issuesSummary.hasUnreadIssues ? 'unread-issues' :''}`}></div>
            : null
        }
      </div>
    </td>
    <td className="odp-list__edit-column">
      <Link className="link" to={odpUrl}>
        {i18n.t('nationalDataPoint.edit')}
      </Link>
    </td>
  </tr>
}

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
        <th className="odp-list__header-cell" colSpan="2">{i18n.t('nationalDataPoint.referenceYear')}</th>
        <th className="odp-list__header-cell">{i18n.t('nationalDataPoint.methods')}</th>
        <th className="odp-list__header-cell" colSpan="2"></th>
      </tr>
      </thead>
      <tbody>
      {
        odps.length > 0
        ? R.map(odp =>
          <TableRow key={odp.odpId} odp={odp} i18n={i18n} countryIso={countryIso} />
          , odps)
        : <tr>
            <td className="odp-list__empty-column" colSpan="5">
              {i18n.t('nationalDataPoint.noNationalDataAdded')}
            </td>
          </tr>
      }
      </tbody>
      <tfoot>
        <tr>
          <td className="odp-list__footnotes" colSpan="5">
            <svg className="icon icon-sub icon-margin"><use xlinkHref="img/icons.svg#pencil"/></svg>
            {i18n.t('nationalDataPoint.modifiedExplanation')}
          </td>
        </tr>
      </tfoot>
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
