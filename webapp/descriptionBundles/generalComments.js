import React from 'react'
import PropTypes from 'prop-types'
import CommentableDescription from '@webapp/description/commentableDescription'
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(GeneralComments)
