import './style.less'

import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'

import CommentableDescription from '@webapp/app/assessment/components/description/commentableDescription.js'

import * as AppState from '@webapp/app/appState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

const sectionName = 'contactPersons'

const ContactPersonsView = props => {
  const { fetchLastSectionUpdateTimestamp, i18n, isEditDataDisabled } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  return <div className="app-view__content">
    <CommentableDescription
      section={sectionName}
      title={i18n.t('contactPersons.introductoryText')}
      name='introductoryText'
      template={i18n.t('contactPersons.introductoryTextSupport')}
      disabled={isEditDataDisabled}
    />
  </div>
}

const mapStateToProps = (state) => ({
  openCommentThread: ReviewState.getOpenThreadTarget(state),
  i18n: AppState.getI18n(state),
  isEditDataDisabled: FraState.isSectionEditDisabled(sectionName)(state),
})

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp })(ContactPersonsView)
