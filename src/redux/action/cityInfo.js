export function getCityInfo(geoid) {
  return {
    type: 'QUERY_INFO',
    payload: { geoid }
  }
}
