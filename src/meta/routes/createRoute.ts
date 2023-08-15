import { generatePath } from 'react-router-dom'

import { Route } from './route'
import { Routes } from './routes'

type Params = {
  parent?: Route<any, any>
  path: string
}

const getGeneratePath =
  <RouteParams, QueryParams>(path: string, parent: Route<any, any>): Route<RouteParams, QueryParams>['generatePath'] =>
  (pathParams, queryParams) => {
    // @ts-ignore
    let generatedPath = generatePath(path, pathParams ?? {})
    if (queryParams) {
      const searchParams = new URLSearchParams(queryParams as Record<string, string>)
      generatedPath += `?${searchParams}`
    }
    const parentPath = `${parent.generatePath(pathParams)}`
    return `${parentPath === Routes.Root.path ? parentPath : `${parentPath}/`}${generatedPath}`
  }

export const createRoute = <
  PathParams = undefined,
  QueryParams extends Record<string, unknown> = Record<string, unknown>
>(
  params: Params
): Route<PathParams, QueryParams> => {
  const { parent = Routes.Root, path } = params

  const generatePath = getGeneratePath(path, parent)
  const parts = path.split('/')
  return { generatePath, parent, path, parts }
}
