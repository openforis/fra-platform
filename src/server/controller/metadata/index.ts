import { SectionRedisRepository } from 'server/cache/repository/section'
import { ColRepository } from 'server/db/repository/assessment/col'
import { RowRepository } from 'server/db/repository/assessment/row'
import { SectionRepository } from 'server/db/repository/assessment/section'
import { TableRepository } from 'server/db/repository/assessment/table'
import { TableSectionRepository } from 'server/db/repository/assessment/tableSection'

import { exportAll } from './export/exportAll'
import { importAll } from './export/importAll'
import { addColumn } from './addColumn'
import { createSection } from './createSection'
import { createSubSection } from './createSubSection'
import { createTable } from './createTable'
import { createTableSection } from './createTableSection'
import { removeSection } from './removeSection'
import { removeTable } from './removeTable'
import { removeTableSection } from './removeTableSection'
import { updateSection } from './updateSection'
import { updateSubSection } from './updateSubSection'
import { updateTable } from './updateTable'
import { updateTableSection } from './updateTableSection'

export const MetadataController = {
  // export
  exportAll,
  importAll,

  // section
  getSection: SectionRepository.getOne,
  getSections: SectionRedisRepository.getMany,
  getSectionsMetadata: SectionRedisRepository.getManyMetadata,
  getSubSection: SectionRedisRepository.getSubSection,
  removeSection,
  createSection,
  updateSection,

  // subsection
  createSubSection,
  updateSubSection,

  // tableSection
  getTableSection: TableSectionRepository.getOne,
  createTableSection,
  updateTableSection,
  removeTableSection,

  // table
  getTable: TableRepository.getOne,
  createTable,
  updateTable,
  removeTable,

  // row
  createRow: RowRepository.create,

  // col
  addColumn,
  createCol: ColRepository.create,
}
