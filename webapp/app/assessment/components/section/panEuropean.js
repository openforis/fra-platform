import forestArea from '@webapp/app/assessment/panEuropean/sections/table_1_1a/sectionSpec'
import ageClassDistributionAreaOfEvenAgedStands from '@webapp/app/assessment/panEuropean/sections/table_1_3a1/sectionSpec' //Строки по порядку таблиц нужно.
import carbonStockInHarvestedWoodProductsHWP from '@webapp/app/assessment/panEuropean/sections/table_1_4b/sectionSpec'

export default {
  [forestArea.sectionName]: forestArea,
  [ageClassDistributionAreaOfEvenAgedStands.sectionName]: ageClassDistributionAreaOfEvenAgedStands, //Строки по порядку таблиц нужно.
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
}
