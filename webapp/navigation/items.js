import forestAreaChangeTableSpec from '../forestAreaChange/tableSpec'
import specificForestCategoriesTableSpec from '../specificForestCategories/tableSpec'
import areaAffectedByFireTableSpec from '../areaAffectedByFire/tableSpec'
import growingStockCompositionTableSpec from '../growingStockComposition/tableSpec'
import nonWoodForestProductsRemovalsMainSpec from '../nonWoodForestProductsRemovals/mainTableSpec'
import annualReforestationTableSpec from '../annualReforestation/tableSpec'
import forestOwnerhsipTableSpec from '../forestOwnership/tableSpec'
import forestAreaWithinProtectedAreasTableSpec from '../forestAreaWithinProtectedAreas/tableSpec'
import holderOfManagementRightsTableSpec from '../holderOfManagementRights/tableSpec'
import disturbancesTableSpec from '../disturbances/tableSpec'
import areaOfPermanentForestEstateTableSpec from '../areaOfPermanentForestEstate/tableSpec'
import employmentTableSpec from '../employment/tableSpec'
import forestPolicyTableSpec from '../forestPolicy/tableSpec'
import carbonStockTableSpec from '../carbonStock/tableSpec'
import biomassStockTableSpec from '../biomassStock/tableSpec'

export const fra2020Items = i18n => [
  {
    type: 'header',
    sectionNo: '1',
    label: i18n.t('navigation.sectionHeaders.forestExtentCharacteristicsAndChanges')
  },
  {
    tableNo: '1a',
    label: i18n.t('extentOfForest.extentOfForest'),
    section: 'extentOfForest',
    pathTemplate: '/country/:countryIso/extentOfForest'
  },
  {
    tableNo: '1b',
    label: i18n.t('forestCharacteristics.forestCharacteristics'),
    pathTemplate: '/country/:countryIso/forestCharacteristics',
    section: 'forestCharacteristics'
  },
  {
    tableNo: '1c',
    label: i18n.t('forestAreaChange.forestAreaChange'),
    pathTemplate: '/country/:countryIso/forestAreaChange',
    section: forestAreaChangeTableSpec(i18n).name
  },
  {
    tableNo: '1d',
    label: i18n.t('annualReforestation.annualReforestation'),
    pathTemplate: '/country/:countryIso/annualReforestation',
    section: annualReforestationTableSpec(i18n).name
  },
  {
    tableNo: '1e',
    label: i18n.t('specificForestCategories.specificForestCategories'),
    pathTemplate: '/country/:countryIso/specificForestCategories',
    section: specificForestCategoriesTableSpec(i18n).name
  },
  {
    type: 'header',
    sectionNo: '2',
    label: i18n.t('navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon')
  },
  {
    tableNo: '2a',
    label: i18n.t('growingStock.growingStock'),
    section: 'growingStock',
    pathTemplate: '/country/:countryIso/growingStock'
  },
  {
    tableNo: '2b',
    label: i18n.t('growingStockComposition.growingStockComposition'),
    pathTemplate: '/country/:countryIso/growingStockComposition',
    section: growingStockCompositionTableSpec(i18n).name
  },
  {
    tableNo: '2c',
    label: i18n.t('biomassStock.biomassStock'),
    section: biomassStockTableSpec(i18n).name,
    pathTemplate: '/country/:countryIso/biomassStock'
  },
  {
    tableNo: '2d',
    label: i18n.t('carbonStock.carbonStock'),
    section: carbonStockTableSpec(i18n).name,
    pathTemplate: '/country/:countryIso/carbonStock'
  },
  {
    type: 'header',
    sectionNo: '3',
    label: i18n.t('navigation.sectionHeaders.forestDesignationAndManagement')
  },
  {
    tableNo: '3a',
    label: i18n.t('designatedManagementObjective.designatedManagementObjective'),
    pathTemplate: '/country/:countryIso/designatedManagementObjective',
    section: 'designatedManagementObjective'
  },
  {
    tableNo: '3b',
    label: i18n.t('forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas'),
    pathTemplate: '/country/:countryIso/forestAreaWithinProtectedAreas',
    section: forestAreaWithinProtectedAreasTableSpec(i18n).name
  },
  {
    type: 'header',
    sectionNo: '4',
    label: i18n.t('navigation.sectionHeaders.forestOwnershipAndManagementRights')
  },
  {
    tableNo: '4a',
    label: i18n.t('forestOwnership.forestOwnership'),
    pathTemplate: '/country/:countryIso/forestOwnership',
    section: forestOwnerhsipTableSpec(i18n).name
  },
  {
    tableNo: '4b',
    label: i18n.t('holderOfManagementRights.holderOfManagementRights'),
    pathTemplate: '/country/:countryIso/holderOfManagementRights',
    section: holderOfManagementRightsTableSpec(i18n).name
  },
  {
    type: 'header',
    sectionNo: '5',
    label: i18n.t('navigation.sectionHeaders.forestDisturbances')
  },
  {
    tableNo: '5a',
    label: i18n.t('disturbances.disturbances'),
    pathTemplate: '/country/:countryIso/disturbances',
    section: disturbancesTableSpec(i18n).name
  },
  {
    tableNo: '5b',
    label: i18n.t('areaAffectedByFire.areaAffectedByFire'),
    pathTemplate: '/country/:countryIso/areaAffectedByFire',
    section: areaAffectedByFireTableSpec(i18n).name
  },
  {
    tableNo: '5c',
    label: i18n.t('degradedForest.degradedForest'),
    pathTemplate: '/country/:countryIso/degradedForest',
    section: 'degradedForest'
  },
  {
    type: 'header',
    sectionNo: '6',
    label: i18n.t('navigation.sectionHeaders.forestPolicyAndLegislation')
  },
  {
    tableNo: '6a',
    label: i18n.t('forestPolicy.forestPolicy'),
    pathTemplate: '/country/:countryIso/forestPolicy',
    section: forestPolicyTableSpec(i18n).name
  },
  {
    tableNo: '6b',
    label: i18n.t('areaOfPermanentForestEstate.areaOfPermanentForestEstate'),
    pathTemplate: '/country/:countryIso/areaOfPermanentForestEstateView',
    section: areaOfPermanentForestEstateTableSpec(i18n).name
  },
  {
    type: 'header',
    sectionNo: '7',
    label: i18n.t('navigation.sectionHeaders.employmentEducationAndNwfp')
  },
  {
    tableNo: '7a',
    label: i18n.t('employment.employment'),
    pathTemplate: '/country/:countryIso/employment',
    section: employmentTableSpec(i18n).name
  },
  {
    tableNo: '7b',
    label: i18n.t('graduationOfStudents.graduationOfStudents'),
    pathTemplate: '/country/:countryIso/graduationOfStudents',
    section: 'graduationOfStudents'
  },
  {
    tableNo: '7c',
    label: i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals'),
    pathTemplate: '/country/:countryIso/nonWoodForestProductsRemovals',
    section: nonWoodForestProductsRemovalsMainSpec(i18n).name
  }
]
