import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStock from '@webapp/app/assessment/panEuropean/sections/table_1_4a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStock.sectionName]: carbonStock,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
