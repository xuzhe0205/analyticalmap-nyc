import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import WeatherInfo from '../../components/WeatherInfo'
import './index.less'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wetherInfo: { desc: 'aaa' }
    }
  }
  componentDidMount() {
    this.getWeatherData()
  }

  getWeatherData() {
    const zip = 11372
    const key = '4f0d6dac40736d29dffa28c14393094f '
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${key}`
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        const data = {
          desc: resp.weather[0].description,
          icon:
            'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/' +
            resp.weather[0].icon,
          feelsLick: resp.main.temp,
          wind: resp.wind.speed,
          humidity: resp.main.humidity,
          pressure: resp.main.pressure
        }
        this.setState({ wetherInfo: data })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div className="detail">
        <WeatherInfo />
        <div className="smallMap">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCj84rcb1xl0PJWCDemv2-0Z-COMB8g22M'
            }}
            defaultCenter={{ lat: 40.7143528, lng: -74.0059731 }}
            defaultZoom={10}
          />
        </div>
      </div>
    )
  }
}
