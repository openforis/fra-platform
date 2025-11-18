import { ApiEndPoint } from 'meta/api/endpoint'
import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'

export type ExtraEstimationsApiEndpoint = Partial<Record<ExtraEstimation, string>>

export const extraEstimationsApiEndpoint: ExtraEstimationsApiEndpoint = {
  [ExtraEstimation.CustomRecipe]: ApiEndPoint.Geo.Estimations.forestAgreement(),
}
