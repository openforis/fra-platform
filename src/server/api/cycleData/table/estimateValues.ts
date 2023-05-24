import { UUIDs } from '@utils/uuids'
import { Response } from 'express'

import { CycleDataRequest, EstimateBody } from '@meta/api/request'
import { NodeValueEstimationMethod, NodeValuesEstimation, Table } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { MetadataController } from '@server/controller/metadata'
import { EstimationEngine, GenerateSpec, GenerateSpecMethod } from '@server/service/estimates/estimationEngine'
import Requests from '@server/utils/requests'

/**
 * @deprecated
 */
const generateSpecToEstimation = (props: { generateSpec: GenerateSpec; table: Table }): NodeValuesEstimation => {
  const { generateSpec, table } = props

  const variables = generateSpec.fields.reduce<NodeValuesEstimation['variables']>((acc, field) => {
    const options = generateSpec.method === 'annualChange' ? { changeRates: generateSpec.changeRates?.[field] } : {}
    return { ...acc, [field]: options }
  }, {})

  return {
    method: generateSpec.method as NodeValueEstimationMethod,
    uuid: UUIDs.v4(),
    tableUuid: table.uuid,
    variables,
  }
}

// TODO: future task -> request body should be NodeValuesEstimation
export const estimateValues = async (req: CycleDataRequest<never, EstimateBody>, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName } = req.query
    const { method, tableName, fields } = req.body
    const user = Requests.getUser(req)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const table = await MetadataController.getTable({ assessment, cycle, tableName })
    const originalDataPointValues = await CycleDataController.getOriginalDataPointData({
      countryISOs: [countryIso],
      cycle,
      assessment,
    })

    const years = table.props.columnNames[cycle.uuid].map((column: string) => Number(column))

    const changeRates: Record<string, { rateFuture: number; ratePast: number }> = {}
    fields.forEach((field) => {
      changeRates[field.variableName] = {
        rateFuture: Number(field.annualChangeRates.future),
        ratePast: Number(field.annualChangeRates.past),
      }
    })

    const generateSpec: GenerateSpec = {
      method: method as GenerateSpecMethod,
      fields: fields.map((field) => field.variableName),
      changeRates,
    }

    const estimation = generateSpecToEstimation({ generateSpec, table })
    const nodes = EstimationEngine.estimateValues(
      years,
      originalDataPointValues,
      generateSpec,
      table.props.name,
      estimation
    )

    if (nodes.length) {
      await CycleDataController.persistNodeValuesEstimated({
        assessment,
        countryIso,
        cycle,
        estimation,
        nodes,
        sectionName,
        user,
      })
    }

    return Requests.sendOk(res, nodes)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
