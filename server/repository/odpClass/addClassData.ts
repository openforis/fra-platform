import { BaseProtocol, DB } from '@server/db'

import { ODP, ODPNationalClass } from '@core/odp'

export const addClassData = async (options: { odpVersionId: number | string; odp: ODP }, client: BaseProtocol = DB) => {
  const { odpVersionId, odp } = options
  const nationalInserts = odp.nationalClasses.map((nationalClass: ODPNationalClass) =>
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
        nationalClass.name,
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
    )
  )
  return Promise.all(nationalInserts)
}
