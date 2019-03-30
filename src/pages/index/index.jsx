import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './index.less'

export default class Index extends Component {
  static defaultProps = {
    center: {
      lat: 40.7143528,
      lng: -74.0059731
    },
    zoom: 10
  }

  handleMapApiLoad = map => {
    map.data.loadGeoJson('./nyc-zip-polygon.json')
    this.setDataStyle(map)
  }

  setDataStyle = map => {
    map.data.setStyle(feature => {
      const low = [5, 69, 54]
      const high = [151, 83, 34]
      const censusMin = 13000
      const censusMax = 10000

      // delta represents where the value sits between the min and max
      var delta =
        (parseInt(feature.getProperty('postalCode')) - censusMin) / (censusMax - censusMin)

      var color = []
      for (var i = 0; i < 3; i++) {
        // calculate an integer color based on the delta
        color[i] = (high[i] - low[i]) * delta + low[i]
      }

      var outlineWeight = 0.5,
        zIndex = 1
      if (feature.getProperty('state') === 'hover') {
        outlineWeight = zIndex = 2
      }

      return {
        strokeWeight: outlineWeight,
        strokeColor: '#fff',
        zIndex: zIndex,
        fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
        fillOpacity: 0.75
      }
    })
  }

  createMapOptions = map => {
    const mapStyle = [
      {
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }, { color: '#fcfcfc' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }, { color: '#bfd4ff' }]
      }
    ]
    return {
      styles: mapStyle
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCj84rcb1xl0PJWCDemv2-0Z-COMB8g22M'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          options={this.createMapOptions}
          onGoogleApiLoaded={({ map, maps }) => this.handleMapApiLoad(map, maps)}
        />
      </div>
    )
  }
}
