/*
 * To create table definition (CREATE TABLE... clause) use this script:
 *
 * ~/<project-home>$ node tools/createTraditionalTable.js <name of the table spec>
 *
 * For spec names, see tableMappings.js (const mappings = ...)
 */
import * as sqlCreator from '../server/traditionalTable/traditionalTableSqlCreator'

if (process.argv.length < 3) {
  console.log(`Usage: ${process.argv[0]} <name of the table spec>`)
  process.exit()
}
const createSql = sqlCreator.createTableDefinition(process.argv[2])
console.log(createSql)
