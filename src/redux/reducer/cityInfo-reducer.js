import cityInfoData from '../cityInfo'

export default (state = cityInfoData, action) => {
  switch (action.type) {
    case 'QUERY_INFO':
      return cityInfoData.filter(data => data.geoid === action.payload.geoid)
    default:
      return state
  }
}
