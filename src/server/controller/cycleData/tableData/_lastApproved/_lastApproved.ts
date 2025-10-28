import { Objects } from 'utils/objects'

import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { BaseProtocol } from 'server/db/db'
import { DataRepository } from 'server/db/repository/assessmentCycle/data'

import { mergeOdpCountryData } from '../_mergeOdpCountryData'
import { getTablesCondition } from '../_tablesCondition'
import { PropsGetLastApproved } from './_types'

type Props = PropsGetLastApproved & {
  data: RecordAssessmentData
}

export const mergeWithLastApproved = async (props: Props, client: BaseProtocol): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, data, tableNames } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  let dataLastApproved = await DataRepository.getTableDataLastApproved(props, client)

  const tables = getTablesCondition({ tableNames, mergeOdp: true })
  if (tables[TableNames.originalDataPointValue]) {
    const odpDataLastApproved = await DataRepository.getOriginalDataPointDataLastApproved(props, client)
    dataLastApproved = Objects.merge(dataLastApproved, odpDataLastApproved)

    await mergeOdpCountryData({ assessment, cycle, countryISOs, data: dataLastApproved, tables }, client)
  }

  return Objects.merge(data, { [assessmentName]: { [cycleName]: dataLastApproved } })
}
