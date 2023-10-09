import { Assessment, AssessmentMetaCaches, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { ContextFactory } from 'server/controller/cycleData/updateDependencies/context'
import { updateCalculationDependencies } from 'server/controller/cycleData/updateDependencies/updateCalculationDependencies'
import { BaseProtocol } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'

type Props = {
  assessment: Assessment
  cycle: Cycle
  variableName: string
  tableName: string
}

export const updateCalculatedVariable = async (props: Props, client: BaseProtocol) => {
  const { assessment, cycle, variableName, tableName } = props

  const nodes: Array<NodeUpdate> = [
    {
      tableName,
      variableName,
    } as NodeUpdate,
  ]

  const countryISOs = (await AreaController.getCountries({ assessment, cycle }, client)).map((c) => c.countryIso)

  const exists = AssessmentMetaCaches.getCalculationsDependants({
    assessment,
    cycle,
    tableName,
    variableName,
  }).find((d) => d.tableName === tableName && d.variableName === variableName)

  // make self dependant if it is not already
  if (!exists) {
    assessment.metaCache[cycle.uuid].calculations.dependants[tableName] = {
      ...(assessment.metaCache[cycle.uuid].calculations.dependants[tableName] || {}),
      [variableName]: [
        {
          tableName,
          variableName,
        },
      ],
    }
  }
  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const nodeUpdates: NodeUpdates = {
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        nodes,
      }

      const contextProps = { assessment, cycle, isODP: false, nodeUpdates }
      const context = await ContextFactory.newInstance(contextProps)

      const ts = Date.now()

      const { nodesDb } = updateCalculationDependencies({ context, jobId: `migration_step-${ts}` })
      await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)
    })
  )
}
