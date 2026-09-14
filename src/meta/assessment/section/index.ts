import { CycleUuid } from 'meta/assessment/cycle'
import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { Descriptions } from 'meta/assessment/description'
import { Label } from 'meta/assessment/label'
import { UUID } from 'meta/uuid/uuid'

export type SectionName = string

export enum SectionNames {
  // == Custom section names
  chat = 'chat', // 1 to 1 messages
  contacts = 'contacts',
  messageBoard = 'messageBoard', // country message board
  nationalDataPoint = 'nationalDataPoint',
  originalDataPoints = 'originalDataPoints',

  // == FRA
  annualReforestation = 'annualReforestation',
  areaAffectedByFire = 'areaAffectedByFire',
  areaOfPermanentForestEstate = 'areaOfPermanentForestEstate',
  biomassStock = 'biomassStock',
  carbonStock = 'carbonStock',
  contactPersons = 'contactPersons',
  degradedForest = 'degradedForest',
  designatedManagementObjective = 'designatedManagementObjective',
  disturbances = 'disturbances',
  employment = 'employment',
  extentOfForest = 'extentOfForest',
  forestAreaChange = 'forestAreaChange',
  forestAreaWithinProtectedAreas = 'forestAreaWithinProtectedAreas',
  forestCharacteristics = 'forestCharacteristics',
  forestOwnership = 'forestOwnership',
  forestPolicy = 'forestPolicy',
  forestRestoration = 'forestRestoration',
  graduationOfStudents = 'graduationOfStudents',
  growingStock = 'growingStock',
  growingStockComposition = 'growingStockComposition',
  holderOfManagementRights = 'holderOfManagementRights',
  nonWoodForestProductsRemovals = 'nonWoodForestProductsRemovals',
  otherLandWithTreeCover = 'otherLandWithTreeCover',
  specificForestCategories = 'specificForestCategories',
  sustainableDevelopment = 'sustainableDevelopment',

  // == PanEuropean
  accessibilityForRecreation = 'accessibilityForRecreation',
  ageClassDistributionAreaOfEvenAgedStands = 'ageClassDistributionAreaOfEvenAgedStands',
  ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply = 'ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply',
  annualForestExpansionAndRegeneration = 'annualForestExpansionAndRegeneration',
  areaWithForestLandDegradation = 'areaWithForestLandDegradation',
  // carbonStock = 'carbonStock',
  carbonStockInHarvestedWoodProductsHWP = 'carbonStockInHarvestedWoodProductsHWP',
  deadwood = 'deadwood',
  diameterDistributionAndTotalAreaUnevenAgedStands = 'diameterDistributionAndTotalAreaUnevenAgedStands',
  employmentByEducationAndJobCharacteristics = 'employmentByEducationAndJobCharacteristics',
  employmentByGenderAndAge = 'employmentByGenderAndAge',
  factorIncomeAndEntrepreneurialIncome = 'factorIncomeAndEntrepreneurialIncome',
  forestArea = 'forestArea',
  forestAreaByForestTypes = 'forestAreaByForestTypes',
  forestAreaWithDamage = 'forestAreaWithDamage',
  forestHoldings = 'forestHoldings',
  grossValueAdded = 'grossValueAdded',
  // growingStock = 'growingStock',
  growingStockByForestType = 'growingStockByForestType',
  // growingStockComposition = 'growingStockComposition',
  incrementAndFellings = 'incrementAndFellings',
  intensityOfUse = 'intensityOfUse',
  introducedTreeSpecies = 'introducedTreeSpecies',
  introducedTreeSpecies4_4b = 'introducedTreeSpecies4_4b',
  invasiveTreeSpecies = 'invasiveTreeSpecies',
  marketedServices = 'marketedServices',
  naturalness = 'naturalness',
  naturalnessBySubclasses = 'naturalnessBySubclasses',
  nonWoodGoods = 'nonWoodGoods',
  occupationalAccidents = 'occupationalAccidents',
  otherRecreationFacilitiesPilotReporting2015 = 'otherRecreationFacilitiesPilotReporting2015',
  protectedForests = 'protectedForests',
  protectiveForestsSoilWaterAndOtherEcosystemFunctions = 'protectiveForestsSoilWaterAndOtherEcosystemFunctions',
  recreationFacilities = 'recreationFacilities',
  removals = 'removals',
  threatenedForestSpecies = 'threatenedForestSpecies',
  totalCapitalTransfersInForestsAndForestry = 'totalCapitalTransfersInForestsAndForestry',
  totalEnergySupplyFromWood = 'totalEnergySupplyFromWood',
  totalFixedCapitalConsumptionInForestsAndForestry = 'totalFixedCapitalConsumptionInForestsAndForestry',
  totalForestAreaByExpansionAndRegenerationType = 'totalForestAreaByExpansionAndRegenerationType',
  totalGrossFixedCapitalFormationInForestsAndForestry = 'totalGrossFixedCapitalFormationInForestsAndForestry',
  tradeInWood = 'tradeInWood',
  treeSpeciesComposition = 'treeSpeciesComposition',
  woodConsumption = 'woodConsumption',
}

export interface SectionProps {
  anchors: Record<CycleUuid, string> // anchor by cycle uuid
  index: number
  labels: Record<CycleUuid, Label>
}

export type SubSectionHints = {
  definitions?: boolean
  faqs?: boolean
  notes?: boolean
}

export interface SubSectionProps extends SectionProps {
  dataExport?: boolean
  descriptions: Descriptions
  hidden?: Record<CycleUuid, boolean>
  hints?: Record<CycleUuid, SubSectionHints>
  name: SectionName
  showTitle: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  subSections?: Array<SubSection>
  parentUuid?: null
}

export interface SubSection extends CycledPropsObject<SubSectionProps> {
  parentUuid?: UUID
}
