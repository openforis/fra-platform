import { CycleNames } from 'meta/assessment/cycle/names'
import { Years } from 'meta/assessment/years'

import { buildYears } from 'server/controller/cycleData/bulkDownload/metadata/_buildYears'
import { AreaOfPermanentForestEstateBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/areaOfPermanentForestEstate'
import { BiomassStockAvgBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/biomassStockAvg'
import { BiomassStockTotalBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/biomassStockTotal'
import { CarbonStockAvgBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/carbonStockAvg'
import { CarbonStockSoilDepthBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/carbonStockSoilDepth'
import { CarbonStockTotalBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/carbonStockTotal'
import { DegradedForestBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/degradedForest'
import { EmploymentBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/employment'
import { ExtentOfForestBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/extentOfForest'
import { ForestAreaWithinProtectedAreasBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/forestAreaWithinProtectedAreas'
import { ForestCharacteristicsBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/forestCharacteristics'
import { ForestOwnershipBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/forestOwnership'
import { ForestPolicyBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/forestPolicy'
import { GraduationOfStudentsBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/graduationOfStudents'
import { GrowingStockAvgBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/growingStockAvg'
import { GrowingStockCompositionBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/growingStockComposition'
import { GrowingStockTotalBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/growingStockTotal'
import { HolderOfManagementRightsBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/holderOfManagementRights'
import { OtherLandWithTreeCoverBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/otherLandWithTreeCover'
import { PrimaryDesignatedManagementObjectiveBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/primaryDesignatedManagementObjective'
import { PrimaryForestByClimaticDomainBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/primaryForestByClimaticDomain'
import { SpecificForestCategoriesBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/specificForestCategories'
import { TotalAreaWithDesignatedManagementObjectiveBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/totalAreaWithDesignatedManagementObjective'
import { BulkDownloadFilesFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'

export const buildFraYears: BulkDownloadFilesFactory = (props) => {
  const { cycle } = props
  const { name: cycleName } = cycle
  const is2020 = cycleName === CycleNames._2020

  const fileName = 'FRA_Years'
  const includeDeskStudy = true
  const years = Years.fraYears(cycle)
  const builders = [
    ExtentOfForestBuilder,
    ForestCharacteristicsBuilder,
    ...(is2020 ? [] : [PrimaryForestByClimaticDomainBuilder]),
    SpecificForestCategoriesBuilder,
    OtherLandWithTreeCoverBuilder,
    GrowingStockAvgBuilder,
    GrowingStockTotalBuilder,
    GrowingStockCompositionBuilder,
    BiomassStockAvgBuilder,
    ...(is2020 ? [] : [BiomassStockTotalBuilder]),
    CarbonStockAvgBuilder,
    ...(is2020 ? [] : [CarbonStockTotalBuilder]),
    CarbonStockSoilDepthBuilder,
    PrimaryDesignatedManagementObjectiveBuilder,
    TotalAreaWithDesignatedManagementObjectiveBuilder,
    ForestAreaWithinProtectedAreasBuilder,
    ForestOwnershipBuilder,
    HolderOfManagementRightsBuilder,
    DegradedForestBuilder,
    ForestPolicyBuilder,
    AreaOfPermanentForestEstateBuilder,
    ...(is2020 ? [EmploymentBuilder, GraduationOfStudentsBuilder] : []),
  ]

  return buildYears({ ...props, builders, fileName, includeDeskStudy, includeFlag: true, years })
}
