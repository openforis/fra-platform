import { generatePath } from 'react-router-dom'

import { Root } from './root'
import { Route } from './route'

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
    return `${parentPath === Root.path.relative ? parentPath : `${parentPath}/`}${generatedPath}`
  }

const getAbsolutePath = (props: { relativePath: string; parent?: Route<any, any> }): string => {
  const { relativePath, parent } = props
  const prefix = parent
    ? `${getAbsolutePath({ relativePath: parent.path.relative, parent: parent.parent })}${
        parent.path.relative !== Root.path.relative ? '/' : ''
      }`
    : ''
  return `${prefix}${relativePath}`
}

export const createRoute = <
  PathParams = undefined,
  QueryParams extends Record<string, unknown> = Record<string, unknown>
>(
  params: Params
): Route<PathParams, QueryParams> => {
  const { parent = Root, path: relative } = params

  const absolute = getAbsolutePath({ relativePath: relative, parent })
  const generatePath = getGeneratePath(relative, parent)
  const parts = relative.split('/')

  return { generatePath, parent, path: { relative, absolute }, parts }
}
