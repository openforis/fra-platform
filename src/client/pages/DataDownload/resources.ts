import { DataDownloadFileName } from 'meta/file/static'

export type DataDownloadResource = {
  idx: number
  name: DataDownloadFileName
  labelKey: string
}

const resources: Array<DataDownloadResource> = [
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

export default resources
