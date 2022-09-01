import defaultYears from './defaultYears'

const buildDefault = (year: any) => ({
  year,
  type: 'fra',
  name: year.toString(),
  forestArea: null as any,
  otherWoodedLand: null as any,
  otherLand: null as any,
})

export default defaultYears.map(buildDefault)
