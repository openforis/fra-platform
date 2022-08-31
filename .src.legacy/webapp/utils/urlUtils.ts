export const getUrlParameter = (name: any) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const getRequestParam = (name: any) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.href.substring(url.href.indexOf('?') + 1))
  return params.get(name)
}
