import { Assessment, Col, Cycle, Row, Table, TableSection } from 'meta/assessment'
import { User } from 'meta/user'

import { createCycle } from 'server/controller/assessment/createCycle'
import { TableData } from 'server/controller/cycleData/tableData'
import { BaseProtocol, DB } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { SectionRepository } from 'server/repository/assessment/section'
import { TableRepository } from 'server/repository/assessment/table'
import { TableSectionRepository } from 'server/repository/assessment/tableSection'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { CountryActivityLogRepository } from 'server/repository/assessmentCycle/countryActivityLog'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { SectionRedisRepository } from 'server/repository/redis/section'

type Props = {
  assessment: Assessment
  cycle: Cycle
  name: string
  user: User
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const cloneCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { cycle: cycleSource } = props

  return client.tx(async (t) => {
    // create cycle
    const { assessment, cycle: cycleTarget } = await createCycle(props, t)

    // clone metadata
    const sections = await SectionRedisRepository.getMany({ assessment, cycle: cycleSource }, t)
    const sectionNames = sections.flatMap((section) => section.subSections.map((subSection) => subSection.props.name))
    const metadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle: cycleSource, sectionNames }, t)

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
      SectionRepository.cloneMany({ assessment, cycleSource, cycleTarget, sections }, t),
      TableSectionRepository.cloneMany({ assessment, cycleSource, cycleTarget, tableSections }, t),
      TableRepository.cloneMany({ assessment, cycleSource, cycleTarget, tables }, t),
      RowRepository.cloneMany({ assessment, cycleSource, cycleTarget, rows }, t),
      ColRepository.cloneMany({ assessment, cycleSource, cycleTarget, cols }, t),
    ])

    // generate materialized views
    const countryISOs = await CountryRepository.getCountryIsos({ assessment, cycle: cycleTarget }, t)
    await Promise.all([
      TableData.refreshViews({ assessment, cycle: cycleTarget }),
      CountrySummaryRepository.createMaterializedView({ assessment, cycle: cycleTarget }),
      ...countryISOs.map((countryIso) =>
        CountryActivityLogRepository.createMaterializedView({ assessment, cycle: cycleTarget, countryIso })
      ),
    ])

    return { assessment, cycle: cycleTarget }
  })
}
