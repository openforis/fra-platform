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
import totalGrossFixedCapitalFormationInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4a/sectionSpec'
import totalFixedCapitalConsumptionInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4b/sectionSpec'
import totalCapitalTransfersInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4c/sectionSpec'
import employmentByGenderAndAge from '@webapp/app/assessment/panEuropean/sections/table_6_5a/sectionSpec'
import employmentByEducationAndJobCharacteristics from '@webapp/app/assessment/panEuropean/sections/table_6_5b/sectionSpec'
import occupationalAccidents from '@webapp/app/assessment/panEuropean/sections/table_6_6/sectionSpec'
import accessibilityForRecreation from '@webapp/app/assessment/panEuropean/sections/table_6_10a/sectionSpec'
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
  [totalGrossFixedCapitalFormationInForestsAndForestry.sectionName]: totalGrossFixedCapitalFormationInForestsAndForestry,
  [totalFixedCapitalConsumptionInForestsAndForestry.sectionName]: totalFixedCapitalConsumptionInForestsAndForestry,
  [totalCapitalTransfersInForestsAndForestry.sectionName]: totalCapitalTransfersInForestsAndForestry,
  [employmentByGenderAndAge.sectionName]: employmentByGenderAndAge,
  [employmentByEducationAndJobCharacteristics.sectionName]: employmentByEducationAndJobCharacteristics,
  [occupationalAccidents.sectionName]: occupationalAccidents,
  [accessibilityForRecreation.sectionName]: accessibilityForRecreation,
  [recreationFacilities.sectionName]: recreationFacilities,
}
