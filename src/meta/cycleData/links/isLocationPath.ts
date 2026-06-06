export const isLocationPath = (path: Array<string>, locationPath: Array<string>): boolean => {
  return path.length === locationPath.length && path.every((pathItem, index) => pathItem === locationPath[index])
}
