import '../scriptInit'

import fs from 'node:fs'
import path from 'node:path'

import { CountryIso } from 'meta/area/countryIso'
import { Assessments } from 'meta/assessment/assessments'
import { NodeValue } from 'meta/assessment/node'
import { RowCaches } from 'meta/assessment/rowCaches'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { UserEmails } from 'meta/user/emails'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { RowRedisRepository } from 'server/cache/repository/row'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { TableDataController } from 'server/controller/cycleData/tableData'
import { UserController } from 'server/controller/user'
import { Logger } from 'server/utils/logger'

import { CSV } from '../utils/CSV'
import { ToolsUtils } from '../utils/toolsUtils'

const getDirectories = (source: string): Array<string> =>
  fs.readdirSync(source).filter((name) => fs.statSync(path.join(source, name)).isDirectory())

type CSVData = {
  country_iso: CountryIso
  variable_name: string
  col_name: string
  value: string
}

const processCSVFiles = async (): Promise<void> => {
  try {
    const user = await UserController.getOne({ email: UserEmails.robot, allowDisabled: true })
    const assessments = await AssessmentController.getAll({ metaCache: true })
    const assessmentNames = getDirectories(__dirname)

    await Promises.each(assessmentNames, async (assessmentName) => {
      const assessment = assessments.find((a) => a.props.name === assessmentName)
      const assessmentPath = path.join(__dirname, assessmentName)
      const cycles = getDirectories(assessmentPath)
      const rows = await RowRedisRepository.getRows({ assessment })

      await Promises.each(cycles, async (cycleName) => {
        const cycle = Assessments.getCycle({ assessment, cycleName })
        const cyclePath = path.join(assessmentPath, cycleName)
        const csvFiles = fs
          .readdirSync(cyclePath)
          .filter((name) => name.endsWith('.csv'))
          .map((name) => name.replace('.csv', ''))

        const countryNodes: { [key in CountryIso]?: Array<NodeUpdate> } = {}

        await Promises.each(csvFiles, async (tableName) => {
          const csvPath = path.join(assessmentPath, cycleName, `${tableName}.csv`)
          Logger.info(`Processing ${assessmentName}/${cycleName}/${tableName}:`)

          const csvData = await CSV.read<CSVData>(csvPath)

          csvData.forEach((csvData) => {
            const { col_name: colName, country_iso: countryIso, value: raw, variable_name: variableName } = csvData
            const rowKey = RowCaches.getKey({ tableName, variableName })
            const row = rows[rowKey]
            const col = row.cols.find((c) => c.props.colName === colName)

            if (Objects.isNil(row) || Objects.isNil(col)) {
              Logger.error(`Error: column or row not found for variableName ${variableName} and colName ${colName}`)
              Logger.error({ row, col })
            } else {
              const value: NodeValue = { raw, imported: true }
              const nodeUpdate: NodeUpdate = { tableName, variableName, colName, value }
              const nodeUpdates = countryNodes[countryIso] ?? []
              Objects.setInPath({ obj: countryNodes, path: [countryIso], value: [...nodeUpdates, nodeUpdate] })
            }
          })
        })

        const countriesMap = await AreaController.getCountriesMap({ assessment, cycle })

        await Promises.each(Object.entries(countryNodes), async ([countryIso, nodes]) => {
          const country = countriesMap[countryIso as CountryIso]
          await TableDataController.massiveInsert({
            assessment,
            cycle,
            country,
            countryNodes: { [countryIso]: nodes },
            user,
          })
        })
      })
    })
  } catch (error) {
    Logger.error('Error:', error)
  }
}

ToolsUtils.exec(processCSVFiles)
