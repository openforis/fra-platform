// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Area'.
const Area = require('./area')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Country'.
const Country = require('./country')

module.exports = {
  Area,
  Country,
}
