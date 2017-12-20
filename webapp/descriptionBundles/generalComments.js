import React from 'react'
import CommentableDescription from '../description/commentableDescription'
import { connect } from 'react-redux'
import assert from 'assert'

const GeneralComments = props => {
  assert(props.countryIso && props.section, 'countryIso or section missing from GeneralComments properties')
  return <div className="fra-description__container">
    <CommentableDescription
      title={props.i18n.t('description.generalCommentsTitle')}
      name="generalComments"
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(GeneralComments)
