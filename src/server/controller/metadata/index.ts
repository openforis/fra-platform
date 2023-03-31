import { SectionRepository } from '@server/repository/assessment/section'
import { TableRepository } from '@server/repository/assessment/table'
import { TableSectionRepository } from '@server/repository/assessment/tableSection'

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
  getSection: SectionRepository.getOne,
  getSections: SectionRepository.getMany,
  getSectionsMetadata: SectionRepository.getManyMetadata,
  removeSection,
  createSection,
  updateSection,

  createSubSection,
  updateSubSection,

  getTableSection: TableSectionRepository.getOne,
  createTableSection,
  updateTableSection,
  removeTableSection,

  getTable: TableRepository.getOne,
  createTable,
  updateTable,
  removeTable,
}
