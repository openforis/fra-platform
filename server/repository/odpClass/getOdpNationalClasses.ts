export const getOdpNationalClasses = async (client: any, odpVersionId: any, schemaName = 'public') => {
  const tableName = `${schemaName}.odp_class`
  const res = await client.query(
    `
    SELECT
      name, definition, area,
      forest_percent, other_wooded_land_percent, forest_natural_percent,
      forest_plantation_percent, forest_plantation_introduced_percent, other_planted_forest_percent,
      uuid
    FROM ${tableName}
    WHERE odp_version_id = $1
    ORDER BY id`,
    [odpVersionId]
  )

  return res.rows.map((row: any) => ({
    className: row.name,
    definition: row.definition,
    area: row.area,
    forestPercent: row.forest_percent,
    otherWoodedLandPercent: row.other_wooded_land_percent,
    naturalForestPercent: row.forest_natural_percent,
    plantationPercent: row.forest_plantation_percent,
    plantationIntroducedPercent: row.forest_plantation_introduced_percent,
    otherPlantedPercent: row.other_planted_forest_percent,
    uuid: row.uuid,
  }))
}
