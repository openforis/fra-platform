const R = require('ramda')

const fraYears = [
  1990,
  2000,
  2010,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020
]

const filterFraYears = data => data.filter(
  d => R.contains(Number(d.year), fraYears)
)

module.exports = {
  fraYears,
  filterFraYears,
}
