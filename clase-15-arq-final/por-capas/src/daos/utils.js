
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

export function toPOJO(obj) {
  return JSON.parse(JSON.stringify(obj))
}