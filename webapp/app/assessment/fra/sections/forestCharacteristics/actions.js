import * as FRA from '@common/assessment/fra'

import { saveCountryConfigSetting } from '@webapp/app/country/actions'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'

const assessmentType = FRA.type
const section = FRA.sections['1'].children.b

export const toggleUseOriginalDataPoints = use => dispatch =>
  dispatch(
    saveCountryConfigSetting(
      'useOriginalDataPointsInFoc',
      use,
      fetchTableData(assessmentType, section.name, section.tables.forestCharacteristics, true)
    )
  )
