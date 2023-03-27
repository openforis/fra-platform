import { Response } from 'express'

import { CycleDataRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { MetadataController } from '@server/controller/metadata'
import Requests from '@server/utils/requests'

const excludedVariables = ['totalLandArea']
const excludedColumns = ['percentOfForestArea2015Default']

export const clearTable = async (req: CycleDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, sectionName, tableName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
    })

    const tableSpec = await MetadataController.getTable({
      assessment,
      cycle,
      tableName,
    })

    const rows = await MetadataController.getRows({
      assessment,
      tableName,
    })

    const variableNames = rows.reduce((acc, row) => {
      if (!row.props.variableName || excludedVariables.includes(row.props.variableName)) {
        return acc
      }
      return [...acc, row.props.variableName]
    }, [])

    await CycleDataController.deleteNodeValues({
      user: Requests.getUser(req),
      assessment,
      cycle,
      tableName,
      columnNames: tableSpec.props.columnNames[cycle.uuid]?.filter((colName) => !excludedColumns.includes(colName)),
      countryISOs: [countryIso],
      variableNames,
      sectionName,
    })

    return Requests.sendOk(res)
  } catch (e) {
    return Requests.sendErr(res, e)
  }
}
