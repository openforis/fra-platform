import { getIo } from './_io'

export const emit = (event: string, ...args: Array<any>): void => {
  getIo().emit(event, args)
}
