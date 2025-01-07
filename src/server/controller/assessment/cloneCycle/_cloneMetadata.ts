import { Col, Row, Table, TableSection } from 'meta/assessment'

import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { SectionRepository } from 'server/repository/assessment/section'
import { TableRepository } from 'server/repository/assessment/table'
import { TableSectionRepository } from 'server/repository/assessment/tableSection'
import { SectionRedisRepository } from 'server/repository/redis/section'

export const cloneMetadata = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  // clone metadata
  const sections = await SectionRedisRepository.getMany({ assessment, cycle: cycleSource }, client)
  const sectionNames = sections.flatMap((section) => section.subSections.map((subSection) => subSection.props.name))
  const metadata = await SectionRedisRepository.getManyMetadata(
    { assessment, cycle: cycleSource, sectionNames },
    client
  )

  const tableSections: Array<TableSection> = []
  const tables: Array<Table> = []
  const rows: Array<Row> = []
  const cols: Array<Col> = []
  Object.values(metadata).forEach((_tableSections) => {
    tableSections.push(..._tableSections)
    _tableSections.forEach((_tableSection) => {
      const _tables = _tableSection.tables
      tables.push(..._tables)
      _tables.forEach((_table) => {
        const _rows = _table.rows
        rows.push(..._rows)
        _rows.forEach((_row) => {
          cols.push(..._row.cols)
        })
      })
    })
  })

  // persist cloned metadata
  await Promise.all([
    SectionRepository.cloneMany({ assessment, cycleSource, cycleTarget, sections }, client),
    TableSectionRepository.cloneMany({ assessment, cycleSource, cycleTarget, tableSections }, client),
    TableRepository.cloneMany({ assessment, cycleSource, cycleTarget, tables }, client),
    RowRepository.cloneMany({ assessment, cycleSource, cycleTarget, rows }, client),
    ColRepository.cloneMany({ assessment, cycleSource, cycleTarget, cols }, client),
  ])
}
