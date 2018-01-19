import React from 'react'
import scriptLoader from 'react-async-script-loader'

import MapView from './mapView'

import { googleApiKey } from './map'

class MapViewContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {apiLoaded: false}
  }

  componentWillReceiveProps (nextProps) {
    const {isScriptLoaded, isScriptLoadSucceed} = nextProps
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({apiLoaded: true})
      }
    }
  }

  render () {
    return <div className="landing__page-container-item">
      {this.state.apiLoaded
        ? <MapView {...this.props}/>
        : <span>...loading map</span>}
    </div>
  }

}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`]
)(MapViewContainer)
