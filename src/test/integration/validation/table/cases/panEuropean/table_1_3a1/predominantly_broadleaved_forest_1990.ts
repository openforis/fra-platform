import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalAreaCases } from './_buildTotalAreaCases'

const variableName = 'predominantly_broadleaved_forest_1990'

export const predominantlyBroadleavedForest1990 = [
  ...buildTotalAreaCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
