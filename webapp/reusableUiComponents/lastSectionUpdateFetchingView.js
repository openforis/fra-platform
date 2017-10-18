import React from 'react'
import assert from 'assert'

export default class LastSectionUpdateFetchingView extends React.Component  {
  constructor(props, section) {
    super(props)
    this.section = section
    assert(this.props.match, 'LastSectionUpdateFetchingView needs match passed as prop')
  }

  componentDidMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.section)
  }
}
