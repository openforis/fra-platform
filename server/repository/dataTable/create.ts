import * as tableMappings from '@server/dataTable/tableMappings'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as sqlCreator from '@server/dataTable/dataTableSqlCreator'
import * as auditRepository from '@server/repository/audit/auditRepository'

export const create = async (client: any, user: any, countryIso: any, tableSpecName: any, tableData: any) => {
  const mapping = tableMappings.getMapping(tableSpecName)
  // TODO : check section existence
  // @ts-ignore
  const section = mapping.section ? mapping.section : tableSpecName

  await allowedToEditDataCheck(countryIso, user, section)

  const [deleteQuery, deleteQyeryParams] = sqlCreator.createDelete(countryIso, tableSpecName)
  await auditRepository.insertAudit(client, user.id, 'saveTraditionalTable', countryIso, section)
  const insertQueries: any[] = sqlCreator.createInserts(countryIso, tableSpecName, tableData)

  await client.query(deleteQuery, deleteQyeryParams)
  insertQueries.forEach(([queryString, params]) => {
    client.query(queryString, params)
  })
}
