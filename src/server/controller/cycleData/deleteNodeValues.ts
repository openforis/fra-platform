import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

type Props = {
  user: User
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tableName: string
  columnNames: string[]
  variableNames: string[]
  sectionName: string
}

export const deleteNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, tableName, columnNames, countryISOs, variableNames, user, sectionName } = props

  return client.tx(async (t) => {
    await DataRepository.deleteNodeValues(
      {
        assessment,
        cycle,
        tableName,
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
            tableName,
            columnNames,
            variableNames,
          },
          section: sectionName,
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
