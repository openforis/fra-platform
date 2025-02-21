import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentName, CycleName, TableName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { UserController } from 'server/controller/user'
import { RowRepository } from 'server/repository/assessment/row'
import { NodeDb } from 'server/repository/assessmentCycle/node'
import { Logger } from 'server/utils/logger'

import { CSV } from '../utils/CSV'
import { ToolsUtils } from '../utils/toolsUtils'

const getDirectories = (source: string) =>
  fs.readdirSync(source).filter((name) => fs.statSync(path.join(source, name)).isDirectory())

type CSVData = {
  countryIso: string
  variableName: string
  colName: string
  value: string
}

const processCSVFiles = async () => {
  try {
    const user = await UserController.getOne({ email: 'fra@fao.org' })
    const assessments = await AssessmentController.getAll({})
    const data: Record<AssessmentName, Record<CycleName, Record<TableName, Array<CSVData>>>> = {}
    const assessmentNames = getDirectories(__dirname)
    await Promises.each(assessmentNames, async (assessmentName) => {
      const assessmentPath = path.join(__dirname, assessmentName)
      const cycles = getDirectories(assessmentPath)

      await Promises.each(cycles, async (cycleName) => {
        const cyclePath = path.join(assessmentPath, cycleName)
        const csvFiles = fs.readdirSync(cyclePath).filter((name) => name.endsWith('.csv'))

        await Promises.each(csvFiles, async (tableName) => {
          const csvPath = path.join(assessmentPath, cycleName, `${tableName}.csv`)
          Logger.info(`Processing ${assessmentName}/${cycleName}/${tableName}:`)

          const value = Objects.camelize(await CSV.read(csvPath))
          Objects.setInPath({ path: [assessmentName, cycleName, tableName], obj: data, value })
        })
      })
    })

    await Promises.each(Object.entries(data), async ([assessmentName, cycleData]) => {
      const assessment = assessments.find((a) => a.props.name === assessmentName)

      await Promises.each(Object.entries(cycleData), async ([cycleName, tableData]) => {
        const cycle = assessment.cycles.find((c) => c.name === cycleName)
        const nodes: Array<NodeDb> = []

        await Promises.each(Object.entries(tableData), async ([tableName, csvData]) => {
          await Promises.each(csvData, async ({ countryIso, value, variableName, colName }) => {
            const row = await RowRepository.getOne({ assessment, tableName, variableName, includeCols: true })

            nodes.push({
              // @ts-ignore
              country_iso: countryIso,
              row_uuid: row.uuid,
              // @ts-ignore
              col_uuid: row.cols.find((c) => c.props.colName === colName).uuid,
              value: { raw: value, imported: true },
            })
          })
        })

        await CycleDataController.TableData.massiveInsert({
          assessment,
          cycle,
          nodes,
          user,
        })
      })
    })
  } catch (error) {
    Logger.error('Error:', error)
  }
}

ToolsUtils.exec(processCSVFiles)
