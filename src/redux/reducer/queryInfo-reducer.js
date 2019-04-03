const defaultQuery = {
  zip: '11430',
  geoid: '999US3651000498',
  pos: { lat: 40.65238957093737, lng: -73.79311299257813 },
  name: 'Bellerose'
}

export default (state = defaultQuery, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
