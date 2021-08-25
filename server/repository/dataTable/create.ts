import * as tableMappings from '@server/dataTable/tableMappings'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'
import * as auditRepository from '@server/repository/audit/auditRepository'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db'

export const create = async (
  params: {
    countryIso: CountryIso
    user: User
    tableSpecName: string
    tableData: Array<Array<string | null>>
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { countryIso, user, tableSpecName, tableData } = params
  const mapping = tableMappings.getMapping(tableSpecName)
  // TODO : check section existence
  // @ts-ignore
  const section = mapping.section ? mapping.section : tableSpecName

  await allowedToEditDataCheck(countryIso, user, section)

  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  await auditRepository.insertAudit(client, user.id, 'saveTraditionalTable', countryIso, section)
  const insertQueries: any[] = sqlCreator.createInserts(countryIso, tableSpecName, tableData)

  await client.tx(async (t) => {
    await t.query(deleteQuery, deleteQyeryParams)
    insertQueries.forEach(([queryString, params]) => {
      t.query(queryString, params)
    })
  })
}
