export const googleApiKey = {__GOOGLE_API__}.__GOOGLE_API__

export const fusionTableUrl = 'https://www.googleapis.com/fusiontables/v2/query'
export const fusionTableTId = '15_cKgOA-AkdD6EiO-QW9JXM8_1-dPuuj1dqFr17F'

export const getBoundsFromGeometryCollections = geometryCollections => {
  const bounds = new google.maps.LatLngBounds()

  const addBounds = function (geometry) {
    geometry.coordinates.forEach(latLngs => {
      latLngs.forEach(latLng => {
        const gLatLng = new google.maps.LatLng(Number(latLng[1]), Number(latLng[0]))
        bounds.extend(gLatLng)
      })
    })
  }

  geometryCollections.forEach(geometryCollection => {
      if (geometryCollection.geometries)
        geometryCollection.geometries.forEach(geometry => addBounds(geometry))
      else if (geometryCollection.geometry)
        addBounds(geometryCollection.geometry)
    }
  )

  return bounds
}

export const mapStyle = [
  {
    'stylers': [{'visibility': 'simplified'}]
  }
  , {
    'stylers': [{'color': '#e6e6e6'}]
    // "stylers": [ { "color": "#008f9c" } ]
  }
  , {
    'featureType': 'water',
    'stylers': [{'color': '#f5f5f5'}, {'lightness': 4}
    ]
  }
  , {
    'elementType': 'labels.text.fill'
    , 'stylers': [{'visibility': 'off'}, {'lightness': 25}]
  }
]
