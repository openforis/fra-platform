import { saveCountryConfigSetting } from '../../../app/country/actions'

export const toggleUseOriginalDataPoints = (use: boolean) => saveCountryConfigSetting('useOriginalDataPointsInFoc', use)
