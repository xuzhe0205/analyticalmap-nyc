const defaultQuery = {
  zip: null,
  geoid: null,
  pos: null
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
