const FRA = require('./fra')

const sectionPath = `/:countryIso/assessment/:assessmentType/:section/`

const getSectionLink = (countryIso, assessmentType, sectionName) =>
  `/${countryIso}/assessment/${assessmentType}/${sectionName}/`

const sections = {
  [FRA.type]: FRA.sections,
}

module.exports = {
  sectionPath,
  getSectionLink,
  sections,
}
