import React from 'react'
import PropTypes from 'prop-types'
import CommentableDescription from '@webapp/components/description/commentableDescription'
import { connect } from 'react-redux'
import * as UserState from '@webapp/user/userState'

const GeneralComments = props => {
  return <div className="fra-description__container">
    <CommentableDescription
      title={props.i18n.t('description.generalCommentsTitle')}
      name="generalComments"
      {...props}
    />
  </div>
}

GeneralComments.propTypes = {
  countryIso: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({i18n: UserState.getI18n(state)})

export default connect(mapStateToProps, {})(GeneralComments)
