import { combineReducers } from 'redux'
import cityInfoReducer from './reducer/cityInfo-reducer'
import queryInfoReducer from './reducer/queryInfo-reducer'
import weatherInfoReducer from './reducer/weatherInfo-reducer'

const allReducers = {
  weatherInfo: weatherInfoReducer,
  cityInfo: cityInfoReducer,
  queryInfo: queryInfoReducer
}

const rootReducers = combineReducers(allReducers)

export default rootReducers
