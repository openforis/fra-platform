import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as R from 'ramda'
import { fetchOdps, removeFromList } from './actions'
import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'

import * as AppState from '@webapp/app/appState'
import { UserState } from '@webapp/store/user'

const TableRow = ({odp, i18n, countryIso, removeFromList}) => {
  const odpUrl = `/country/${countryIso}/odp/extentOfForest/${odp.odpId}`
  const navigateTo = (url) => window.location.href = url

  return <tr className="odp-list__link-row">
    <td className="odp-list__year-cell" onClick={() => navigateTo(odpUrl)}>
      {odp.year ? odp.year : null}
      {
        odp.editStatus !== 'noChanges'
          ? <Icon className="icon-margin-left icon-sub" name="pencil"/>
          : null
      }
    </td>
    <td className="odp-list__method-cell" onClick={() => navigateTo(odpUrl)}>
      {
        odp.dataSourceMethods
          ? R.pipe(
              R.map(key => i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${key}`)),
              R.join(', ')
            )(odp.dataSourceMethods.sort())
          : null
      }
    </td>
    <td className="odp-list__notification-cell" onClick={() => navigateTo(odpUrl)}>
      <div className="odp-list__notification-container">
        {
          !odp.validationStatus.valid
            ? <Icon className="icon-red" name="alert"/>
            : null
        }
        {
          odp.issuesSummary.issueStatus === "opened"
            ? <div className={`open-issues ${odp.issuesSummary.hasUnreadIssues ? 'unread-issues' :''}`}></div>
            : null
        }
      </div>
    </td>
    <td className="odp-list__edit-cell">
      <Link className="btn-s btn-link" to={odpUrl}>
        {i18n.t('nationalDataPoint.edit')}
      </Link>
      <button
        className="btn-s btn-link-destructive"
        onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
          ? removeFromList(countryIso, odp.odpId)
          : null
      }>
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </td>
  </tr>
}

const ODPListing = ({countryIso, odps = [], i18n, userInfo, removeFromList}) => {
  return <div className="app-view__content">
    <div className="app-view__page-header">
      <h1 className="title">{i18n.t('nationalDataPoint.nationalData')}</h1>
      <Link className="btn btn-primary" to={`/country/${countryIso}/odp/extentOfForest`}>
        <Icon className="icon-sub icon-white" name="small-add"/>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <table className="odp-list__list-table">
      <thead>
      <tr>
        <th className="odp-list__header-cell odp-list__year-column">{i18n.t('nationalDataPoint.referenceYear')}</th>
        <th className="odp-list__header-cell">{i18n.t('nationalDataPoint.methods')}</th>
        <th className="odp-list__header-cell odp-list__notification-column"/>
        <th className="odp-list__header-cell odp-list__edit-column"/>
      </tr>
      </thead>
      <tbody>
      {
        odps.length > 0
        ? R.map(odp =>
          <TableRow key={odp.odpId} odp={odp} i18n={i18n} countryIso={countryIso} removeFromList={removeFromList} />
          , odps)
        : <tr>
            <td className="odp-list__empty-cell" colSpan="4">
              {i18n.t('nationalDataPoint.noNationalDataAdded')}
            </td>
          </tr>
      }
      </tbody>
      <tfoot>
        <tr>
          <td className="odp-list__footnotes" colSpan="4">
            <Icon className="icon-margin-right icon-sub" name="pencil"/>
            {i18n.t('nationalDataPoint.modifiedExplanation')}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
}

class DataFetchingComponent extends React.Component {
  componentDidMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCountryIso = this.props.match.params.countryIso
    const previousCountryIso = prevProps.match.params.countryIso
    if (!R.equals(currentCountryIso, previousCountryIso))
      this.fetch(currentCountryIso)
  }

  fetch (countryIso) {
    this.props.fetchOdps(countryIso)
  }

  render () {
    return <ODPListing countryIso={this.props.match.params.countryIso} {...this.props} />
  }
}

const mapStateToProps = state => ({
  ...state.originalDataPoint,
  i18n: AppState.getI18n(state),
  userInfo: UserState.getUserInfo(state),
})

export default withRouter(connect(mapStateToProps, {fetchOdps, removeFromList})(DataFetchingComponent))
