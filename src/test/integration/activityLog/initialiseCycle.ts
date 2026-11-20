import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'
import { User } from 'meta/user/user'

import { CacheController } from 'server/cache/controller'
import { RowRedisRepository } from 'server/cache/repository/row'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { TableDataController } from 'server/controller/cycleData/tableData'
import { MetadataController } from 'server/controller/metadata'

import { sectionParams, subSectionParams } from 'test/integration/mock/section'
import { calculatedRowParams, colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { tableSectionParams } from 'test/integration/mock/tableSection'

// Populate cycle with section, subsection, tablesection, table, row, calculated row and columns
// This is required for renameCycle which expects the base cycle metadata and cache to exist
export const initialiseCycle = async (props: {
  assessment: Assessment
  cycle: Cycle
  user: User
}): Promise<Section> => {
  const { assessment, cycle, user } = props
  const cycles = [cycle.uuid]

  const section = await MetadataController.createSection({ assessment, section: sectionParams(cycle.uuid), user })
  const subSection = await MetadataController.createSubSection({
    assessment,
    parentSectionUuid: section.uuid,
    section: subSectionParams(cycle.uuid),
    user,
  })
  const tableSection = await MetadataController.createTableSection({
    assessment,
    tableSection: { props: { ...tableSectionParams.props, cycles }, sectionUuid: subSection.uuid },
    user,
  })
  const table = await MetadataController.createTable({
    assessment,
    table: { props: { ...tableParams.props, cycles }, tableSectionUuid: tableSection.uuid },
    user,
  })
  const row = await MetadataController.createRow({ assessment, cycles: [cycle], rowProps: rowParams, table })
  await MetadataController.createCol({ assessment, colProps: colParams, cycles: [cycle], row })
  const calculatedRow = await MetadataController.createRow({
    assessment,
    cycles: [cycle],
    rowProps: calculatedRowParams(cycle.uuid),
    table,
  })
  await MetadataController.createCol({ assessment, colProps: colParams, cycles: [cycle], row: calculatedRow })

  await SectionRedisRepository.getMany({ assessment, cycle, force: true })
  await RowRedisRepository.getRows({ assessment, force: true })
  await SectionRedisRepository.getManyMetadata({ assessment, cycle, force: true })
  await TableDataController.refreshViews({ assessment, cycle })
  await CacheController.generateData({ assessment, cycle })
  await CacheController.generateMetaCache({ assessments: [assessment] })

  // return section
  // removing it cascades subsection, table section, table, row and column
  return section
}
