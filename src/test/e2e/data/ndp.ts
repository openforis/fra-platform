import { type ODPNationalClass } from 'meta/assessment/originalDataPoint'

/**
 * National classes based on FRA 2025 Finland 2020
 */
const getDefaultClasses = (): Array<ODPNationalClass> => [
  { name: 'Forest', area: '22543', forestPercent: '100', otherWoodedLandPercent: '0' },
  { name: 'Other land', area: '7099', forestPercent: '0', otherWoodedLandPercent: '0' },
  { name: 'Other wooded land', area: '752', forestPercent: '0', otherWoodedLandPercent: '100' },
]

// Comments based on FRA 2025 Finland 2020 (same text length and similar symbols and numbers)
const getDefaultDataSourcesV1Reference = (): string =>
  '<p>Lorem et al. 2023, consectetur adipisicing elit. Ducimus eaque 1921-2023 magni, maxime, natus necessitatibus, nihil perferendis praesentium quidem quisquam</p>'

const getDefaultComments = (): string =>
  '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus (eaque eligendi) magni</p>'

// Option label for ODPDataSourceMethod.nationalForestInventory
const getDefaultDataSourcesV1Method = (): string => 'National Forest Inventory'

const getDefaultDataSourcesV1Comments = (): string =>
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. 2019-2022 + ipsum dolor magni, maxime, natus necessitatibus, nihil perferendis quidem 2018 for Ipsum region'

export const NdpData = {
  getDefaultClasses,
  getDefaultComments,
  getDefaultDataSourcesV1Comments,
  getDefaultDataSourcesV1Method,
  getDefaultDataSourcesV1Reference,
}
