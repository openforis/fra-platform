export interface Route<RouteParams, QueryParams> {
  readonly generatePath: (routeParams?: RouteParams, queryParams?: QueryParams) => string
  readonly parent?: Route<any, any> | undefined
  readonly path: string
  readonly parts: Array<string>
}
