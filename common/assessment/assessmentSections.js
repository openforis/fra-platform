const FRA = require('./assessmentFra')

const assessmentSectionPath = `/assessment/:countryIso/:assessmentType/:section/`

const getAssessmentSectionLink = (countryIso, assessmentType, sectionName) =>
  `/assessment/${countryIso}/${assessmentType}/${sectionName}/`

const assessmentSections = {
  [FRA.type]: FRA.sections
}

module.exports = {
  assessmentSectionPath,
  getAssessmentSectionLink,
  assessmentSections,
}

