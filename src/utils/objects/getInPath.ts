export const getInPath = (obj: any, path: Array<string | number>) => {
  return path.reduce((acc, pathPart) => acc?.[pathPart], obj)
}
