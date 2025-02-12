import { Objects } from 'utils/objects'

import { RecordAssessmentData } from 'meta/data'

import { mergeWithLastApproved } from 'server/controller/cycleData/tableData/_lastApproved/_lastApproved'
import { BaseProtocol, DB } from 'server/db'

import { getTableDataPrevCycle } from './_prevCycle'
import { PropsGetLastApproved } from './_types'

export const getTableDataLastApproved = async (
  props: PropsGetLastApproved,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { info } = props
  const { lastAccepted } = info

  const hasLastAccepted = !Objects.isNil(lastAccepted)

  // when has last accepted, odp gets manually merged later in mergeWithLastApproved
  const data = await getTableDataPrevCycle({ ...props, mergeOdp: !hasLastAccepted }, client)

  if (hasLastAccepted) {
    return mergeWithLastApproved({ ...props, data }, client)
  }

  return data
}
