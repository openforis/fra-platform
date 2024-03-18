const local = 'add-your-cookie'
const prod = 'add-your-cookie'

const parse = (cookieString: string, domain: string) => {
  return cookieString.split('; ').map((cookie) => {
    const [name, value] = cookie.split('=')
    return { name, value, domain }
  })
}

export const cookies = {
  local,
  prod,
  parse,
}
