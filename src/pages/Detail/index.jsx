import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import WeatherInfo from '../../components/WeatherInfo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCityInfo } from '../../redux/action/cityInfo'
import locationImg from './images/location.png'
import './index.less'

class Detail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { zip, geoid, pos, name } = this.props.queryInfo
    const { lat, lng } = pos

    const Mark = ({ imgUrl }) => <img src={imgUrl} width="20px" height="20px" />
    return (
      <div className="detail">
        <WeatherInfo zip={zip} name={name} />
        <div className="smallMap">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCj84rcb1xl0PJWCDemv2-0Z-COMB8g22M'
            }}
            defaultCenter={{ lat, lng }}
            defaultZoom={12}
          >
            <Mark lat={lat} lng={lng} imgUrl={locationImg} />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    queryInfo: state.queryInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCityInfo }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
