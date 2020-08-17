import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import forestAreaWithDamage from '@webapp/app/assessment/panEuropean/sections/table_2_4/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [forestAreaWithDamage.sectionName]: forestAreaWithDamage,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
