import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply from '@webapp/app/assessment/panEuropean/sections/table_1_3a2/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.sectionName]: ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
