/*
 * Configures bundles which have cache-busting to have a long
 * cache-time.
 *
 * The main index.html ('/') is configured to be never cached
 * (so that the user always gets the latest bundles if they've changed etc.)
 */
module.exports.init = app => {
  const bundleMatch = /^\/bundle-.*\.js(\.map)?$|^\/styles-.*\.css(\.map)?$/
  const oneYearInSeconds = 60 * 60 * 24 * 365

  app.use((req, res, next) => {
    if (req.path === '/') {
      res.set('Cache-Control', 'no-store')
    } else if (req.path.match(bundleMatch)) {
      res.set('Cache-Control', `public, max-age=${oneYearInSeconds}`)
    }
    next()
  })
}
