import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'
import { getRow } from 'test/migrations/steps/utils/getRow'

import { runCalculations } from './utils/runCalculations'

const tableName = 'growingStockComposition2025'
const colName = 'growingStockPercent'

const preConditionNativeRank = `growingStockComposition2025.nativeRank1.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank2.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank3.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank4.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank5.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank6.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank7.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank8.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank9.growingStockMillionCubicMeter || growingStockComposition2025.nativeRank10.growingStockMillionCubicMeter || growingStockComposition2025.remainingNative.growingStockMillionCubicMeter `
const preConditionIntroducedRank = `growingStockComposition2025.introducedRank1.growingStockMillionCubicMeter || growingStockComposition2025.introducedRank2.growingStockMillionCubicMeter || growingStockComposition2025.introducedRank3.growingStockMillionCubicMeter || growingStockComposition2025.introducedRank4.growingStockMillionCubicMeter || growingStockComposition2025.introducedRank5.growingStockMillionCubicMeter || growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter `

const preCondition = `${preConditionNativeRank} || ${preConditionIntroducedRank}`

const totalNative = `(growingStockComposition2025.nativeRank1.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank2.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank3.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank4.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank5.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank6.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank7.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank8.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank9.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.nativeRank10.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.remainingNative.growingStockMillionCubicMeter || 0)`
const totalIntroduced = `(growingStockComposition2025.introducedRank1.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.introducedRank2.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.introducedRank3.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.introducedRank4.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.introducedRank5.growingStockMillionCubicMeter || 0) + (growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter || 0)`
const totalGrowingStock = `( ${totalNative} + ${totalIntroduced} )`

const _updateTotalGrowingStockFormula = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const totalGrowingStockRow = await getRow({ tableName, variableName: 'totalGrowingStock', cycle, assessment }, client)

  await client.query(
    `update ${schemaName}.row r set props = jsonb_set(r.props, '{calculateFn,${cycle.uuid}}', '"${preCondition} ? ${totalGrowingStock} : null"') where id = $1;`,
    totalGrowingStockRow.id
  )
}
const _updateTotalNativeTreeSpecies = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const totalNativeTreeSpecies = await getRow({ tableName, variableName: 'totalNative', cycle, assessment }, client)
  const col = totalNativeTreeSpecies.cols.find((col) => col.props.colName === colName)

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{calculateFn,${cycle.uuid}}', '"${preConditionNativeRank} ? ((${totalNative}) / ${totalGrowingStock}) * 100 : null"') where id = $1;`,
    col.id
  )
}
const _updateTotalIntroducedTreeSpecies = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const totalIntroducedTreeSpecies = await getRow(
    { tableName, variableName: 'totalIntroduced', cycle, assessment },
    client
  )
  const col = totalIntroducedTreeSpecies.cols.find((col) => col.props.colName === colName)

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{calculateFn,${cycle.uuid}}', '"${preConditionIntroducedRank} ? ((${totalIntroduced}) / ${totalGrowingStock}) * 100 : null"') where id = $1;`,
    col.id
  )
}

const _updateRemainingSpecies = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const remainingIntroduced = await getRow(
    { tableName, variableName: 'remainingIntroduced', cycle, assessment },
    client
  )

  const remainingNative = await getRow({ tableName, variableName: 'remainingNative', cycle, assessment }, client)

  const colIntroduced = remainingIntroduced.cols.find((col) => col.props.colName === colName)
  const colNative = remainingNative.cols.find((col) => col.props.colName === colName)

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{calculateFn,${cycle.uuid}}', '"growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter / ${totalGrowingStock} * 100"') where id = $1;`,
    colIntroduced.id
  )

  await client.query(
    `update ${schemaName}.col c set props = jsonb_set(c.props, '{calculateFn,${cycle.uuid}}', '"growingStockComposition2025.remainingNative.growingStockMillionCubicMeter / ${totalGrowingStock} * 100"') where id = $1;`,
    colNative.id
  )
}
const _updateNumericVariables = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)

  const vars = [
    ...Array.from({ length: 10 }, (_, i) => `nativeRank${i + 1}`),
    ...Array.from({ length: 5 }, (_, i) => `introducedRank${i + 1}`),
  ]

  for (let i = 0; i < vars.length; i += 1) {
    const variableName = vars[i]

    // eslint-disable-next-line no-await-in-loop
    const row = await getRow({ tableName, variableName, cycle, assessment }, client)

    const col = row.cols.find((col) => col.props.colName === colName)

    // eslint-disable-next-line no-await-in-loop
    await client.query(
      `update ${schemaName}.col c set props = jsonb_set(c.props, '{calculateFn,${cycle.uuid}}', '"growingStockComposition2025.${variableName}.growingStockMillionCubicMeter / ${totalGrowingStock} * 100"') where id = $1;`,
      col.id
    )
  }
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)

  await _updateTotalGrowingStockFormula(client)
  await _updateTotalNativeTreeSpecies(client)
  await _updateTotalIntroducedTreeSpecies(client)
  await _updateRemainingSpecies(client)
  await _updateNumericVariables(client)
  await AssessmentController.generateMetaCache(
    {
      assessment,
      cycle,
    },
    client
  )

  const variableNames = [
    ...Array.from({ length: 10 }, (_, i) => `nativeRank${i + 1}`),
    ...Array.from({ length: 5 }, (_, i) => `introducedRank${i + 1}`),
    'totalGrowingStock',
    'totalNative',
    'totalIntroduced',
    'remainingIntroduced',
    'remainingNative',
  ]

  for (let i = 0; i < variableNames.length; i += 1) {
    const variableName = variableNames[i]
    // eslint-disable-next-line no-await-in-loop
    await runCalculations(
      {
        assessment,
        cycle,
        variableName,
        tableName,
      },
      client
    )
  }
}
