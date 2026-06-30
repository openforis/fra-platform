import { CycleName } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'

type ClimaticDomain = 'boreal' | 'tropical' | 'subtropical' | 'temperate'

export const LegendColors: Record<CycleName, Record<ClimaticDomain, string>> = {
  [CycleNames._2020]: {
    boreal: '#34aabf',
    tropical: '#1d5522',
    subtropical: '#bdba3e',
    temperate: '#57a11f',
  },
  [CycleNames._2025]: {
    boreal: 'rgb(10, 143, 118)',
    tropical: 'rgb(0, 68, 27)',
    subtropical: 'rgb(134, 181, 5)',
    temperate: 'rgb(0, 102, 0)',
  },
  [CycleNames.latest]: {
    boreal: 'rgb(10, 143, 118)',
    tropical: 'rgb(0, 68, 27)',
    subtropical: 'rgb(134, 181, 5)',
    temperate: 'rgb(0, 102, 0)',
  },
  [CycleNames.latest2]: {
    boreal: 'rgb(10, 143, 118)',
    tropical: 'rgb(0, 68, 27)',
    subtropical: 'rgb(134, 181, 5)',
    temperate: 'rgb(0, 102, 0)',
  },
}
