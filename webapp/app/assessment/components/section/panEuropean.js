import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import diameterDistributionAndTotalAreaUnevenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3b/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [diameterDistributionAndTotalAreaUnevenAgedStands.sectionName]: diameterDistributionAndTotalAreaUnevenAgedStands,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
