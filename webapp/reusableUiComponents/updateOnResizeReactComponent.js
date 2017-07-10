import React from 'react'

class UpdateOnResizeReactComponent extends React.Component {
  constructor () {
    super()
    this.resizeListener = () => this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeListener, true)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeListener, true)
  }

  componentWillMount () {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }
}

export default UpdateOnResizeReactComponent
