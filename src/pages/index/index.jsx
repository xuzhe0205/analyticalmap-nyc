import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './index.less'
import { mapStyle } from '../../utils/mapStyle'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.infoWindow = null
    this.map = null
    this.maps = null
  }
  static defaultProps = {
    center: {
      lat: 40.7143528,
      lng: -74.0059731
    },
    zoom: 10
  }

  handleMapApiLoad = (map, maps) => {
    this.map = map
    this.maps = maps
    this.infoWindow = new maps.InfoWindow({})
    map.data.loadGeoJson('./nyc-zip-polygon.json')
    this.setDataStyle()
    map.data.addListener('mouseover', this.onMouseInRegion)
    map.data.addListener('mouseout', this.onMouseOutRegion)
    map.data.addListener('click', this.onRegionClick)
  }

  setDataStyle = () => {
    this.map.data.setStyle(feature => {
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

  onMouseInRegion = e => {
    e.feature.setProperty('state', 'hover')
  }

  onMouseOutRegion = e => {
    e.feature.setProperty('state', 'normal')
  }

  onRegionClick = e => {
    const feature = e.feature
    const name = feature.getProperty('PO_NAME')
    const zipCode = feature.getProperty('postalCode')
    const html = this.createPropertyHtml([
      { key: 'NAME: ', value: name },
      { key: 'ZIP CODE: ', value: zipCode }
    ])
    this.infoWindow.setContent(html)
    this.infoWindow.setPosition(e.latLng)
    const pixelOffset = new this.maps.Size(0, -4)
    this.infoWindow.setOptions({ pixelOffset })
    this.infoWindow.open(this.map)
  }

  createPropertyHtml = arr => {
    return arr
      .map(obj => {
        return `<div><strong>${obj.key}</strong> <span>${obj.value}</span></div>`
      })
      .join('')
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
          options={{ styles: mapStyle }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleMapApiLoad(map, maps)}
        />
      </div>
    )
  }
}
