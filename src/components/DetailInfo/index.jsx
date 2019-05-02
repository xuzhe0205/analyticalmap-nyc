import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCityInfo } from '../../redux/action/cityInfo'
import './index.less'
import peopleImg from './images/people.png'
import econImg from './images/econ.png'
import houseImg from './images/house.png'
import eduImg from './images/Education.png'

class DetailInfo extends Component {
  
  componentWillMount() {
    const { geoid, getCityInfo } = this.props
    getCityInfo(geoid)

  }
  render() {
    
    const { cityInfo } = this.props
    console.log('yoyoyo',cityInfo);
    if (cityInfo && cityInfo.length === 0) {
      return <div className="hasNoInfo">No information about this area</div>
    }
    const peoKey = [
      'total_population',
      'percent_of_state_population',
      'dependency_ratio',
      'percent_foreign_born',
      'percent_under_18',
      'percent_over_65'
    ]
    const econKey = [
      'percent_living_in_poverty',
      'median_household_income',
      'mean_household_income'
    ]
    const houseKey = ['total_housing_units', 'median_rent', 'homeownership_rate']
    const eduKey = ['percent_high_school_graduation', 'percent_higher_education_degree']
    
    const formatter = key => {
      let val = cityInfo[0][key]
      if (key === 'percent_of_state_population') {
        val *= 100
      }
      val = Number(val).toFixed(1)
      if (key.startsWith('percent')) {
        val = val + '%'
      }
      const dKey = key.replace(/_/g, ' ').toUpperCase()
      return {
        name: dKey,
        val
      }
    }
    
    const peopleArr = peoKey.map(key => formatter(key))
    
    const econArr = econKey.map(key => formatter(key))
    const houseArr = houseKey.map(key => formatter(key))
    const eduArr = eduKey.map(key => formatter(key))

    const getBgColor = index => {
      const bgColorArray = ['#67c23a', '#409eff', '#e6a23c']
      return bgColorArray[(index + 1) % 3]
    }

    const ItemLog = ({ imgUrl, title }) => (
      <div className="title-wrap">
        <img src={imgUrl} width="34px" height="34px" alt="Item Logo" />
        <h2>{title}</h2>
      </div>
    )
    const ItemList = ({ dataList }) => (
      <div className="data-row">
        {dataList.map((data, index) => {
          const thirdMargin = (index + 1) % 3 === 0 ? 0 : '5%'
          return (
            <div
              key={index}
              className="data-item"
              style={{ backgroundColor: getBgColor(index), marginRight: thirdMargin }}
            >
              <div className="title">{data.name}</div>
              <div className="content">{data.val}</div>
            </div>
          )
        })}
      </div>
    )

    return (
      <div className="detail-container">
        <ItemLog imgUrl={peopleImg} title={'People'} />
        <ItemList dataList={peopleArr} />

        <ItemLog imgUrl={econImg} title={'Economics'} />
        <ItemList dataList={econArr} />

        <ItemLog imgUrl={houseImg} title={'Housing'} />
        <ItemList dataList={houseArr} />

        <ItemLog imgUrl={eduImg} title={'Education'} />
        <ItemList dataList={eduArr} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cityInfo: state.cityInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCityInfo }, dispatch)
}

export default connect(
  
  mapStateToProps,
  mapDispatchToProps
)(DetailInfo)
