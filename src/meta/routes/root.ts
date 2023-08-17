import { Route } from 'meta/routes/route'

export const Root: Route<undefined, undefined> = {
  path: { relative: '/', absolute: '/' },
  parts: [],
  generatePath: () => `/`,
}
