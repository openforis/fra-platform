import forestAreaChangeTableSpec from '../forestAreaChange/tableSpec'
import specificForestCategoriesTableSpec from '../specificForestCategories/tableSpec'
import primaryDesignatedManagementObjectiveTableSpec from '../primaryDesignatedManagementObjective/tableSpec'
import areaAffectedByFireTableSpec from '../areaAffectedByFire/tableSpec'

export const annualItems = i18n => [
  {
    order: 1,
    label: i18n.t('extentOfForest.extentOfForest'),
    section: 'EOF',
    pathTemplate: '/country/:countryIso'
  },
  {
    order: 2,
    label: i18n.t('growingStock.growingStock'),
    pathTemplate: '/todo'
  },
  {
    order: 3,
    label: i18n.t('biomassStock.biomassStock'),
    pathTemplate: '#/todo'
  },
  {
    order: 4,
    label: i18n.t('carbonStock.carbonStock'),
    pathTemplate: '#/todo'
  },
  {
    order: 5,
    label: i18n.t('protectedAreas.protectedAreasLongTermMgmtPlans'),
    pathTemplate: '#/todo'
  }
]

export const fiveYearItems = i18n => [
  {
    order: 6,
    label: i18n.t('forestAreaChange.forestAreaLossGainChange'),
    pathTemplate: '/country/:countryIso/forestAreaChange',
    section: forestAreaChangeTableSpec(i18n).name
  },
  {
    order: 7,
    label: i18n.t('forestCharacteristics.forestCharacteristics'),
    pathTemplate: '#/todo'
  },
  {
    order: 8,
    label: i18n.t('specificForestCategories.specificForestCategories'),
    pathTemplate: '/country/:countryIso/specificForestCategories',
    section: specificForestCategoriesTableSpec(i18n).name
  },
  {
    order: 9,
    label: i18n.t('growingStockComposition.growingStockComposition'),
    pathTemplate: '#/todo'
  },
  {
    order: 10,
    label: i18n.t('nonWoodForestProducts.nonWoodForestProducts'),
    pathTemplate: '#/todo'
  },
  {
    order: 11,
    label: i18n.t('primaryDesignatedManagementObjective.primaryDesignatedManagementObjective'),
    pathTemplate: '/country/:countryIso/primaryDesignatedManagementObjectiveView',
    section: primaryDesignatedManagementObjectiveTableSpec(i18n).name
  },
  {
    order: 12,
    label: i18n.t('forestOwnershipManagementRights.forestOwnershipManagementRights'),
    pathTemplate: '#/todo'
  },
  {
    order: 13,
    label: i18n.t('disturbances.disturbances'),
    pathTemplate: '#/todo'
  },
  {
    order: 14,
    label: i18n.t('areaAffectedByFire.areaAffectedByFire'),
    pathTemplate: '/country/:countryIso/areaAffectedByFire',
    section: areaAffectedByFireTableSpec(i18n).name
  },
  {
    order: 15,
    label: i18n.t('employment.employment'),
    pathTemplate: '#/todo'
  },
  {
    order: 16,
    label: i18n.t('graduationOfStudents.graduationOfStudents'),
    pathTemplate: '#/todo'
  },
  {
    order: 17,
    label: i18n.t('policiesAndLegislation.policiesAndLegislation'),
    pathTemplate: '#/todo'
  },
  {
    order: 18,
    label: i18n.t('areaOfPermanentForestEstate.areaOfPermanentForestEstate'),
    pathTemplate: '#/todo'
  }
]
