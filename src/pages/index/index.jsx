import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './index.less'
import { mapStyle } from '../../utils/mapStyle'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setQueryInfo } from '../../redux/action/queryInfo'

export class Index extends Component {
  constructor(props) {
    super(props)
    this.infoWindow = null
    this.map = null
    this.maps = null
    this.dataLayer = null
    this.apiKey = 'AIzaSyCj84rcb1xl0PJWCDemv2-0Z-COMB8g22M'
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
    this.initDataLayer()
    this.setDataStyle()
    this.dataLayer.addListener('mouseover', this.onMouseInRegion)
    this.dataLayer.addListener('mouseout', this.onMouseOutRegion)
    this.dataLayer.addListener('click', this.onRegionClick)
  }

  initDataLayer() {
    this.dataLayer = new this.maps.Data({ map: this.map })
    this.dataLayer.loadGeoJson('./nyc_area.json')
  }

  setDataStyle = () => {
    this.dataLayer.setStyle(feature => {
      const low = [5, 69, 54]
      const high = [151, 83, 34]
      const color = []
      for (let i = 0; i < 3; i++) {
        color[i] = (high[i] - low[i]) * Math.random() + low[i]
      }

      let outlineWeight = 0.5,
        zIndex = 1

      return {
        strokeWeight: outlineWeight,
        strokeColor: '#fff',
        zIndex: zIndex,
        fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
        fillOpacity: 0.75
      }
    })
  }

  fetchZipCode(latLng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${
      this.apiKey
    }`
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            // get zipCode
            const address = data.results[1].address_components
            const zipObj = address.filter(a => a.types[0] === 'postal_code')
            const zipCode = zipObj.length > 0 ? zipObj[0].long_name : 'none info'
            resolve(zipCode)
          } else {
            resolve('none info')
          }
        })
        .catch(e => resolve('none info'))
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
    // get cityName
    const name = feature.getProperty('NTAName')

    const showInfoWindow = zipCode => {
      // set infoWindow content
      const html = this.createPropertyHtml([
        { key: 'NAME: ', value: name },
        { key: 'ZIP CODE: ', value: zipCode }
      ])
      this.infoWindow.setContent(html)
      // show infoWindow
      this.infoWindow.setPosition(e.latLng)
      const pixelOffset = new this.maps.Size(0, -4)
      this.infoWindow.setOptions({ pixelOffset })
      this.infoWindow.open(this.map)

      const geoid = feature.getProperty('geoid')
      // set the queryInfo
      this.props.setQueryInfo(zipCode, geoid, { lat: e.latLng.lat(), lng: e.latLng.lng() }, name)
    }

    const lastZip = feature.getProperty('zipCode')
    if (lastZip && lastZip !== 'none info') {
      showInfoWindow(lastZip)
    } else {
      // get zipCode
      this.fetchZipCode(e.latLng.toUrlValue()).then(zipCode => {
        showInfoWindow(zipCode)
        feature.setProperty('zipCode', zipCode)
      })
    }
  }

  createPropertyHtml = arr => {
    return arr
      .map(obj => {
        return obj.key === 'ZIP CODE: '
          ? `<div><strong>${obj.key}</strong> <a href='/#/detail'>${obj.value}</a></div>`
          : `<div><strong>${obj.key}</strong> <span>${obj.value}</span></div>`
      })
      .join('')
  }

  render() {
    return (
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: this.apiKey
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

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setQueryInfo }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
