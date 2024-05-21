import { AssessmentNames, ColProps, ColType, Table, TableName, TableSection } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol } from 'server/db'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const sectionNames = ['disturbances', 'areaAffectedByFire']
const colProps: ColProps = { colName: '2023', colType: ColType.decimal }

const findTable = (tableSections: Array<TableSection>, tableName: TableName): Table => {
  for (let i = 0; i < tableSections.length; i += 1) {
    const table = tableSections[i].tables.find((table) => table.props.name === tableName)
    if (table) return table
  }
  return undefined
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const sectionsMetadata = await MetadataController.getSectionsMetadata({ assessment, cycle, sectionNames }, client)

  await Promise.all(
    sectionNames.map((sectionName) => {
      const table = findTable(sectionsMetadata[sectionName], sectionName)
      return MetadataController.addColumn({ assessment, cycles: [cycle], table, colProps }, client)
    })
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
