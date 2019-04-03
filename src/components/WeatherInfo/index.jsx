import React, { Component } from 'react'
import './index.less'

export default class WeatherInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: '',
      detail: {
        feelsLick: '-',
        wind: '-',
        humidity: '-',
        pressure: '-'
      },
      desc: '',
      icon: ''
    }
  }

  getWeatherData() {
    const zip = this.props.zip
    const key = '4f0d6dac40736d29dffa28c14393094f'
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${key}`
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        const data = {
          feelsLick: resp.main.temp + '°C',
          wind: resp.wind.speed + ' m/s',
          humidity: resp.main.humidity + '%',
          pressure: resp.main.pressure + ' hPa'
        }
        const desc = resp.weather[0].description
        const icon = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
          resp.weather[0].icon
        }.png`
        this.setState({ detail: data, desc, icon })
      })
      .catch(e => {
        console.log(e)
      })
  }

  componentWillMount() {
    setInterval(() => {
      const now = new Date()
      const date = now.toLocaleDateString()
      const time = now.toLocaleTimeString()
      this.setState({ time: `${date}  ${time}` })
    }, 1000)

    this.getWeatherData()
  }

  render() {
    const { time, desc, icon, detail } = this.state
    return (
      <div className="weather-container">
        <div className="title">
          <div className="mainTitle">{this.props.name}</div>
          <div className="subTitle">{desc}</div>
          <div className="temperature">{detail.feelsLick}</div>
        </div>
        <div className="detail-weather">
          <div className="detail-title">Detail</div>
          {Object.keys(detail).map((key, index) => {
            return (
              <div key={index}>
                <span>{key}</span>
                <strong>{detail[key]}</strong>
              </div>
            )
          })}
        </div>
        <div className="icon">
          <img src={icon} />
          <span>{time}</span>
        </div>
      </div>
    )
  }
}
