import './style.less'

import React from 'react'
import { connect } from 'react-redux'

import { loadCountryShape } from '../../actions'
import { fusionTableTId, mapStyle } from './map'

class Map extends React.Component {

  getCountryIso () {
    return this.props.match.params.countryIso
  }

  addCountry () {
    if (this.fusionTableLayer)
      this.fusionTableLayer.setMap(null)

    const fusionTableOptions = {
      suppressInfoWindows: true,
      query: {
        from: fusionTableTId,
        select: 'geometry',
        where: `'ISO'='${this.getCountryIso()}';`
      },
      styles: [{
        polygonOptions: {
          fillColor: '#008f9c',
          fillOpacity: 0.8,
          strokeColor: '#008f9c',
          strokeOpacity: 1,
          strokeWeight: 1
        }
      }]
    }

    this.fusionTableLayer = new google.maps.FusionTablesLayer(fusionTableOptions)
    this.fusionTableLayer.setMap(this.map)
  }

  loadCountryShape (countryIso) {
    this.props.loadCountryShape(countryIso)
  }

  componentDidMount () {
    const mapOptions = {
      zoom: 2,
      minZoom: 2,
      maxZoom: 15,
      center: new google.maps.LatLng(20.8892506, 14.2342302),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      backgroundColor: '#e6e6e6',
      gestureHandling: 'greedy',
      // draggable: false
    }

    this.map = new google.maps.Map(this.refs.map, mapOptions)
    this.map.setOptions({styles: mapStyle})

    this.loadCountryShape(this.getCountryIso())
  }

  componentWillReceiveProps (nextProps) {
    const nextCountryIso = nextProps.match.params.countryIso
    if (this.getCountryIso() !== nextCountryIso) {
      this.loadCountryShape(nextCountryIso)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const {countryLatLngBounds} = this.props

    if (countryLatLngBounds) {
      this.map.panToBounds(countryLatLngBounds)
      this.map.fitBounds(countryLatLngBounds)
      this.addCountry()
    }
  }

  render () {
    return <div ref="map" className="landing__overview-map"></div>
  }
}

const mapStateToProps = state => ({...state.landing})

export default connect(mapStateToProps, {loadCountryShape})(Map)

