import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import ageClassDistributionAreaOfEvenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3a1/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [ageClassDistributionAreaOfEvenAgedStands.sectionName]: ageClassDistributionAreaOfEvenAgedStands,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
