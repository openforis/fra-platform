import { saveCountryConfigSetting } from '@webapp/app/country/actions'

export const toggleUseOriginalDataPoints = (use: any) => saveCountryConfigSetting('useOriginalDataPointsInFoc', use)
