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
    label: 'Forest area loss, gain and net change',
    pathTemplate: '/country/:countryIso/forestAreaChange',
    section: forestAreaChangeTableSpec(i18n).name
  },
  {
    order: 7,
    label: 'Forest characteristics',
    pathTemplate: '#/todo'
  },
  {
    order: 8,
    label: 'Specific forest categories',
    pathTemplate: '/country/:countryIso/specificForestCategories',
    section: specificForestCategoriesTableSpec(i18n).name
  },
  {
    order: 9,
    label: 'Growing stock composition',
    pathTemplate: '#/todo'
  },
  {
    order: 10,
    label: 'Non wood forest products',
    pathTemplate: '#/todo'
  },
  {
    order: 11,
    label: 'Primary designated management objective',
    pathTemplate: '/country/:countryIso/primaryDesignatedManagementObjectiveView',
    section: primaryDesignatedManagementObjectiveTableSpec(i18n).name
  },
  {
    order: 12,
    label: 'Forest ownership and management rights',
    pathTemplate: '#/todo'
  },
  {
    order: 13,
    label: 'Disturbances',
    pathTemplate: '#/todo'
  },
  {
    order: 14,
    label: 'Area affected by fire',
    pathTemplate: '/country/:countryIso/areaAffectedByFire',
    section: areaAffectedByFireTableSpec(i18n).name
  },
  {
    order: 15,
    label: 'Employment',
    pathTemplate: '#/todo'
  },
  {
    order: 16,
    label: 'Graduation of students',
    pathTemplate: '#/todo'
  },
  {
    order: 17,
    label: 'Policies and legislation',
    pathTemplate: '#/todo'
  },
  {
    order: 18,
    label: 'Area of permanent forest estate',
    pathTemplate: '#/todo'
  }
]
