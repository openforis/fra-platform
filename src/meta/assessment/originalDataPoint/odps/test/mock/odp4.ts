import { OriginalDataPoint } from 'meta/assessment/originalDataPoint/originalDataPoint'

import { commonProps } from './commonProps'

export const odp4 = {
  ...commonProps,
  nationalClasses: [
    {
      area: null,
      name: 'Open forest',
      uuid: '02b381ca-2c39-49f7-9fef-80a3463f8f6b',
      definition: 'Add definition here',
      forestPercent: '100.00',
      forestNaturalPercent: '50.00',
      otherWoodedLandPercent: '0',
      forestPlantationPercent: '50.00',
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: null,
      forestNaturalForestOfWhichPrimaryForestPercent: '50.00',
    },
    {
      area: null,
      name: 'Closed forest',
      uuid: '3986836e-eac8-4287-a625-11df18a60d01',
      definition: '',
      forestPercent: '100.00',
      forestNaturalPercent: '50.00',
      otherWoodedLandPercent: '0',
      forestPlantationPercent: '100.00',
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: '5.00',
      forestNaturalForestOfWhichPrimaryForestPercent: null,
    },
    {
      area: null,
      name: 'Plantations',
      uuid: '42b9b108-c655-40f3-a865-934346dfa859',
      definition: '',
      forestPercent: '100.00',
      forestNaturalPercent: '0.00',
      otherWoodedLandPercent: '0',
      forestPlantationPercent: '100.00',
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: null,
      forestNaturalForestOfWhichPrimaryForestPercent: '0',
    },
    {
      area: null,
      name: 'Woodland',
      uuid: '578bb1d6-961a-48c1-b489-877641f3c17f',
      definition: '',
      forestPercent: '0.00',
      otherWoodedLandPercent: '100.00',
    },
    {
      name: '',
      definition: '',
      uuid: 'd747092c-bf76-42c0-afd9-dced0e5d8a75',
      placeHolder: true,
    },
  ],
} as OriginalDataPoint
