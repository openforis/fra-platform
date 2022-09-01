import { saveCountryConfigSetting } from '@webapp/app/country/actions'

export const toggleUseOriginalDataPoints = (use: boolean) => saveCountryConfigSetting('useOriginalDataPointsInFoc', use)
