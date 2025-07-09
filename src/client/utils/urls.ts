const getRequestParam = (name: string) => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.href.substring(url.href.indexOf('?') + 1))
  return params.get(name)
}

const withSearchParams = (url: string, params: ConstructorParameters<typeof URLSearchParams>[0]) => {
  const urlParams = new URLSearchParams(params)
  return `${url}?${urlParams.toString()}`
}

export const Urls = {
  getRequestParam,
  withSearchParams,
}
