import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { RowCaches } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { UserController } from 'server/controller/user'
import { NodeDb } from 'server/repository/assessmentCycle/node'
import { RowRedisRepository } from 'server/repository/redis/row'
import { Logger } from 'server/utils/logger'

import { CSV } from '../utils/CSV'
import { ToolsUtils } from '../utils/toolsUtils'

const getDirectories = (source: string) =>
  fs.readdirSync(source).filter((name) => fs.statSync(path.join(source, name)).isDirectory())

type CSVData = {
  countryIso: CountryIso
  variableName: string
  colName: string
  value: string
}

const processCSVFiles = async () => {
  try {
    const user = await UserController.getOne({ email: 'fra@fao.org' })
    const assessments = await AssessmentController.getAll({})
    const assessmentNames = getDirectories(__dirname)

    await Promises.each(assessmentNames, async (assessmentName) => {
      const assessment = assessments.find((a) => a.props.name === assessmentName)
      const assessmentPath = path.join(__dirname, assessmentName)
      const cycles = getDirectories(assessmentPath)

      await Promises.each(cycles, async (cycleName) => {
        const cycle = assessment.cycles.find((c) => c.name === cycleName)
        const cyclePath = path.join(assessmentPath, cycleName)
        const csvFiles = fs
          .readdirSync(cyclePath)
          .filter((name) => name.endsWith('.csv'))
          .map((name) => name.replace('.csv', ''))

        const nodes: Array<NodeDb> = []

        await Promises.each(csvFiles, async (tableName) => {
          const csvPath = path.join(assessmentPath, cycleName, `${tableName}.csv`)
          Logger.info(`Processing ${assessmentName}/${cycleName}/${tableName}:`)

          const csvData = Objects.camelize(await CSV.read(csvPath)) as CSVData[]
          const rows = await RowRedisRepository.getRows({ assessment })

          await Promises.each(csvData, async ({ countryIso, value, variableName, colName }) => {
            const rowKey = RowCaches.getKey({ tableName, variableName })
            const row = rows[rowKey]

            const node = {
              country_iso: countryIso,
              row_uuid: row.uuid,
              col_uuid: row.cols.find((c) => c.props.colName === colName).uuid,
              value: { raw: value, imported: true },
            }

            nodes.push(node)
          })
        })

        await CycleDataController.TableData.massiveInsert({ assessment, cycle, nodes, user })
      })
    })
  } catch (error) {
    Logger.error('Error:', error)
  }
}

ToolsUtils.exec(processCSVFiles)
