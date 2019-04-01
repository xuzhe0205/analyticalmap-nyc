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

  initDataLayer() {
    this.dataLayer = new this.maps.Data({ map: this.map })
    this.dataLayer.loadGeoJson('./nyc_area.json')
  }

  handleMapApiLoad = (map,maps) => {
    this.map = map
    this.maps = maps
    this.infoWindow = new maps.InfoWindow({})
    this.initDataLayer()
    map.data.loadGeoJson('./nyc-zip-polygon.json')
    this.setDataStyle()
    this.dataLayer.addListener('click', this.onRegionClick)
  }


  onRegionClick = e => {
    console.log('???!!!!')
    const feature = e.feature

    const getZipUrl = (latLng, key) => {
      return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${key}`
    }
    // get zipCode
    fetch(getZipUrl(e.latLng.toUrlValue(), 'AIzaSyCj84rcb1xl0PJWCDemv2-0Z-COMB8g22M'))
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // get zipCode
          const address = data.results[1].address_components
          const zipObj = address.filter(a => a.types[0] === 'postal_code')
          const zipCode = zipObj.length > 0 ? zipObj[0].long_name : 'none info'
          // get cityName
          const name = feature.getProperty('NTAName')
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
          this.props.setQueryInfo(zipCode, geoid, e.latLng)
        }
      })
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
