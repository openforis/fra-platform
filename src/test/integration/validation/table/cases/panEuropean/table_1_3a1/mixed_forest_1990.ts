import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalAreaCases } from './_buildTotalAreaCases'

const variableName = 'mixed_forest_1990'

export const mixedForest1990 = [
  ...buildTotalAreaCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
