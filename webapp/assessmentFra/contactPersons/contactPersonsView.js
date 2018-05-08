import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetchCollaboratorsCountryAccess, persistCollaboratorCountryAccess } from './actions'
import { isAdministrator, isNationalCorrespondent } from './../../../common/countryRole'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import CommentableDescription from '../../description/commentableDescription.js'
import MultiSelect from './collaboratorsTableMultiSelect'

const sectionName = 'contactPersons'

class ContactPersonsView extends React.Component {

  componentDidMount () {
    const countryIso = this.props.match.params.countryIso
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
    this.props.fetchCollaboratorsCountryAccess(countryIso)
  }

  render () {

    const {userInfo, i18n, match, collaborators, persistCollaboratorCountryAccess} = this.props
    const countryIso = match.params.countryIso

    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h2 className="headline">{i18n.t('contactPersons.reportPreparationAndContactPersons')}</h2>
        </div>

        <div className="collaborators-table__scroll-wrapper">
          <table className="fra-table">
            <thead>
            <tr>
              <th className="collaborators__collaborator-header-cell">{i18n.t('user.roles.collaborator')}</th>
              <th className="fra-table__header-cell">{i18n.t('contactPersons.tables')}</th>
            </tr>
            </thead>
            <tbody>
            {R.isEmpty(collaborators)
              ? <tr>
                <td className="fra-table__header-cell-left" colSpan="2">{i18n.t('userManagement.noUsers')}</td>
              </tr>
              : collaborators.map(collaborator =>
                <tr key={collaborator.userId}>
                  <td className="fra-table__category-cell">{collaborator.name}</td>
                  <td className="fra-table__cell-left">
                    <MultiSelect
                      i18n={i18n}
                      disabled={!(isAdministrator(userInfo) || isNationalCorrespondent(countryIso, userInfo))}
                      localizationPrefix="nationalDataPoint.dataSourceMethodsOptions"
                      values={collaborator.tables || undefined}
                      onChange={
                        (values) => {
                          persistCollaboratorCountryAccess(countryIso, R.assoc('tables', values, collaborator))
                        }
                      }
                    />
                  </td>
                </tr>
              )
            }

            </tbody>
          </table>
        </div>

        <hr/>

        <CommentableDescription
          section={sectionName}
          title={i18n.t('contactPersons.introductoryText')}
          name='introductoryText'
          countryIso={this.props.match.params.countryIso}
          template={i18n.t('contactPersons.introductoryTextSupport')}
        />
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  openCommentThread: state.review.openThread,
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  collaborators: state.contactPersons.collaborators || []
})

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchCollaboratorsCountryAccess,
  persistCollaboratorCountryAccess
})(ContactPersonsView)
