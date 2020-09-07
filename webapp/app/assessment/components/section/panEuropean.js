import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import forestAreaByForestTypes from '@webapp/app/assessment/panEuropean/sections/table_1_1b/sectionSpec'
import growingStock from '@webapp/app/assessment/panEuropean/sections/table_1_2a/sectionSpec'
import growingStockByForestType from '@webapp/app/assessment/panEuropean/sections/table_1_2b/sectionSpec'
import ageClassDistributionAreaOfEvenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3a1/sectionSpec'
import ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply from '@webapp/app/assessment/panEuropean/sections/table_1_3a2/sectionSpec'
import diameterDistributionAndTotalAreaUnevenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3b/sectionSpec'
import carbonStock from '@webapp/app/assessment/panEuropean/sections/table_1_4a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import forestAreaWithDamage from '@webapp/app/assessment/panEuropean/sections/table_2_4/sectionSpec'
import treeSpeciesComposition from '@webapp/app/assessment/panEuropean/sections/table_4_1/sectionSpec'
import totalForestAreaByExpansionAndRegenerationType from '@webapp/app/assessment/panEuropean/sections/table_4_2a/sectionSpec'
import annualForestExpansionAndRegeneration from '@webapp/app/assessment/panEuropean/sections/table_4_2b/sectionSpec'
import naturalness from '@webapp/app/assessment/panEuropean/sections/table_4_3a/sectionSpec'
import naturalnessBySubclasses from '@webapp/app/assessment/panEuropean/sections/table_4_3b/sectionSpec'
import threatenedForestSpecies from '@webapp/app/assessment/panEuropean/sections/table_4_8/sectionSpec'
import protectedForests from '@webapp/app/assessment/panEuropean/sections/table_4_9/sectionSpec'
import protectiveForestsSoilWaterAndOtherEcosystemFunctions from '@webapp/app/assessment/panEuropean/sections/table_5_1/sectionSpec'
import forestHoldings from '@webapp/app/assessment/panEuropean/sections/table_6_1/sectionSpec'
import grossValueAdded from '@webapp/app/assessment/panEuropean/sections/table_6_2/sectionSpec'
import factorIncomeAndEntrepreneurialIncome from '@webapp/app/assessment/panEuropean/sections/table_6_3/sectionSpec'
import totalGrossFixedCapitalFormationInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4a/sectionSpec'
import totalFixedCapitalConsumptionInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4b/sectionSpec'
import totalCapitalTransfersInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4c/sectionSpec'
import employmentByGenderAndAge from '@webapp/app/assessment/panEuropean/sections/table_6_5a/sectionSpec'
import employmentByEducationAndJobCharacteristics from '@webapp/app/assessment/panEuropean/sections/table_6_5b/sectionSpec'
import occupationalAccidents from '@webapp/app/assessment/panEuropean/sections/table_6_6/sectionSpec'
import tradeInWood from '@webapp/app/assessment/panEuropean/sections/table_6_8/sectionSpec'
import accessibilityForRecreation from '@webapp/app/assessment/panEuropean/sections/table_6_10a/sectionSpec'
import intensityOfUse from '@webapp/app/assessment/panEuropean/sections/table_6_10b/sectionSpec'
import recreationFacilities from '@webapp/app/assessment/panEuropean/sections/table_6_10c/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [forestAreaByForestTypes.sectionName]: forestAreaByForestTypes,
  [growingStock.sectionName]: growingStock,
  [growingStockByForestType.sectionName]: growingStockByForestType,
  [ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.sectionName]: ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply,
  [ageClassDistributionAreaOfEvenAgedStands.sectionName]: ageClassDistributionAreaOfEvenAgedStands,
  [diameterDistributionAndTotalAreaUnevenAgedStands.sectionName]: diameterDistributionAndTotalAreaUnevenAgedStands,  
  [carbonStock.sectionName]: carbonStock,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [forestAreaWithDamage.sectionName]: forestAreaWithDamage,
  [treeSpeciesComposition.sectionName]: treeSpeciesComposition,
  [totalForestAreaByExpansionAndRegenerationType.sectionName]: totalForestAreaByExpansionAndRegenerationType,
  [annualForestExpansionAndRegeneration.sectionName]: annualForestExpansionAndRegeneration,
  [naturalness.sectionName]: naturalness,
  [naturalnessBySubclasses.sectionName]: naturalnessBySubclasses,  
  [threatenedForestSpecies.sectionName]: threatenedForestSpecies,
  [protectedForests.sectionName]: protectedForests,
  [protectiveForestsSoilWaterAndOtherEcosystemFunctions.sectionName]: protectiveForestsSoilWaterAndOtherEcosystemFunctions,  
  [forestHoldings.sectionName]: forestHoldings,
  [grossValueAdded.sectionName]: grossValueAdded,
  [factorIncomeAndEntrepreneurialIncome.sectionName]: factorIncomeAndEntrepreneurialIncome,
  [totalGrossFixedCapitalFormationInForestsAndForestry.sectionName]: totalGrossFixedCapitalFormationInForestsAndForestry,
  [totalFixedCapitalConsumptionInForestsAndForestry.sectionName]: totalFixedCapitalConsumptionInForestsAndForestry,
  [totalCapitalTransfersInForestsAndForestry.sectionName]: totalCapitalTransfersInForestsAndForestry,
  [employmentByGenderAndAge.sectionName]: employmentByGenderAndAge,
  [employmentByEducationAndJobCharacteristics.sectionName]: employmentByEducationAndJobCharacteristics,
  [occupationalAccidents.sectionName]: occupationalAccidents,
  [tradeInWood.sectionName]: tradeInWood,
  [accessibilityForRecreation.sectionName]: accessibilityForRecreation,
  [intensityOfUse.sectionName]: intensityOfUse,  
  [recreationFacilities.sectionName]: recreationFacilities,
}
