export type RoutePath = {
  readonly relative: string
  readonly absolute: string
}

export interface Route<RouteParams, QueryParams> {
  readonly generatePath: (routeParams?: RouteParams, queryParams?: QueryParams) => string
  readonly parent?: Route<any, any> | undefined
  readonly path: RoutePath
  readonly parts: Array<string>
}
