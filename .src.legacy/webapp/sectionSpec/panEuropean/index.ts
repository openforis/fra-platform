import forestArea from '@webapp/sectionSpec/panEuropean/table_1_1a/sectionSpec'
import forestAreaByForestTypes from '@webapp/sectionSpec/panEuropean/table_1_1b/sectionSpec'
import growingStock from '@webapp/sectionSpec/panEuropean/table_1_2a/sectionSpec'
import growingStockByForestType from '@webapp/sectionSpec/panEuropean/table_1_2b/sectionSpec'
import growingStockComposition from '@webapp/sectionSpec/panEuropean/table_1_2c/sectionSpec'
import ageClassDistributionAreaOfEvenAgedStands from '@webapp/sectionSpec/panEuropean/table_1_3a1/sectionSpec'
import ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply from '@webapp/sectionSpec/panEuropean/table_1_3a2/sectionSpec'
import diameterDistributionAndTotalAreaUnevenAgedStands from '@webapp/sectionSpec/panEuropean/table_1_3b/sectionSpec'
import carbonStock from '@webapp/sectionSpec/panEuropean/table_1_4a/sectionSpec'
import carbonStockInHarvestedWoodProductsHWP from '@webapp/sectionSpec/panEuropean/table_1_4b/sectionSpec'
import forestAreaWithDamage from '@webapp/sectionSpec/panEuropean/table_2_4/sectionSpec'
import areaWithForestLandDegradation from '@webapp/sectionSpec/panEuropean/table_2_5/sectionSpec'
import incrementAndFellings from '@webapp/sectionSpec/panEuropean/table_3_1/sectionSpec'
import removals from '@webapp/sectionSpec/panEuropean/table_3_2/sectionSpec'
import nonWoodGoods2015 from '@webapp/sectionSpec/panEuropean/table_3_3/sectionSpec'
import marketedServices2015 from '@webapp/sectionSpec/panEuropean/table_3_4/sectionSpec'
import treeSpeciesComposition from '@webapp/sectionSpec/panEuropean/table_4_1/sectionSpec'
import totalForestAreaByExpansionAndRegenerationType from '@webapp/sectionSpec/panEuropean/table_4_2a/sectionSpec'
import annualForestExpansionAndRegeneration from '@webapp/sectionSpec/panEuropean/table_4_2b/sectionSpec'
import naturalness from '@webapp/sectionSpec/panEuropean/table_4_3a/sectionSpec'
import naturalnessBySubclasses from '@webapp/sectionSpec/panEuropean/table_4_3b/sectionSpec'
import introducedTreeSpecies from '@webapp/sectionSpec/panEuropean/table_4_4a/sectionSpec'
import introducedTreeSpecies44b from '@webapp/sectionSpec/panEuropean/table_4_4b/sectionSpec'
import invasiveTreeSpecies from '@webapp/sectionSpec/panEuropean/table_4_4c/sectionSpec'
import deadwood from '@webapp/sectionSpec/panEuropean/table_4_5/sectionSpec'
import threatenedForestSpecies from '@webapp/sectionSpec/panEuropean/table_4_8/sectionSpec'
import protectedForests from '@webapp/sectionSpec/panEuropean/table_4_9/sectionSpec'
import protectiveForestsSoilWaterAndOtherEcosystemFunctions from '@webapp/sectionSpec/panEuropean/table_5_1/sectionSpec'
import forestHoldings from '@webapp/sectionSpec/panEuropean/table_6_1/sectionSpec'
import grossValueAdded from '@webapp/sectionSpec/panEuropean/table_6_2/sectionSpec'
import factorIncomeAndEntrepreneurialIncome from '@webapp/sectionSpec/panEuropean/table_6_3/sectionSpec'
import totalGrossFixedCapitalFormationInForestsAndForestry from '@webapp/sectionSpec/panEuropean/table_6_4a/sectionSpec'
import totalFixedCapitalConsumptionInForestsAndForestry from '@webapp/sectionSpec/panEuropean/table_6_4b/sectionSpec'
import totalCapitalTransfersInForestsAndForestry from '@webapp/sectionSpec/panEuropean/table_6_4c/sectionSpec'
import employmentByGenderAndAge from '@webapp/sectionSpec/panEuropean/table_6_5a/sectionSpec'
import employmentByEducationAndJobCharacteristics from '@webapp/sectionSpec/panEuropean/table_6_5b/sectionSpec'
import occupationalAccidents from '@webapp/sectionSpec/panEuropean/table_6_6/sectionSpec'
import woodConsumption from '@webapp/sectionSpec/panEuropean/table_6_7/sectionSpec'
import tradeInWood from '@webapp/sectionSpec/panEuropean/table_6_8/sectionSpec'
import totalEnergySupplyFromWood from '@webapp/sectionSpec/panEuropean/table_6_9/sectionSpec'
import accessibilityForRecreation from '@webapp/sectionSpec/panEuropean/table_6_10a/sectionSpec'
import intensityOfUse from '@webapp/sectionSpec/panEuropean/table_6_10b/sectionSpec'
import recreationFacilities from '@webapp/sectionSpec/panEuropean/table_6_10c/sectionSpec'
import otherRecreationFacilitiesPilotReporting2015 from '@webapp/sectionSpec/panEuropean/table_6_10d/sectionSpec'

import { SectionSpec } from '../sectionSpec'

const PanEuropeanSpecs: Record<string, SectionSpec> = {
  [forestArea.sectionName]: forestArea,
  [forestAreaByForestTypes.sectionName]: forestAreaByForestTypes,
  [growingStock.sectionName]: growingStock,
  [growingStockByForestType.sectionName]: growingStockByForestType,
  [growingStockComposition.sectionName]: growingStockComposition,
  [ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.sectionName]:
    ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply,
  [ageClassDistributionAreaOfEvenAgedStands.sectionName]: ageClassDistributionAreaOfEvenAgedStands,
  [diameterDistributionAndTotalAreaUnevenAgedStands.sectionName]: diameterDistributionAndTotalAreaUnevenAgedStands,
  [carbonStock.sectionName]: carbonStock,
  [carbonStockInHarvestedWoodProductsHWP.sectionName]: carbonStockInHarvestedWoodProductsHWP,
  [forestAreaWithDamage.sectionName]: forestAreaWithDamage,
  [areaWithForestLandDegradation.sectionName]: areaWithForestLandDegradation,
  [incrementAndFellings.sectionName]: incrementAndFellings,
  [removals.sectionName]: removals,
  [nonWoodGoods2015.sectionName]: nonWoodGoods2015,
  [marketedServices2015.sectionName]: marketedServices2015,
  [treeSpeciesComposition.sectionName]: treeSpeciesComposition,
  [totalForestAreaByExpansionAndRegenerationType.sectionName]: totalForestAreaByExpansionAndRegenerationType,
  [annualForestExpansionAndRegeneration.sectionName]: annualForestExpansionAndRegeneration,
  [naturalness.sectionName]: naturalness,
  [naturalnessBySubclasses.sectionName]: naturalnessBySubclasses,
  [introducedTreeSpecies.sectionName]: introducedTreeSpecies,
  [introducedTreeSpecies44b.sectionName]: introducedTreeSpecies44b,
  [invasiveTreeSpecies.sectionName]: invasiveTreeSpecies,
  [deadwood.sectionName]: deadwood,
  [threatenedForestSpecies.sectionName]: threatenedForestSpecies,
  [protectedForests.sectionName]: protectedForests,
  [protectiveForestsSoilWaterAndOtherEcosystemFunctions.sectionName]:
    protectiveForestsSoilWaterAndOtherEcosystemFunctions,
  [forestHoldings.sectionName]: forestHoldings,
  [grossValueAdded.sectionName]: grossValueAdded,
  [factorIncomeAndEntrepreneurialIncome.sectionName]: factorIncomeAndEntrepreneurialIncome,
  [totalGrossFixedCapitalFormationInForestsAndForestry.sectionName]:
    totalGrossFixedCapitalFormationInForestsAndForestry,
  [totalFixedCapitalConsumptionInForestsAndForestry.sectionName]: totalFixedCapitalConsumptionInForestsAndForestry,
  [totalCapitalTransfersInForestsAndForestry.sectionName]: totalCapitalTransfersInForestsAndForestry,
  [employmentByGenderAndAge.sectionName]: employmentByGenderAndAge,
  [employmentByEducationAndJobCharacteristics.sectionName]: employmentByEducationAndJobCharacteristics,
  [occupationalAccidents.sectionName]: occupationalAccidents,
  [woodConsumption.sectionName]: woodConsumption,
  [tradeInWood.sectionName]: tradeInWood,
  [totalEnergySupplyFromWood.sectionName]: totalEnergySupplyFromWood,
  [accessibilityForRecreation.sectionName]: accessibilityForRecreation,
  [intensityOfUse.sectionName]: intensityOfUse,
  [recreationFacilities.sectionName]: recreationFacilities,
  [otherRecreationFacilitiesPilotReporting2015.sectionName]: otherRecreationFacilitiesPilotReporting2015,
}

export default PanEuropeanSpecs
