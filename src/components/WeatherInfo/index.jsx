import React, { Component } from 'react'
import './index.less'

export default class WeatherInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: '',
      info: {
        feelsLick: '15°C',
        wind: '1.0 m/s',
        humidity: '50%',
        pressure: '1029 hPa'
      }
    }
  }
  render() {
    setInterval(() => {
      const now = new Date()
      const date = now.toLocaleDateString()
      const time = now.toLocaleTimeString()
      this.setState({ time: `${date}  ${time}` })
    }, 1000)

    return (
      <div className="weather-container">
        <div className="title">
          <div className="mainTitle">New York City</div>
          <div className="subTitle">clear sky</div>
        </div>
        <div>
          {Object.keys(this.state.info).map(key => {
            return (
              <div>
                <span>{key}</span>
                <strong>{this.state.info[key]}</strong>
              </div>
            )
          })}
        </div>
        <div className="icon">
          <img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01d.png" />
          <span>{this.state.time}</span>
        </div>
      </div>
    )
  }
}
