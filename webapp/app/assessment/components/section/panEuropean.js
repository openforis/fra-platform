import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import forestAreaByForestTypes from '@webapp/app/assessment/panEuropean/sections/table_1_1b/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [forestAreaByForestTypes.sectionName]: forestAreaByForestTypes,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP
}
