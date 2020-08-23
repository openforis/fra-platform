import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import totalForestAreaByExpansionAndRegenerationType from '@webapp/app/assessment/panEuropean/sections/table_4_2a/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [totalForestAreaByExpansionAndRegenerationType.sectionName]: totalForestAreaByExpansionAndRegenerationType,
}
