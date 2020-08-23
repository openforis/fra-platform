import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'
import annualForestExpansionAndRegeneration from '@webapp/app/assessment/panEuropean/sections/table_4_2b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [annualForestExpansionAndRegeneration.sectionName]: annualForestExpansionAndRegeneration,
}
