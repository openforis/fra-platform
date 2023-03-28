import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { User } from '@meta/user'

import { scheduleUpdateDependencies } from '@server/controller/cycleData/updateDependencies'
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

    const nodeUpdatesPersisted = {
      assessment,
      cycle,
      countryIso: countryISOs[0],
      nodes: variableNames.flatMap((variableName) => {
        return columnNames.flatMap((colName) => {
          return {
            tableName,
            variableName,
            colName,
            value: { raw: null },
          }
        })
      }),
    }

    // // schedule dependencies update
    await scheduleUpdateDependencies({
      nodeUpdates: nodeUpdatesPersisted,
      sectionName,
      user,
    })

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
