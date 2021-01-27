export const getUrlParameter = (name: any) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`)
  const results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const getRequestParam = (name: any) => {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Location' is not assignable to p... Remove this comment to see the full error message
  const url = new URL(window.location)
  const params = new URLSearchParams(url.href.substring(url.href.indexOf('?') + 1))
  return params.get(name)
}
