import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'

export const getOriginalDataPointData = async (
  props: {
    countryISOs: Array<CountryIso>
    cycle: Cycle
    assessment: Assessment
  },
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { countryISOs, cycle, assessment } = props
  const table = await DataRepository.getOriginalDataPointData(
    {
      countryISOs,
      cycle,
      assessment,
    },
    client
  )
  return {
    [assessment.props.name]: {
      [cycle.name]: {
        ...table,
      },
    },
  }
}
