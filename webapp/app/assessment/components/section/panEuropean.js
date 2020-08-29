import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import grossValueAdded from '@webapp/app/assessment/panEuropean/sections/table_6_2/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [grossValueAdded.sectionName]: grossValueAdded,
}
