import { saveCountryConfigSetting } from '@webapp/app/country/actions'

export const toggleUseOriginalDataPoints = use => saveCountryConfigSetting('useOriginalDataPointsInFoc', use)
