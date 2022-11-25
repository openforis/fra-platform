export const entries = [
  {
    tableName: 'disturbances',
    variables: [
      {
        csvColumn: '5a_insect',
        variableName: 'insects',
      },
      {
        csvColumn: '5a_diseases',
        variableName: 'diseases',
      },
      {
        csvColumn: '5a_weather',
        variableName: 'severe_weather_events',
      },
      {
        csvColumn: '5a_other',
        variableName: 'other',
      },
    ],
  },
  {
    tableName: 'areaAffectedByFire',
    variables: [
      {
        csvColumn: '5b_fire_land',
        variableName: 'total_land_area_affected_by_fire',
      },
      {
        csvColumn: '5b_fire_forest',
        variableName: 'of_which_on_forest',
      },
    ],
  },
]
