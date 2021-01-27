// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatNumb... Remove this comment to see the full error message
const { formatNumber } = require('./bignumberUtils')

const formatInteger = (num: any) => formatNumber(num, 0)

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatDeci... Remove this comment to see the full error message
const formatDecimal = (num: any) => formatNumber(num, 2)

module.exports = {
  formatDecimal,
  formatInteger,
}
