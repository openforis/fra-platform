import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {postComment, retrieveComments} from './actions'

import './style.less'
const ReviewPanel = ({active}) => <div className={`review-panel ${active ? 'active' : 'hidden'}`}>hello</div>

const mapSateToProps = R.pipe(R.prop('review'), R.defaultTo({}))

export default connect(mapSateToProps, {postComment, retrieveComments})(ReviewPanel)

