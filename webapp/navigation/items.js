import forestAreaChangeTableSpec from '../forestAreaChange/tableSpec'
import specificForestCategoriesTableSpec from '../specificForestCategories/tableSpec'
import primaryDesignatedManagementObjectiveTableSpec from '../primaryDesignatedManagementObjective/tableSpec'
import areaAffectedByFireTableSpec from '../areaAffectedByFire/tableSpec'

export const annualItems = [
  {
    order: 1,
    label: 'Extent of forest',
    section: 'EOF',
    pathTemplate: '/country/:countryIso'
  },
  {
    order: 2,
    label: 'Growing stock',
    pathTemplate: '/todo'
  },
  {
    order: 3,
    label: 'Biomass stock',
    pathTemplate: '#/todo'
  },
  {
    order: 4,
    label: 'Carbon stock',
    pathTemplate: '#/todo'
  },
  {
    order: 5,
    label: 'Protected areas and long-term management plans',
    pathTemplate: '#/todo'
  }
]

export const fiveYearItems = [
  {
    order: 6,
    label: 'Forest area loss, gain and net change',
    pathTemplate: '/country/:countryIso/forestAreaChange',
    section: `traditionalTable-${forestAreaChangeTableSpec.name}`
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
    section: `traditionalTable-${specificForestCategoriesTableSpec.name}`
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
    section: `traditionalTable-${primaryDesignatedManagementObjectiveTableSpec.name}`
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
    section: `traditionalTable-${areaAffectedByFireTableSpec.name}`
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
