import { v4 as uuidv4 } from 'uuid'

let bustString = uuidv4()
// For some reason, incremental build with watch loses
// the __BUST__ configured with DefinePlugin in webpack
// config. With this we'll fallback to uuidv4 which
// is set when the page is loaded. This is only a local
// issue for developers and only causes the svgs to
// reload when the page is reloaded
try {
  // @ts-ignore
  // TODO : what's this
  bustString = __BUST__
} catch (e) {}

export default bustString
