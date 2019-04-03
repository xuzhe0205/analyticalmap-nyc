export function setQueryInfo(zip, geoid, pos) {
  return {
    type: 'SET_QUERY',
    payload: { zip, geoid, pos }
  }
}
