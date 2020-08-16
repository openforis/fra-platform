import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import growingStockByForestType from '@webapp/app/assessment/panEuropean/sections/table_1_2b/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [growingStockByForestType.sectionName]: growingStockByForestType,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
