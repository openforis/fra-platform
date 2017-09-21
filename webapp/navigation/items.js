import forestAreaChangeTableSpec from '../forestAreaChange/tableSpec'
import specificForestCategoriesTableSpec from '../specificForestCategories/tableSpec'
import primaryDesignatedManagementObjectiveTableSpec from '../primaryDesignatedManagementObjective/tableSpec'
import areaAffectedByFireTableSpec from '../areaAffectedByFire/tableSpec'
import growingStockCompositionTableSpec from '../growingStockComposition/tableSpec'

export const annualItems = i18n => [
  {
    tableNo: '1a',
    label: i18n.t('extentOfForest.extentOfForest'),
    section: 'extentOfForest',
    pathTemplate: '/country/:countryIso'
  },
  {
    tableNo: '3a',
    label: i18n.t('growingStock.growingStock'),
    section: 'growingStock',
    pathTemplate: '/country/:countryIso/growingStock'
  },
  {
    tableNo: '3c',
    label: i18n.t('biomassStock.biomassStock'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '3d',
    label: i18n.t('carbonStock.carbonStock'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '5b',
    label: i18n.t('protectedAreas.protectedAreasLongTermMgmtPlans'),
    pathTemplate: '#/todo'
  }
]

export const fra2020Items = i18n => [
  {
    tableNo: '1a',
    label: i18n.t('extentOfForest.extentOfForest'),
    section: 'extentOfForest',
    pathTemplate: '/country/:countryIso'
  },
  {
    tableNo: '1b',
    label: i18n.t('forestAreaChange.forestAreaLossGainChange'),
    pathTemplate: '/country/:countryIso/forestAreaChange',
    section: forestAreaChangeTableSpec(i18n).name
  },
  {
    tableNo: '2a',
    label: i18n.t('forestCharacteristics.forestCharacteristics'),
    pathTemplate: '/country/:countryIso/forestCharacteristics',
    section: 'forestCharacteristics'
  },
  {
    tableNo: '2b',
    label: i18n.t('specificForestCategories.specificForestCategories'),
    pathTemplate: '/country/:countryIso/specificForestCategories',
    section: specificForestCategoriesTableSpec(i18n).name
  },
  {
    tableNo: '3a',
    label: i18n.t('growingStock.growingStock'),
    pathTemplate: '/todo'
  },
  {
    tableNo: '3b',
    label: i18n.t('growingStockComposition.growingStockComposition'),
    pathTemplate: '/country/:countryIso/growingStockComposition',
    section: growingStockCompositionTableSpec(i18n).name
  },
  {
    tableNo: '3c',
    label: i18n.t('biomassStock.biomassStock'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '3d',
    label: i18n.t('carbonStock.carbonStock'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '4',
    label: i18n.t('nonWoodForestProducts.nonWoodForestProducts'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '5a',
    label: i18n.t('primaryDesignatedManagementObjective.primaryDesignatedManagementObjective'),
    pathTemplate: '/country/:countryIso/primaryDesignatedManagementObjectiveView',
    section: primaryDesignatedManagementObjectiveTableSpec(i18n).name
  },
  {
    tableNo: '5b',
    label: i18n.t('protectedAreas.protectedAreasLongTermMgmtPlans'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '6a',
    label: i18n.t('forestOwnershipManagementRights.forestOwnershipManagementRights'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '6b',
    label: i18n.t('holderOfManagementRights.holderOfManagementRights'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '7a',
    label: i18n.t('disturbances.disturbances'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '7b',
    label: i18n.t('areaAffectedByFire.areaAffectedByFire'),
    pathTemplate: '/country/:countryIso/areaAffectedByFire',
    section: areaAffectedByFireTableSpec(i18n).name
  },
  {
    tableNo: '8',
    label: i18n.t('employment.employment'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '9',
    label: i18n.t('graduationOfStudents.graduationOfStudents'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '10a',
    label: i18n.t('policiesAndLegislation.policiesAndLegislation'),
    pathTemplate: '#/todo'
  },
  {
    tableNo: '10b',
    label: i18n.t('areaOfPermanentForestEstate.areaOfPermanentForestEstate'),
    pathTemplate: '#/todo'
  }
]
