import * as Chart from './chart'
// example output
// const chartData = {
//   fra: [
//     {
//       id: '231',
//       odpId: '231',
//       year: 1990,
//       countryIso: 'FIN',
//       dataSourceMethods: null,
//       forestArea: '21875.33000000000000000000',
//       naturalForestArea: '17484.9512690000000000',
//       otherPlantedForestArea: '4368.5034010000000000',
//       otherWoodedLandArea: '925.90000000000000000000',
//       plantationForestArea: '21.8753300000000000',
//       plantationForestIntroducedArea: '21.8753300000000000',
//       type: 'odp',
//     },
//     {
//       id: '232',
//       odpId: '232',
//       year: 2000,
//       countryIso: 'FIN',
//       dataSourceMethods: null,
//       forestArea: '22445.64000000000000000000',
//       naturalForestArea: '17301.0993120000000000',
//       otherPlantedForestArea: '5119.8504840000000000',
//       otherWoodedLandArea: '823.48000000000000000000',
//       plantationForestArea: '24.6902040000000000',
//       plantationForestIntroducedArea: '24.6902040000000000',
//       type: 'odp',
//     },
//     '{countryIso: "FIN", dataSourceMethods: null, forest…}',
//     '{countryIso: "FIN", dataSourceMethods: null, forest…}',
//     '{forestArea: "22409.00", forestAreaEstimated: true,…}',
//     '{forestArea: "22409.00", forestAreaEstimated: true,…}',
//     '{forestArea: "22409.00", forestAreaEstimated: true,…}',
//     {
//       forestArea: '22409.00',
//       otherWoodedLand: '746.00',
//       name: '2019',
//       type: 'fra',
//       year: 2019,
//       forestAreaEstimated: true,
//       otherWoodedLandEstimated: true,
//     },
//     '{forestArea: "22409.00", forestAreaEstimated: true,…}',
//   ],
//   wrapperWidth: 1242,
//   trends: [
//     '{color: "#0098a6", label: "Forest", name: "forestAr…}',
//     '{color: "#bf00af", label: "Other wooded land", name…}',
//   ],
// }

const chartData = {
  forestArea: [
    {
      year: 1990,
      value: 21875.33,
      type: 'odp',
      dataSourceMethods: null,
    },
    {
      year: 2000,
      value: 22445.64,
      type: 'odp',
      dataSourceMethods: null,
    },
    {
      year: 2010,
      value: 22242,
      type: 'odp',
      dataSourceMethods: null,
    },
    {
      year: 2015,
      value: 22409,
      type: 'odp',
      dataSourceMethods: null,
    },
    {
      year: 2016,
      value: 22409,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2017,
      value: 22409,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2018,
      value: 22409,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2019,
      value: 22409,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2020,
      value: 22409,
      type: 'fra',
      estimated: true,
    },
  ],
  otherWoodedLand: [
    {
      year: 2016,
      value: 746,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2017,
      value: 746,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2018,
      value: 746,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2019,
      value: 746,
      type: 'fra',
      estimated: true,
    },
    {
      year: 2020,
      value: 746,
      type: 'fra',
      estimated: true,
    },
  ],
}

export default (data: any, trends: any, width: any) => {
  // const chartData = trends.reduce(
  //   (dataAccumulator: any, { name }: any) => ({
  //     ...dataAccumulator,
  //     [name]: Chart.getChartData(data, name),
  //   }),
  //   {}
  // )

  const xScale = Chart.getXScale(width, data)
  const yScale = Chart.getYScale(data)

  return { chartData, xScale, yScale }
}
