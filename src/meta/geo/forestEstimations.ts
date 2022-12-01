import { CountryIso } from '@meta/area'

export interface ForestEstimationsData {
  fa_agreement_hansen10_gte_1: number
  fa_agreement_hansen10_gte_2: number
  fa_agreement_hansen10_gte_3: number
  fa_agreement_hansen10_gte_4: number
  fa_agreement_hansen10_gte_5: number
  fa_agreement_hansen10_gte_6: number
  fa_agreement_hansen10_gte_7: number
  fa_agreement_hansen10_gte_8: number
  fa_agreement_hansen20_gte_1: number
  fa_agreement_hansen20_gte_2: number
  fa_agreement_hansen20_gte_3: number
  fa_agreement_hansen20_gte_4: number
  fa_agreement_hansen20_gte_5: number
  fa_agreement_hansen20_gte_6: number
  fa_agreement_hansen20_gte_7: number
  fa_agreement_hansen20_gte_8: number
  fa_agreement_hansen30_gte_1: number
  fa_agreement_hansen30_gte_2: number
  fa_agreement_hansen30_gte_3: number
  fa_agreement_hansen30_gte_4: number
  fa_agreement_hansen30_gte_5: number
  fa_agreement_hansen30_gte_6: number
  fa_agreement_hansen30_gte_7: number
  fa_agreement_hansen30_gte_8: number
  fa_copernicus: number
  fa_esa_2009: number
  fa_esa_2020: number
  fa_esri: number
  fa_globeland: number
  fa_hansen10: number
  fa_hansen20: number
  fa_hansen30: number
  fa_jaxa: number
  fa_tandemx: number
  fra_1a_forestArea: number
  fra_1a_landArea: number
  fra_3b_protected: number
  total_area_ha: number
}

export interface ForestEstimations {
  countryIso: CountryIso
  data: ForestEstimationsData
  year: number
}
