import { UUIDs } from '@core/utils'

const newNationalClass = (props?: { name?: string; definition?: string }): ODPNationalClass => ({
  name: props?.name ?? '',
  definition: props?.definition ?? '',
  uuid: UUIDs.v4(),
})

export const ODPNationalClassFactory = {
  newNationalClass,
  newNationalClassPlaceholder: (): ODPNationalClass => ({ ...newNationalClass(), placeHolder: true }),
}

export interface ODPNationalClass {
  area?: string
  definition?: string
  forestPercent?: string
  name?: string
  naturalForestPercent?: string
  otherPlantedPercent?: string
  otherWoodedLandPercent?: string
  placeHolder?: boolean
  plantationIntroducedPercent?: string
  plantationPercent?: string
  uuid?: string
}
