const defaultQuery = {
  zip: '11430',
  geoid: '999US3651000498',
  pos: { lat: 40.65238957093737, lng: -73.79311299257813 },
  name: 'Bellerose'
}

const KEY = 'QUERY_INFO'

// simple data persistence, Avoid data loss on refresh
const setInfo2Local = state => {
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

const getInfo = () => {
  try {
    const info = window.localStorage.getItem(KEY)
    console.log('test',info)
    return info ? JSON.parse(info) : defaultQuery
  } catch (e) {
    return defaultQuery
  }
}

export default (state, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      const newInfo = { ...state, ...action.payload }
      setInfo2Local(newInfo)
      return newInfo
    default:
      return getInfo()
  }
}
