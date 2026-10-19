import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'

import { getInfo } from 'server/controller/cycleData/history/lastApproved'
import { mergeWithLastApproved } from 'server/controller/cycleData/tableData/_lastApproved/_lastApproved'
import { BaseProtocol, DB } from 'server/db/db'

import { getTableDataPrevCycle } from './_prevCycle'
import { PropsGetLastApproved } from './_types'

// Sets default values for tableData
const _withDefaults = (props: PropsGetLastApproved & { data: RecordAssessmentData }): RecordAssessmentData => {
  const { assessment, countryISOs, cycle, data, tableNames } = props
  const [countryIso] = countryISOs

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  tableNames.forEach((tableName) => {
    const tableData = RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, tableName, data })
    if (Objects.isEmpty(tableData)) {
      const path = [assessmentName, cycleName, countryIso, tableName]
      const value = {}
      Objects.setInPath({ path, obj: data, value })
    }
  })

  return data
}

export const getLastApproved = async (
  props: PropsGetLastApproved,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle } = props
  const [countryIso] = countryISOs

  const info = await getInfo({ assessment, cycle, countryIso })

  if (Objects.isNil(info)) {
    return _withDefaults({ ...props, data: {} })
  }

  const { lastAccepted } = info

  const hasLastAccepted = !Objects.isNil(lastAccepted)

  // when has last accepted, odp gets manually merged later in mergeWithLastApproved
  const data = await getTableDataPrevCycle({ ...props, info, mergeOdp: !hasLastAccepted }, client)

  if (hasLastAccepted) {
    const _data = await mergeWithLastApproved({ ...props, data }, client)
    return _withDefaults({ ...props, data: _data })
  }

  return _withDefaults({ ...props, data })
}
