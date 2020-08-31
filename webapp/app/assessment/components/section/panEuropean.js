import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import forestHoldings from '@webapp/app/assessment/panEuropean/sections/table_6_1/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [forestHoldings.sectionName]: forestHoldings,
}
