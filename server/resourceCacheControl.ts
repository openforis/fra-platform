/*
 * Configures bundles which have cache-busting to have a long
 * cache-time.
 *
 * The main index.html ('/') is configured to be never cached
 * (so that the user always gets the latest bundles if they've changed etc.)
 */
export const init = (app: any) => {
  const bundleMatch = /^\/bundle-.*\.js(\.map)?$|^\/styles-.*\.css(\.map)?$/
  const bustMatch = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const oneYearInSeconds = 60 * 60 * 24 * 365

  app.use((req: any, res: any, next: any) => {
    if (req.path === '/') {
      res.set('Cache-Control', 'no-store')
    } else if (req.path.match(bundleMatch)) {
      res.set('Cache-Control', `public, max-age=${oneYearInSeconds}`)
      // Resource-reference cache-busted with uuidv4 in the end (see webpack.config.js)
    } else if (req.query.bust && req.query.bust.match(bustMatch)) {
      res.set('Cache-Control', `public, max-age=${oneYearInSeconds}`)
    }
    next()
  })
}
