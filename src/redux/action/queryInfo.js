export function setQueryInfo(zip, geoid, pos, name) {
  return {
    type: 'SET_QUERY',
    payload: { zip, geoid, pos, name }
  }
}
