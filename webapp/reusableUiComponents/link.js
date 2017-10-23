import React from 'react'
import * as R from 'ramda'

import { connect } from 'react-redux'

const link = ({to, ...props}) => <a href={`#${to}`} {...props} />

export const Link = connect(R.empty, {})(link)
