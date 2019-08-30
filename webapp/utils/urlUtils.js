export const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const getRequestParam = name => {
  const url = new URL(window.location)
  const params = new URLSearchParams(url.hash.substring(url.hash.indexOf('?') + 1))
  return params.get(name)
}
