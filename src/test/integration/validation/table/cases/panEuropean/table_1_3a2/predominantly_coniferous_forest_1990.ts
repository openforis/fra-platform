import { buildPhaseCases } from './_buildPhaseCases'
import { buildTotalVolumeCases } from './_buildTotalVolumeCases'

const variableName = 'predominantly_coniferous_forest_1990'

export const predominantlyConiferousForest1990 = [
  ...buildTotalVolumeCases({
    parentVariable: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS',
    variableName,
  }),
  ...buildPhaseCases({ variableName }),
]
