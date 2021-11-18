import defaultYears from './defaultYears'

const buildDefault = (year: any) => ({
  year,
  type: 'fra',
  name: year.toString(),
  naturalForestArea: null as any,
  plantationForestArea: null as any,
  plantationForestIntroducedArea: null as any,
  otherPlantedForestArea: null as any,
})

export default defaultYears.map(buildDefault)

