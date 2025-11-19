import { UUIDs } from 'meta/uuid/uuids'

const newNationalClass = (props?: { name?: string; definition?: string }): ODPNationalClass => ({
  name: props?.name ?? '',
  definition: props?.definition ?? '',
  uuid: UUIDs.getUuid(),
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
  forestNaturalPercent?: string
  otherPlantedForestPercent?: string
  otherWoodedLandPercent?: string
  placeHolder?: boolean
  forestPlantationIntroducedPercent?: string
  forestPlantationPercent?: string
  forestNaturalForestOfWhichPrimaryForestPercent?: string
  uuid?: string
}
