import * as R from 'ramda'

export const addClassData = async (client: any, odpVersionId: any, odp: any) => {
  const nationalInserts = R.map(
    (nationalClass: any) =>
      client.query(
        `INSERT INTO odp_class
        (odp_version_id,
        name,
        definition,
        area,
        forest_percent,
        other_wooded_land_percent,
        forest_natural_percent,
        forest_plantation_percent,
        forest_plantation_introduced_percent,
        other_planted_forest_percent,
        uuid)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          odpVersionId,
          nationalClass.className,
          nationalClass.definition,
          nationalClass.area,
          nationalClass.forestPercent,
          nationalClass.otherWoodedLandPercent,
          nationalClass.naturalForestPercent,
          nationalClass.plantationPercent,
          nationalClass.plantationIntroducedPercent,
          nationalClass.otherPlantedPercent,
          nationalClass.uuid,
        ]
      ),
    odp.nationalClasses
  )
  return await Promise.all(nationalInserts)
}
