export interface GenerateValuesField {
  variableName: string
  labelKey: string
  selected: boolean
  annualChangeRates: { past: string; future: string }
}
