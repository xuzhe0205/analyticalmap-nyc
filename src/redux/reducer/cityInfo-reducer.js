import cityInfoData from '../cityInfo'

export default (state = cityInfoData, action) => {
  switch (action.type) {
    case 'QUERY_INFO':
      return state.filter(data => data.geoid === action.geoid)
    default:
      return []
  }
}
