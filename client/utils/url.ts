const getRequestParam = (name: any) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.href.substring(url.href.indexOf('?') + 1))
  return params.get(name)
}

export const Urls = {
  getRequestParam,
}
