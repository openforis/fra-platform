import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import protectedForests from '@webapp/app/assessment/panEuropean/sections/table_4_9/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [protectedForests.sectionName]: protectedForests,
}
