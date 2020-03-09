const R = require('ramda')

const assessments = {
  'fra2020': [
    {
      type: 'header',
      sectionNo: ' ',
      label: 'navigation.sectionHeaders.introduction',
      children: [
        {
          tableNo: '',
          label: 'contactPersons.contactPersons',
          section: 'contactPersons',
          pathTemplate: '/country/:countryIso/contactPersons/'
        }
      ]
    },
    {
      type: 'header',
      sectionNo: '1',
      label: 'navigation.sectionHeaders.forestExtentCharacteristicsAndChanges',
      children: [
        {
          tableNo: '1a',
          label: 'extentOfForest.extentOfForest',
          section: 'extentOfForest',
          pathTemplate: '/country/:countryIso/extentOfForest/'
        },
        {
          tableNo: '1b',
          label: 'forestCharacteristics.forestCharacteristics',
          pathTemplate: '/country/:countryIso/forestCharacteristics/',
          section: 'forestCharacteristics'
        },
        {
          tableNo: '1c',
          label: 'forestAreaChange.forestAreaChange',
          pathTemplate: '/country/:countryIso/forestAreaChange/',
          section: 'forestAreaChange'
        },
        {
          tableNo: '1d',
          label: 'annualReforestation.annualReforestation',
          pathTemplate: '/country/:countryIso/annualReforestation/',
          section: 'annualReforestation'
        },
        {
          tableNo: '1e',
          label: 'specificForestCategories.specificForestCategories',
          pathTemplate: '/country/:countryIso/specificForestCategories/',
          section: 'specificForestCategories'
        },
        {
          tableNo: '1f',
          label: 'otherLandWithTreeCover.otherLandWithTreeCover',
          pathTemplate: '/country/:countryIso/otherLandWithTreeCover/',
          section: 'otherLandWithTreeCover'
        }
      ]
    },
    {
      type: 'header',
      sectionNo: '2',
      label: 'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon',
      children: [
        {
          tableNo: '2a',
          label: 'growingStock.growingStock',
          section: 'growingStock',
          pathTemplate: '/country/:countryIso/growingStock/'
        },
        {
          tableNo: '2b',
          label: 'growingStockComposition.growingStockComposition',
          pathTemplate: '/country/:countryIso/growingStockComposition/',
          section: 'growingStockComposition'
        },
        {
          tableNo: '2c',
          label: 'biomassStock.biomassStock',
          section: 'biomassStock',
          pathTemplate: '/country/:countryIso/biomassStock/'
        },
        {
          tableNo: '2d',
          label: 'carbonStock.carbonStock',
          section: 'carbonStock',
          pathTemplate: '/country/:countryIso/carbonStock/'
        },
      ]
    },
    {
      type: 'header',
      sectionNo: '3',
      label: 'navigation.sectionHeaders.forestDesignationAndManagement',
      children: [
        {
          tableNo: '3a',
          section: 'designatedManagementObjective'
        },
        {
          tableNo: '3b',
          label: 'forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas',
          pathTemplate: '/country/:countryIso/forestAreaWithinProtectedAreas/',
          section: 'forestAreaWithinProtectedAreas'
        },
      ]
    },
    {
      type: 'header',
      sectionNo: '4',
      label: 'navigation.sectionHeaders.forestOwnershipAndManagementRights',
      children: [
        {
          tableNo: '4a',
          label: 'forestOwnership.forestOwnership',
          pathTemplate: '/country/:countryIso/forestOwnership/',
          section: 'forestOwnership'
        },
        {
          tableNo: '4b',
          label: 'holderOfManagementRights.holderOfManagementRights',
          pathTemplate: '/country/:countryIso/holderOfManagementRights/',
          section: 'holderOfManagementRights'
        },
      ]
    },
    {
      type: 'header',
      sectionNo: '5',
      label: 'navigation.sectionHeaders.forestDisturbances',
      children: [
        {
          tableNo: '5a',
          label: 'disturbances.disturbances',
          pathTemplate: '/country/:countryIso/disturbances/',
          section: 'disturbances'
        },
        {
          tableNo: '5b',
          label: 'areaAffectedByFire.areaAffectedByFire',
          pathTemplate: '/country/:countryIso/areaAffectedByFire/',
          section: 'areaAffectedByFire'
        },
        {
          tableNo: '5c',
          label: 'degradedForest.degradedForest',
          pathTemplate: '/country/:countryIso/degradedForest/',
          section: 'degradedForest'
        },
      ]
    },
    {
      type: 'header',
      sectionNo: '6',
      label: 'navigation.sectionHeaders.forestPolicyAndLegislation',
      children: [
        {
          tableNo: '6a',
          label: 'forestPolicy.forestPolicy',
          pathTemplate: '/country/:countryIso/forestPolicy/',
          section: 'forestPolicy'
        },
        {
          tableNo: '6b',
          label: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
          pathTemplate: '/country/:countryIso/areaOfPermanentForestEstateView/',
          section: 'areaOfPermanentForestEstate'
        },
      ]
    },
    {
      type: 'header',
      sectionNo: '7',
      label: 'navigation.sectionHeaders.employmentEducationAndNwfp',
      children: [
        {
          tableNo: '7a',
          label: 'employment.employment',
          pathTemplate: '/country/:countryIso/employment/',
          section: 'employment'
        },
        {
          tableNo: '7b',
          label: 'graduationOfStudents.graduationOfStudents',
          pathTemplate: '/country/:countryIso/graduationOfStudents/',
          section: 'graduationOfStudents'
        },
        {
          tableNo: '7c',
          label: 'nonWoodForestProductsRemovals.nonWoodForestProductsRemovals',
          pathTemplate: '/country/:countryIso/nonWoodForestProductsRemovals/',
          section: 'nonWoodForestProductsRemovals'
        }
      ]
    },
    {
      type: 'header',
      sectionNo: '8',
      label: 'navigation.sectionHeaders.sustainableDevelopment',
      children: [
        {
          tableNo: '8a',
          label: 'sustainableDevelopment.sustainableDevelopment',
          pathTemplate: '/country/:countryIso/sustainableDevelopment/',
          section: 'sustainableDevelopment'
        }
      ]
    }
  ]
}

const sectionsFromItems = items =>
  R.flatten(
    R.map(
      item => R.map(R.prop('section'), item.children),
      items
    )
  )

const convertToAssessmentSections = assessments =>
  R.pipe(
    R.toPairs,
    R.map(([assessment, items]) => [assessment, sectionsFromItems(items)]),
    R.fromPairs
  )(assessments)

const assessmentSections = convertToAssessmentSections(assessments)

module.exports.assessments = assessments
module.exports.assessmentSections = assessmentSections
