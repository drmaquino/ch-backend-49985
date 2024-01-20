
export function matches(query) {
  return function (elem) {
    for (const key in query) {
      if (!elem.hasOwnProperty(key) || elem[key] !== query[key]) {
        return false
      }
    }
    return true
  }
}
