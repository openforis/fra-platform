const country = '/:countryIso/'

const basePaths = {
  // ==== application paths
  root: '/',
  country,
  login: '/login/',
  statisticalFactsheets: '/statisticalFactsheets/',
  assessmentSection: `${country}assessment/:assessmentType/:section/`,

  // ==== getter utilities
  getAssessmentSectionLink: (countryIso, assessmentType, sectionName) =>
    `/${countryIso}/assessment/${assessmentType}/${sectionName}/`,
}

export default basePaths
