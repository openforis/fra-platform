import { CountryIso } from '@meta/area'

export interface ForestEstimationsData {
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
  fra1aForestArea: number
  fra1aLandArea: number
  fra3bProtected: number
  totalAreaHa: number
}

export interface ForestEstimations {
  countryIso: CountryIso
  data: ForestEstimationsData
  year: number
}
