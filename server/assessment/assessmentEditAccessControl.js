const R = require('ramda')
const {roleForCountry} = require('../../common/countryRole')
const {AccessControlException} = require('../utils/accessControl')
const assessmentRepository = require('./assessmentRepository')
const {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments
} = require('./assessmentRoleAllowance')

// This is basically duplicate data from navigation/items.js
// There might be a better solution to this by sharing a common
// data structure (in /common)
const assessmentSections = {
  'fra2020': [
    'extentOfForest',
    'forestCharacteristics',
    'forestAreaChange',
    'annualReforestation',
    'specificForestCategories',
    'otherLandWithTreeCover',
    'growingStock',
    'growingStockComposition',
    'biomassStock',
    'carbonStock',
    'designatedManagementObjective',
    'forestAreaWithinProtectedAreas',
    'forestOwnership',
    'holderOfManagementRights',
    'disturbances',
    'areaAffectedByFire',
    'degradedForest',
    'forestPolicy',
    'areaOfPermanentForestEstate',
    'employment',
    'graduationOfStudents',
    'nonWoodForestProductsRemovals',
    'sustainableDevelopment'
  ]
}

const assessmentForSection = section =>
  R.pipe(
    R.toPairs,
    R.map(([assessment, sections]) =>  R.contains(section, sections) ? assessment : null),
    R.head)(assessmentSections)

const getAssessmentStatus = async (countryIso, section) => {
  const assessments = await assessmentRepository.getAssessments(countryIso)
  const assessment = assessmentForSection(section)
  const assessmentStatus = R.path([assessment, 'status'], assessments)
  if (R.isNil(assessment) || R.isNil(assessmentStatus)) {
    // Let's not crash with error in this case yet, we don't know if all the
    // sections coming in are definitely mapped correctly
    console.log(
      'Assessment edit check could not find an assessment status for section',
      section,
      'country was',
      countryIso
    )
    return null
  }
  return assessmentStatus
}

const allowedToEditDataCheck = async (countryIso, user, section) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (R.isNil(assessmentStatus)) return //Until we're sure this doesn't break anything
  if(!isUserRoleAllowedToEditAssessmentData(role, assessmentStatus)) {
    throw new AccessControlException(
      'error.access.assessmentEditingNotAllowed',
      {user: user.name, role: role.role, countryIso, assessmentStatus})
  }
}

const allowedToEditCommentsCheck = async (countryIso, user, section) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (R.isNil(assessmentStatus)) return //Until we're sure this doesn't break anything
  if(!isUserRoleAllowedToEditAssessmentComments(role, assessmentStatus)) {
    throw new AccessControlException(
      'error.access.assessmentCommentingNotAllowed',
      {user: user.name, role: role.role, countryIso, assessmentStatus})
  }
}

module.exports = {allowedToEditDataCheck, allowedToEditCommentsCheck}
