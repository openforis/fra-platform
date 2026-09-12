import { TableValidationTestCase } from '../../types'
import { agroforestry } from './agroforestry'
import { other } from './other'
import { palms } from './palms'
import { treeOrchards } from './tree_orchards'
import { treesInUrbanSettings } from './trees_in_urban_settings'

export const otherLandWithTreeCover: Array<TableValidationTestCase> = [
  ...agroforestry,
  ...other,
  ...palms,
  ...treeOrchards,
  ...treesInUrbanSettings,
]
