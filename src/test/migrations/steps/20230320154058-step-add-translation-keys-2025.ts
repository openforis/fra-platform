import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName: 'fra', cycleName: '2025' }, client)

  const schemaName = Schemas.getName(assessment)

  // Update label keys for given columns:
  const cols = await client.map(
    `
  select *
  from ${schemaName}.col
  where
      props -> 'cycles' ? $1::text and
      props -> 'labels' -> $1 ->> 'key' in
        (
         'extentOfForest.totalLandArea',
         'forestCharacteristics.naturalForestArea',
         'forestAreaChange.forestExpansion',
         'growingStockComposition.nativeTreeSpecies',
         'growingStockComposition.introducedTreeSpecies',
         'biomassStock.aboveGround', -- 2 rows
         'biomassStock.belowGround', -- 2 rows
         'biomassStock.deadWood', -- 2 rows
         'growingStock.naturallyRegeneratingForest', -- 2 rows
         'carbonStock.carbonAboveGroundBiomass', -- 2 rows
         'carbonStock.carbonBelowGroundBiomass', -- 2 rows,
         'disturbances.severeWeatherEvents'
        );
  `,
    [cycle.uuid],
    (row) => {
      // eslint-disable-next-line no-param-reassign
      row.props.labels[cycle.uuid].key = `fra.${row.props.labels[cycle.uuid].key}2025`
      return row
    }
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const col of cols) {
    // eslint-disable-next-line no-await-in-loop
    await client.query(`update ${schemaName}.col set props = $1::jsonb where id = $2`, [JSON.stringify(col.props), col.id])
  }

  // update label keys for given sections:
  const sections = await client.map(
    `
        select *
        from ${schemaName}.section
        where props -> 'labels' -> $1 ->> 'key' in
              (
               'forestAreaChange.forestAreaChange',
               'otherLandWithTreeCover.otherLandWithTreeCover',
               'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon', -- navigation top level parent,
               'biomassStock.biomassStock',
               'carbonStock.carbonStock',
               'navigation.sectionHeaders.forestDesignationAndManagement',
               'navigation.sectionHeaders.forestOwnershipAndManagementRights',
               'forestOwnership.forestOwnership',
               'navigation.sectionHeaders.forestDisturbances'
                  );
  `,
    [cycle.uuid],
    (section) => {
      // eslint-disable-next-line no-param-reassign
      section.props.labels[cycle.uuid].key = `fra.${section.props.labels[cycle.uuid].key}2025`
      return section
    }
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const section of sections) {
    // eslint-disable-next-line no-await-in-loop
    await client.query(`update ${schemaName}.section set props = $1::jsonb where id = $2`, [JSON.stringify(section.props), section.id])
  }
}
