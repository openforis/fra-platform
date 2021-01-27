const { v4: uuidv4 } = require('uuid')

let bustString = uuidv4()
// For some reason, incremental build with watch loses
// the __BUST__ configured with DefinePlugin in webpack
// config. With this we'll fallback to uuidv4 which
// is set when the page is loaded. This is only a local
// issue for developers and only causes the svgs to
// reload when the page is reloaded
try {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__BUST__'.
  bustString = __BUST__
} catch (e) {}

export default bustString
