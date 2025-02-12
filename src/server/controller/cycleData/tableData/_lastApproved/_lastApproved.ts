import { Objects } from 'utils/objects'

import { RecordAssessmentData } from 'meta/data'

import { BaseProtocol } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'

import { PropsGetLastApproved } from './_types'

type Props = PropsGetLastApproved & {
  data: RecordAssessmentData
}

export const mergeWithLastApproved = async (props: Props, client: BaseProtocol): Promise<RecordAssessmentData> => {
  const { assessment, cycle, data } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countryData = await DataRepository.getTableDataLastApproved(props, client)
  const lastApprovedData = { [assessmentName]: { [cycleName]: countryData } }

  // TODO: merge with odp

  return Objects.merge(data, lastApprovedData)
}
