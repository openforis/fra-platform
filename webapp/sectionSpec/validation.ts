// TODO: add state type
// TODO: add data type

export type Validator = (colIdx: number, rowIdx: number) => (state: any) => boolean

export interface ValidationMessage {
  key: string
}

export type GetValidationMessages = (data: any) => (state: any) => Array<ValidationMessage>
