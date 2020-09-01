import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import forestAreaWithDamage from '@webapp/app/assessment/panEuropean/sections/table_2_4/sectionSpec'
import treeSpeciesComposition from '@webapp/app/assessment/panEuropean/sections/table_4_1/sectionSpec'
import totalForestAreaByExpansionAndRegenerationType from '@webapp/app/assessment/panEuropean/sections/table_4_2a/sectionSpec'
import annualForestExpansionAndRegeneration from '@webapp/app/assessment/panEuropean/sections/table_4_2b/sectionSpec'
import naturalness from '@webapp/app/assessment/panEuropean/sections/table_4_3a/sectionSpec'
import naturalnessBySubclasses from '@webapp/app/assessment/panEuropean/sections/table_4_3b/sectionSpec'
import protectedForests from '@webapp/app/assessment/panEuropean/sections/table_4_9/sectionSpec'
import totalGrossFixedCapitalFormationInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4a/sectionSpec'
import totalFixedCapitalConsumptionInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4b/sectionSpec'
import totalCapitalTransfersInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4c/sectionSpec'
import employmentByGenderAndAge from '@webapp/app/assessment/panEuropean/sections/table_6_5a/sectionSpec'
import employmentByEducationAndJobCharacteristics from '@webapp/app/assessment/panEuropean/sections/table_6_5b/sectionSpec'
import occupationalAccidents from '@webapp/app/assessment/panEuropean/sections/table_6_6/sectionSpec'
import accessibilityForRecreation from '@webapp/app/assessment/panEuropean/sections/table_6_10a/sectionSpec'
import intensityOfUse from '@webapp/app/assessment/panEuropean/sections/table_6_10b/sectionSpec'
import recreationFacilities from '@webapp/app/assessment/panEuropean/sections/table_6_10c/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [forestAreaWithDamage.sectionName]: forestAreaWithDamage,
  [treeSpeciesComposition.sectionName]: treeSpeciesComposition,
  [totalForestAreaByExpansionAndRegenerationType.sectionName]: totalForestAreaByExpansionAndRegenerationType,
  [annualForestExpansionAndRegeneration.sectionName]: annualForestExpansionAndRegeneration,
  [naturalness.sectionName]: naturalness,
  [naturalnessBySubclasses.sectionName]: naturalnessBySubclasses,  
  [protectedForests.sectionName]: protectedForests,  
  [totalGrossFixedCapitalFormationInForestsAndForestry.sectionName]: totalGrossFixedCapitalFormationInForestsAndForestry,
  [totalFixedCapitalConsumptionInForestsAndForestry.sectionName]: totalFixedCapitalConsumptionInForestsAndForestry,
  [totalCapitalTransfersInForestsAndForestry.sectionName]: totalCapitalTransfersInForestsAndForestry,
  [employmentByGenderAndAge.sectionName]: employmentByGenderAndAge,
  [employmentByEducationAndJobCharacteristics.sectionName]: employmentByEducationAndJobCharacteristics,
  [occupationalAccidents.sectionName]: occupationalAccidents,
  [accessibilityForRecreation.sectionName]: accessibilityForRecreation,
  [intensityOfUse.sectionName]: intensityOfUse,  
  [recreationFacilities.sectionName]: recreationFacilities,
}
