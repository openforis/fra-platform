import { isEmpty } from './isEmpty'

export const setInPath = (params: { obj: any; path: string[]; value: any; excludeEmpty?: boolean }): any => {
  const { obj, path, value, excludeEmpty } = params
  if (excludeEmpty && isEmpty(value)) {
    return obj
  }

  let objCurrent: any = obj
  path.forEach((pathPart, i) => {
    if (i === path.length - 1) {
      objCurrent[pathPart] = value
    } else {
      if (!objCurrent[pathPart]) {
        objCurrent[pathPart] = {}
      }
      objCurrent = objCurrent[pathPart]
    }
  })
  return obj
}
