export default function(obj) {
  var str = []
  for (var p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p) && obj[p] !== '') {
      if (Array.isArray(obj[p])) {
        obj[p].forEach(item => {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item))
        })
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    }
  }
  var query = str.join('&')
  return query ? '?' + query : ''
}
