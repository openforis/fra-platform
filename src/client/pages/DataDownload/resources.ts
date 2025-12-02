import { DataDownloadFileName } from 'meta/file/static'

export type DataDownloadResource = {
  idx: number
  name: DataDownloadFileName
  labelKey: string
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _resources: Array<DataDownloadResource> = [
  {
    idx: 1,
    name: DataDownloadFileName.ForestExtentCharacteristicsAndChanges,
    labelKey: 'navigation.sectionHeaders.forestExtentCharacteristicsAndChanges',
  },
  {
    idx: 2,
    name: DataDownloadFileName.ForestGrowingStockBiomassAndCarbon,
    labelKey: 'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon',
  },
  {
    idx: 3,
    name: DataDownloadFileName.ForestDesignationAndManagement,
    labelKey: 'navigation.sectionHeaders.forestDesignationAndManagement',
  },
  {
    idx: 4,
    name: DataDownloadFileName.ForestOwnershipAndManagementRights,
    labelKey: 'navigation.sectionHeaders.forestOwnershipAndManagementRights',
  },
  {
    idx: 6,
    name: DataDownloadFileName.PermanentForestEstate,
    labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
  },
]

const resources: Array<DataDownloadResource> = []

export default resources
