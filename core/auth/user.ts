export type Lang = 'en' | 'zh' | 'es' | 'fr' | 'ru' | 'ar'

export type AuthType = 'local' | 'google'

export type CountryIso =
  | 'ABW'
  | 'AFG'
  | 'AGO'
  | 'AIA'
  | 'ALB'
  | 'AND'
  | 'ARE'
  | 'ARG'
  | 'ARM'
  | 'ASM'
  | 'ATG'
  | 'AUS'
  | 'AUT'
  | 'AZE'
  | 'BDI'
  | 'BEL'
  | 'BEN'
  | 'BES'
  | 'BFA'
  | 'BGD'
  | 'BGR'
  | 'BHR'
  | 'BHS'
  | 'BIH'
  | 'BLM'
  | 'BLR'
  | 'BLZ'
  | 'BMU'
  | 'BOL'
  | 'BRA'
  | 'BRB'
  | 'BRN'
  | 'BTN'
  | 'BWA'
  | 'CAF'
  | 'CAN'
  | 'CHE'
  | 'CHL'
  | 'CHN'
  | 'CIV'
  | 'CMR'
  | 'COD'
  | 'COG'
  | 'COK'
  | 'COL'
  | 'COM'
  | 'CPV'
  | 'CRI'
  | 'CUB'
  | 'CUW'
  | 'CYM'
  | 'CYP'
  | 'CZE'
  | 'DEU'
  | 'DJI'
  | 'DMA'
  | 'DNK'
  | 'DOM'
  | 'DZA'
  | 'ECU'
  | 'EGY'
  | 'ERI'
  | 'ESH'
  | 'ESP'
  | 'EST'
  | 'ETH'
  | 'FIN'
  | 'FJI'
  | 'FLK'
  | 'FRA'
  | 'FRO'
  | 'FSM'
  | 'GAB'
  | 'GBR'
  | 'GEO'
  | 'GGY'
  | 'GHA'
  | 'GIB'
  | 'GIN'
  | 'GLP'
  | 'GMB'
  | 'GNB'
  | 'GNQ'
  | 'GRC'
  | 'GRD'
  | 'GRL'
  | 'GTM'
  | 'GUF'
  | 'GUM'
  | 'GUY'
  | 'HND'
  | 'HRV'
  | 'HTI'
  | 'HUN'
  | 'IDN'
  | 'IMN'
  | 'IND'
  | 'IRL'
  | 'IRN'
  | 'IRQ'
  | 'ISL'
  | 'ISR'
  | 'ITA'
  | 'JAM'
  | 'JEY'
  | 'JOR'
  | 'JPN'
  | 'KAZ'
  | 'KEN'
  | 'KGZ'
  | 'KHM'
  | 'KIR'
  | 'KNA'
  | 'KOR'
  | 'KWT'
  | 'LAO'
  | 'LBN'
  | 'LBR'
  | 'LBY'
  | 'LCA'
  | 'LIE'
  | 'LKA'
  | 'LSO'
  | 'LTU'
  | 'LUX'
  | 'LVA'
  | 'MAF'
  | 'MAR'
  | 'MCO'
  | 'MDA'
  | 'MDG'
  | 'MDV'
  | 'MEX'
  | 'MHL'
  | 'MKD'
  | 'MLI'
  | 'MLT'
  | 'MMR'
  | 'MNE'
  | 'MNG'
  | 'MNP'
  | 'MOZ'
  | 'MRT'
  | 'MSR'
  | 'MTQ'
  | 'MUS'
  | 'MWI'
  | 'MYS'
  | 'MYT'
  | 'NAM'
  | 'NCL'
  | 'NER'
  | 'NFK'
  | 'NGA'
  | 'NIC'
  | 'NIU'
  | 'NLD'
  | 'NOR'
  | 'NPL'
  | 'NRU'
  | 'NZL'
  | 'OMN'
  | 'PAK'
  | 'PAN'
  | 'PCN'
  | 'PER'
  | 'PHL'
  | 'PLW'
  | 'PNG'
  | 'POL'
  | 'PRI'
  | 'PRK'
  | 'PRT'
  | 'PRY'
  | 'PSE'
  | 'PYF'
  | 'QAT'
  | 'REU'
  | 'ROU'
  | 'RUS'
  | 'RWA'
  | 'SAU'
  | 'SDN'
  | 'SEN'
  | 'SGP'
  | 'SHN'
  | 'SJM'
  | 'SLB'
  | 'SLE'
  | 'SLV'
  | 'SMR'
  | 'SOM'
  | 'SPM'
  | 'SRB'
  | 'SSD'
  | 'STP'
  | 'SUR'
  | 'SVK'
  | 'SVN'
  | 'SWE'
  | 'SWZ'
  | 'SXM'
  | 'SYC'
  | 'SYR'
  | 'TCA'
  | 'TCD'
  | 'TGO'
  | 'THA'
  | 'TJK'
  | 'TKL'
  | 'TKM'
  | 'TLS'
  | 'TON'
  | 'TTO'
  | 'TUN'
  | 'TUR'
  | 'TUV'
  | 'TZA'
  | 'UGA'
  | 'UKR'
  | 'URY'
  | 'USA'
  | 'UZB'
  | 'VAT'
  | 'VCT'
  | 'VEN'
  | 'VGB'
  | 'VIR'
  | 'VNM'
  | 'VUT'
  | 'WLF'
  | 'WSM'
  | 'X01'
  | 'X02'
  | 'X03'
  | 'X04'
  | 'X05'
  | 'X06'
  | 'X07'
  | 'X08'
  | 'X09'
  | 'X10'
  | 'X11'
  | 'X12'
  | 'X13'
  | 'X14'
  | 'X15'
  | 'X16'
  | 'X17'
  | 'X18'
  | 'X19'
  | 'X20'
  | 'YEM'
  | 'ZAF'
  | 'ZMB'
  | 'ZWE'

export type Role =
  | 'NATIONAL_CORRESPONDENT'
  | 'REVIEWER'
  | 'COLLABORATOR'
  | 'ADMINISTRATOR'
  | 'ALTERNATE_NATIONAL_CORRESPONDENT'

export type Assessment = 'fra2020' | 'panEuropean'

export interface RoleUser {
  countryIso?: null | CountryIso
  role: Role
  assessment: 'fra2020'
}

export interface User {
  id: number
  name: string
  email: string
  loginEmail: null
  institution: null
  position: null
  lang: Lang
  type: AuthType
  active: boolean
  // deprecated
  role: any
  roles: RoleUser[]
}

/*
 * Deprecated
 */
export interface oldRole {
  countryIso: CountryIso
  lastEdit: string
  annualAssessment: 'accepted' | 'editing'
  fra2020Assessment: 'accepted' | 'editing'
  fra2020DeskStudy: boolean
  role: Role
}
