import React from 'react'
import * as R from 'ramda'

import { connect } from 'react-redux'

const removeRedundantPrefixIfExists = (link) => link.replace(/#\//gi, '')

const link = ({to, ...props}) => <a href={`#${removeRedundantPrefixIfExists(to)}`} {...props} />

export const Link = connect(R.empty, {})(link)
