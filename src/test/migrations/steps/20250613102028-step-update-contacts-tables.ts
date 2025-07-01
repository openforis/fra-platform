import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment/assessment'
import { ColType } from 'meta/assessment/col'
import { Table, TableVisibility } from 'meta/assessment/table'
import { User, UsersEmail } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { UserController } from 'server/controller/user'
import { BaseProtocol, Schemas } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'

const updatePrivate = async (props: { user: User }, client: BaseProtocol): Promise<void> => {
  const { user } = props
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )
  const table = await MetadataController.getTable({ assessment, cycle, tableName: 'contactPersons' }, client)
  // const visibility: Array<TableVisibility> = ['private']
  const visibility = assessment.cycles.reduce<Table['props']['visibility']>((acc, cycle) => {
    if (cycle.name === '2020') return acc
    return { ...acc, [cycle.uuid]: [TableVisibility.private] }
  }, {})
  const tableProps: Table['props'] = { ...table.props, visibility }
  await MetadataController.updateTable({ assessment, table, user, tableProps }, client)
}

const updatePublic = async (props: { user: User }, client: BaseProtocol): Promise<void> => {
  const { user } = props
  const tableName = 'reportLastUpdate'
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: 'latest' },
    client
  )
  await client.query(`delete from ${Schemas.getName(assessment)}."table" t where t.props->>'name'='${tableName}'`)
  const sectionsMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle }, client)
  const table = sectionsMetadata.contactPersons
    .flatMap((ts) => ts.tables)
    .find((t) => t.props.name === 'contactPersons')
  // const table = await MetadataController.getTable({ assessment, cycle, tableName: 'contactPersons' }, client)
  const tableClone: Table = {
    ...table,
    id: undefined,
    uuid: undefined,
    props: {
      ...table.props,
      name: tableName,
      cycles: [cycle.uuid],
      visibility: { [cycle.uuid]: [TableVisibility.public] },
    },
  }
  const tableCreated = await MetadataController.createTable({ user, assessment, table: tableClone }, client)

  table.rows[1].props.variableName = tableName
  table.rows[1].cols[0].props.labels = { [cycle.uuid]: { key: 'fra.contactPersons.reportLastUpdate' } }
  table.rows[1].cols[1].props.colType = ColType.calculated
  table.rows[1].cols[1].props.calculateFn = { [cycle.uuid]: `getYear($country.lastInPublished)` }
  table.rows[1].cols[1].props.calculateClientSide = { [cycle.uuid]: true }
  await Promises.each(table.rows, async (row) => {
    const rowCreated = await MetadataController.createRow(
      {
        assessment,
        cycles: [cycle],
        table: tableCreated,
        rowProps: row.props,
      },
      client
    )

    await Promises.each(row.cols, async (col) => {
      await MetadataController.createCol({ assessment, cycles: [cycle], row: rowCreated, colProps: col.props }, client)
    })
  })

  await DataRepository.createOrReplaceTableDataView({ assessment, cycle, table: tableCreated })
}

export default async (client: BaseProtocol) => {
  const user = await UserController.getOne({ email: UsersEmail.robot, allowDisabled: true }, client)
  await updatePrivate({ user }, client)
  await updatePublic({ user }, client)

  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
