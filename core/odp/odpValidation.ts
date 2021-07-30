export interface ODPValidationNationalClass {
  uuid: string
  valid: boolean
  validArea: boolean
  validClassName: boolean
  validEofPercentage: boolean
  validFocPercentage: boolean
  validPlantationIntroducedPercentage: boolean
}

export interface ODPValidationYear {
  valid: boolean
}

export interface ODPValidation {
  valid: boolean
  year: ODPValidationYear
}
