export type RoutePath = {
  readonly relative: string
  readonly absolute: string
}

export interface Route<RouteParams = unknown, QueryParams = unknown> {
  readonly generatePath: (routeParams?: RouteParams, queryParams?: QueryParams) => string
  readonly parent?: Route<any, any> | undefined
  readonly path: RoutePath
  readonly parts: Array<string>
}
