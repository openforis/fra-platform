import React from 'react'
import scriptLoader from 'react-async-script-loader'

import MapView from './mapView'

import { googleApiKey } from './map'

class MapViewContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {apiLoaded: false}
  }

  componentDidUpdate(prevProps, prevState) {
    const {isScriptLoaded, isScriptLoadSucceed} = this.props
    if (isScriptLoaded && !prevProps.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({apiLoaded: true})
      }
    }
  }

  render () {
    return <div className="landing__page-container-item">
      {
        this.state.apiLoaded
          ? <MapView {...this.props}/>
          : <span style={{fontStyle: 'italic'}}>{this.props.i18n.t('landing.overview.loadingMap')}</span>
      }
    </div>
  }

}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`]
)(MapViewContainer)
