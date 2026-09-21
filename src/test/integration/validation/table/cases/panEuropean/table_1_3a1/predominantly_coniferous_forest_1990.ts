import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalAreaCases } from './_buildTotalAreaCases'

const variableName = 'predominantly_coniferous_forest_1990'

export const predominantlyConiferousForest1990 = [
  ...buildTotalAreaCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
