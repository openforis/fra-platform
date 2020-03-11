const FRA = require('./assessmentFra')

const assessmentSectionPath = `/:countryIso/assessment/:assessmentType/:section/`

const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  `/${countryIso}/assessment/${assessmentType}/${sectionName}/`

const assessmentSections = {
  [FRA.type]: FRA.sections
}

module.exports = {
  assessmentSectionPath,
  getAssessmentSectionLink,
  assessmentSections,
}

