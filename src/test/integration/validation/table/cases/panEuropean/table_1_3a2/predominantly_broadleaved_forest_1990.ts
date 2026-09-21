import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalVolumeCases } from './_buildTotalVolumeCases'

const variableName = 'predominantly_broadleaved_forest_1990'

export const predominantlyBroadleavedForest1990 = [
  ...buildTotalVolumeCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
