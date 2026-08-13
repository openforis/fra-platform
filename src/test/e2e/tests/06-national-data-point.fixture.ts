import { SectionNames } from 'meta/assessment/section'

import { SectionUtils } from '../utils/section'

export const ndpYear = '2025'
export const ndpClassName = 'Forest land'

export const x11ExtentOfForestPath = SectionUtils.path({ countryIso: 'X11', sectionName: SectionNames.extentOfForest })

export const ndpOdp1aUrlRegex = /\/originalDataPoints\/2025\/extentOfForest$/
export const ndpOdp1bUrlRegex = /\/originalDataPoints\/2025\/forestCharacteristics$/
