import { Response } from 'express'
import { UUIDs } from 'utils/uuids'

import { CycleDataRequest, EstimateBody } from 'meta/api/request'
import { NodeValueEstimationMethod, NodeValuesEstimation, Table, TableNames } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { MetadataController } from 'server/controller/metadata'
import { EstimationEngine, GenerateSpec, GenerateSpecMethod } from 'server/service/estimates/estimationEngine'
import Requests from 'server/utils/requests'

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
    createdAt: '',
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

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const tableNameOdp = TableNames.originalDataPointValue
    const [table, data] = await Promise.all([
      MetadataController.getTable({ assessment, cycle, tableName }),
      CycleDataController.getTableData({ assessment, cycle, countryISOs: [countryIso], tableNames: [tableNameOdp] }),
    ])

    const propsTableData = { assessmentName, cycleName, countryIso, tableName: tableNameOdp, data }
    const tableData = RecordAssessmentDatas.getTableData(propsTableData)
    const odpYears = Object.keys(tableData)
    const years = table.props.columnNames[cycle.uuid].reduce<Array<number>>((acc, column: string) => {
      if (!odpYears.includes(column)) {
        acc.push(Number(column))
      }
      return acc
    }, [])

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
      // originalDataPointValues[assessment.props.name][cycle.name],
      RecordAssessmentDatas.getCycleData({ assessmentName, cycleName, data }),
      generateSpec,
      tableName,
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

    const nodeValueEstimations = await CycleDataController.getNodeValuesEstimations({
      assessment,
      countryIso,
      cycle,
      tableName,
    })

    return Requests.sendOk(res, { nodes, nodeValueEstimations })
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
