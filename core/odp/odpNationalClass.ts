import { UUIDs } from '@core/utils'

const newNationalClass = (props?: { className?: string; definition?: string }): ODPNationalClass => ({
  className: props?.className ?? '',
  definition: props?.definition ?? '',
  uuid: UUIDs.v4(),
})

export const ODPNationalClassFactory = {
  newNationalClass,
  newNationalClassPlaceholder: (): ODPNationalClass => ({ ...newNationalClass(), placeHolder: true }),
}

export interface ODPNationalClass {
  area?: string
  className?: string
  definition?: string
  forestPercent?: string
  naturalForestPercent?: string
  otherPlantedPercent?: string
  otherWoodedLandPercent?: string
  placeHolder?: boolean
  plantationIntroducedPercent?: string
  plantationPercent?: string
  uuid?: string
}
