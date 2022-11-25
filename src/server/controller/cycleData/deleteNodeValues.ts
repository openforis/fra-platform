import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle, Table } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

type Props = {
  user: User
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  table: Table
  columnNames: string[]
  variableNames: string[]
}

export const deleteNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, table, columnNames, countryISOs, variableNames, user } = props

  return client.tx(async (t) => {
    await DataRepository.deleteNodeValues(
      {
        assessment,
        cycle,
        table,
        columnNames,
        countryISOs,
        variableNames,
      },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: {
            countryISOs,
            table: table.props.name,
            columnNames,
            variableNames,
          },
          section: 'assessment',
          message: ActivityLogMessage.tableValuesClear,
          user,
        },
        assessment,
        cycle,
      },
      t
    )
  })
}
