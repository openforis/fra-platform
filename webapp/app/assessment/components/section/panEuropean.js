import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import forestAreaByForestTypes from '@webapp/app/assessment/panEuropean/sections/table_1_1b/sectionSpec'
import growingStock from '@webapp/app/assessment/panEuropean/sections/table_1_2a/sectionSpec'
import growingStockByForestType from '@webapp/app/assessment/panEuropean/sections/table_1_2b/sectionSpec'
import ageClassDistributionAreaOfEvenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3a1/sectionSpec'
import ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply from '@webapp/app/assessment/panEuropean/sections/table_1_3a2/sectionSpec'
import diameterDistributionAndTotalAreaUnevenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3b/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import totalFixedCapitalConsumptionInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4b/sectionSpec'
import totalCapitalTransfersInForestsAndForestry from '@webapp/app/assessment/panEuropean/sections/table_6_4c/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [forestAreaByForestTypes.sectionName]: forestAreaByForestTypes,
  [growingStock.sectionName]: growingStock,
  [growingStockByForestType.sectionName]: growingStockByForestType,
  [ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.sectionName]: ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply,
  [ageClassDistributionAreaOfEvenAgedStands.sectionName]: ageClassDistributionAreaOfEvenAgedStands,
  [diameterDistributionAndTotalAreaUnevenAgedStands.sectionName]: diameterDistributionAndTotalAreaUnevenAgedStands,  
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [totalFixedCapitalConsumptionInForestsAndForestry.sectionName]: totalFixedCapitalConsumptionInForestsAndForestry,
  [totalCapitalTransfersInForestsAndForestry.sectionName]: totalCapitalTransfersInForestsAndForestry,
}
