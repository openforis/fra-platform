import { ApiEndPoint } from 'meta/api/endpoint/ApiEndPoint'
import { CountryIso } from 'meta/area'

export interface ForestEstimationsData {
  faAgreementEsriEsaGloHansen10Gte1: number
  faAgreementEsriEsaGloHansen10Gte2: number
  faAgreementEsriEsaGloHansen10Gte3: number
  faAgreementEsriEsaGloHansen10Gte4: number
  faAgreementEsriEsaGte1: number
  faAgreementEsriEsaGte2: number
  faAgreementHansen10Gte1: number
  faAgreementHansen10Gte2: number
  faAgreementHansen10Gte3: number
  faAgreementHansen10Gte4: number
  faAgreementHansen10Gte5: number
  faAgreementHansen10Gte6: number
  faAgreementHansen10Gte7: number
  faAgreementHansen10Gte8: number
  faAgreementHansen20Gte1: number
  faAgreementHansen20Gte2: number
  faAgreementHansen20Gte3: number
  faAgreementHansen20Gte4: number
  faAgreementHansen20Gte5: number
  faAgreementHansen20Gte6: number
  faAgreementHansen20Gte7: number
  faAgreementHansen20Gte8: number
  faAgreementHansen30Gte1: number
  faAgreementHansen30Gte2: number
  faAgreementHansen30Gte3: number
  faAgreementHansen30Gte4: number
  faAgreementHansen30Gte5: number
  faAgreementHansen30Gte6: number
  faAgreementHansen30Gte7: number
  faAgreementHansen30Gte8: number
  faCopernicus: number
  faEsa2009: number
  faEsa2020: number
  faEsri: number
  faGlobeland: number
  faHansen10: number
  faHansen20: number
  faHansen30: number
  faJaxa: number
  faTandemx: number
  faCopernicusProtected: number
  faEsa2009Protected: number
  faEsa2020Protected: number
  faEsriProtected: number
  faGlobelandProtected: number
  faHansen10Protected: number
  faHansen20Protected: number
  faHansen30Protected: number
  faJaxaProtected: number
  faTandemxProtected: number
  fra1aForestArea: number
  fra1aLandArea: number
  fra3bProtected: number
  totalAreaHa: number
  burnedAreaMODIS: [{ year: number; ba: number; fbaHansen10: number }]
}

export interface ForestEstimations {
  countryIso: CountryIso
  data: ForestEstimationsData
  year: number
}

export enum ExtraEstimation {
  ReportedToFRA = 'Reported to FRA',
  PrecalculatedRecipe = 'Forest agreement selected',
  CustomRecipe = 'Custom agreement selected',
}

export const extraEstimationsMetadata = {
  [ExtraEstimation.ReportedToFRA]: {
    palette: ['#000000'], // black
  },
  [ExtraEstimation.PrecalculatedRecipe]: {
    palette: ['#FF00FF'], // fuchsia
  },
  [ExtraEstimation.CustomRecipe]: {
    palette: ['#FF00FF'], // fuchsia
  },
}

export type ExtraEstimationsApiEndpoint = Partial<Record<ExtraEstimation, string>>

export const extraEstimationsApiEndpoint: ExtraEstimationsApiEndpoint = {
  [ExtraEstimation.CustomRecipe]: ApiEndPoint.Geo.Estimations.forestAgreement(),
}
