export const getInPath = (obj: any, path: string[]) => {
  return path.reduce((acc, pathPart) => acc?.[pathPart], obj)
}
