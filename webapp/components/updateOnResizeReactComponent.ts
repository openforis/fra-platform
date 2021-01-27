import React from 'react'

class UpdateOnResizeReactComponent extends React.Component {
  resizeListener: any

  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()
    this.resizeListener = () => this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener, true)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener, true)
  }
}

export default UpdateOnResizeReactComponent
