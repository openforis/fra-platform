import React from 'react'

type Props = any

class UpdateOnResizeReactComponent extends React.Component<Props, {}> {
  props: Props
  resizeListener: any

  constructor(props: Props) {
    super(props)
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
