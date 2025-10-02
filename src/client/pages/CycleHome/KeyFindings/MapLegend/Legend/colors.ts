import { CycleName } from 'meta/assessment/cycle'

type ClimaticDomain = 'boreal' | 'tropical' | 'subtropical' | 'temperate'

export const LegendColors: Record<CycleName, Record<ClimaticDomain, string>> = {
  '2020': {
    boreal: '#34aabf',
    tropical: '#1d5522',
    subtropical: '#bdba3e',
    temperate: '#57a11f',
  },
  '2025': {
    boreal: 'rgb(10, 143, 118)',
    tropical: 'rgb(0, 68, 27)',
    subtropical: 'rgb(134, 181, 5)',
    temperate: 'rgb(0, 102, 0)',
  },
  latest: {
    boreal: 'rgb(10, 143, 118)',
    tropical: 'rgb(0, 68, 27)',
    subtropical: 'rgb(134, 181, 5)',
    temperate: 'rgb(0, 102, 0)',
  },
}
