import { OriginalDataPoint } from 'meta/assessment/originalDataPoint/originalDataPoint'

import { commonProps } from './commonProps'

export const odp11 = {
  ...commonProps,
  nationalClasses: [
    {
      area: '1500.00',
      name: 'Open forest',
      uuid: '02b381ca-2c39-49f7-9fef-80a3463f8f6b',
      definition: 'Add definition here',
      forestPercent: '5.00',
      forestNaturalPercent: '50.00',
      otherWoodedLandPercent: '5.00',
      forestPlantationPercent: '5.00',
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: null,
      forestNaturalForestOfWhichPrimaryForestPercent: '50.00',
    },
    {
      area: '900.00',
      name: 'Closed forest',
      uuid: '3986836e-eac8-4287-a625-11df18a60d01',
      definition: '',
      forestPercent: null,
      forestNaturalPercent: '50.00',
      otherWoodedLandPercent: null,
      forestPlantationPercent: null,
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: '5.00',
      forestNaturalForestOfWhichPrimaryForestPercent: null,
    },
    {
      area: '550.00',
      name: 'Plantations',
      uuid: '42b9b108-c655-40f3-a865-934346dfa859',
      definition: '',
      forestPercent: null,
      forestNaturalPercent: '0.00',
      otherWoodedLandPercent: null,
      forestPlantationPercent: null,
      otherPlantedForestPercent: '0.00',
      forestPlantationIntroducedPercent: null,
      forestNaturalForestOfWhichPrimaryForestPercent: '0',
    },
    {
      area: '300.00',
      name: 'Woodland',
      uuid: '578bb1d6-961a-48c1-b489-877641f3c17f',
      definition: '',
      forestPercent: null,
      otherWoodedLandPercent: null,
    },
    {
      name: '',
      definition: '',
      uuid: '012d5db6-3990-43f0-bc12-c99fe8467bbb',
      placeHolder: true,
    },
  ],
} as OriginalDataPoint
