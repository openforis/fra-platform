import { CycleNames } from 'meta/assessment/cycle/names'
import { Years } from 'meta/assessment/years'

import { getAreaOfPermanentForestEstate } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/areaOfPermanentForestEstate'
import { getBiomassStockAvg } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/biomassStockAvg'
import { getBiomassStockTotal } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/biomassStockTotal'
import { getCarbonStockAvg } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/carbonStockAvg'
import { getCarbonStockSoilDepth } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/carbonStockSoilDepth'
import { getCarbonStockTotal } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/carbonStockTotal'
import { getDegradedForest } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/degradedForest'
import { getEmployment } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/employment'
import { getExtentOfForest } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/extentOfForest'
import { getForestAreaWithinProtectedAreas } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestAreaWithinProtectedAreas'
import { getForestCharacteristics } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestCharacteristics'
import { getForestOwnership } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestOwnership'
import { getForestPolicy } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestPolicy'
import { getGraduationOfStudents } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/graduationOfStudents'
import { getGrowingStockAvg } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/growingStockAvg'
import { getGrowingStockComposition } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/growingStockComposition'
import { getGrowingStockTotal } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/growingStockTotal'
import { getHolderOfManagementRights } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/holderOfManagementRights'
import { getOtherLandWithTreeCover } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/otherLandWithTreeCover'
import { getPrimaryDesignatedManagementObjective } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/primaryDesignatedManagementObjective'
import { getSpecificForestCategories } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/specificForestCategories'
import { getTotalAreaWithDesignatedManagementObjective } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/totalAreaWithDesignatedManagementObjective'
import { BulkDownloadYearFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import { BulkDownloadYear } from 'server/controller/cycleData/getBulkDownload/types'

export const getFraYears: BulkDownloadYearFactory = (props) => {
  const { cycle } = props
  const { name: cycleName } = cycle

  const fileName: BulkDownloadYear['fileName'] = 'FRA_Years'
  const years: BulkDownloadYear['years'] = Years.fraYears(cycle)
  const tables: BulkDownloadYear['tables'] = [
    getExtentOfForest(props),
    getForestCharacteristics(props),
    getSpecificForestCategories(props),
    getOtherLandWithTreeCover(props),
    getGrowingStockAvg(props),
    getGrowingStockTotal(props),
    getGrowingStockComposition(props),
    getBiomassStockAvg(props),
    ...(cycleName === CycleNames._2020 ? [] : [getBiomassStockTotal(props)]),
    getCarbonStockAvg(props),
    ...(cycleName === CycleNames._2020 ? [] : [getCarbonStockTotal(props)]),
    getCarbonStockSoilDepth(props),
    getPrimaryDesignatedManagementObjective(props),
    getTotalAreaWithDesignatedManagementObjective(props),
    getForestAreaWithinProtectedAreas(props),
    getForestOwnership(props),
    getHolderOfManagementRights(props),
    getDegradedForest(props),
    getForestPolicy(props),
    getAreaOfPermanentForestEstate(props),
    ...(cycleName === CycleNames._2020 ? [getEmployment(props)] : []),
    ...(cycleName === CycleNames._2020 ? [getGraduationOfStudents(props)] : []),
  ]

  return { fileName, years, tables }
}
