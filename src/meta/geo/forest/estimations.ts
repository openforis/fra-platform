import { CountryIso } from 'meta/area/countryIso'
import { ProtectedAreaEstimations } from 'meta/geo/protectedArea/estimations'

export interface ForestEstimationsData extends ProtectedAreaEstimations {
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
  faAgreementHansen10Gte9: number
  faAgreementHansen20Gte1: number
  faAgreementHansen20Gte2: number
  faAgreementHansen20Gte3: number
  faAgreementHansen20Gte4: number
  faAgreementHansen20Gte5: number
  faAgreementHansen20Gte6: number
  faAgreementHansen20Gte7: number
  faAgreementHansen20Gte8: number
  faAgreementHansen20Gte9: number
  faAgreementHansen30Gte1: number
  faAgreementHansen30Gte2: number
  faAgreementHansen30Gte3: number
  faAgreementHansen30Gte4: number
  faAgreementHansen30Gte5: number
  faAgreementHansen30Gte6: number
  faAgreementHansen30Gte7: number
  faAgreementHansen30Gte8: number
  faAgreementHansen30Gte9: number
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
  faJrc2020: number
  fra1aForestArea: number
  fra1aLandArea: number
  totalAreaHa: number
  burnedAreaMODIS: [{ year: number; ba: number; fbaHansen10: number }]
}

export interface ForestEstimations {
  countryIso: CountryIso
  data: ForestEstimationsData
  year: number
}
