import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalVolumeCases } from './_buildTotalVolumeCases'

const variableName = 'mixed_forest_1990'

export const mixedForest1990 = [
  ...buildTotalVolumeCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
