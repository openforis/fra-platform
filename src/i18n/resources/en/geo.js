module.exports = {
  agreementLevelExplanation:
    'Agreement level N means that at least N of the selected data sources need to agree that a certain pixel is forest area.',
  burnedArea: 'Burned Area',
  chooseAgreementLevel: 'Choose the min. agreement level between selected layers.',
  error: {
    extraEstimation: {
      failedToRetrieve: 'There was a problem retrieving the estimation.',
      unexpectedDuringProcessing: 'Unexpected error during processing.',
    },
    map: {
      failedToLoad: 'There was a problem while loading the map.',
    },
    mosaic: {
      noMosaicAvailableForConfiguration: 'Error: No mosaic available for the selected configuration.',
    },
    statistics: {
      dataUnavailable: 'Data unavailable.',
      failedToFetch: 'An error has occured while fetching the statistics: {{error}}',
      foundNoData: 'Found no data.',
    },
  },
  estimateCustomAgreementArea: 'Estimate Custom Agreement Area',
  forestArea: 'Tree cover area',
  geeAssetId: 'GEE Asset ID',
  globalOpacity: 'Global Opacity',
  landsat: 'Landsat',
  map: 'Map',
  maxCloudCoverage: 'Max Cloud Coverage',
  metersReducerScale: '{{meters}}m Reducer Scale',
  protectedArea: 'Tree cover within protected areas',
  recipes: {
    forest: {
      allGfc10: 'All (GFC Hansen >=10%)',
      allGfc20: 'All (GFC Hansen >=20%)',
      allGfc30: 'All (GFC Hansen >=30%)',
      esriEsa: 'ESRI & ESA',
      esriEsaGlobland2020Gfc10: 'ESRI, ESA, Globland 2020 & GFC Hansen >=10%',
    },
    recipes: 'Recipes',
  },
  satellite: 'Satellite',
  satelliteMosaic: 'Satellite Mosaic',
  sections: {
    burnedArea: {
      layerTitles: {
        modis: 'MODIS',
      },
      title: 'Burned Area',
    },
    forest: {
      layerTitles: {
        agreement: 'Agreement layer',
        copernicus2019: 'Copernicus (2019)',
        customFnf: 'Custom FnF',
        esa2020: 'ESA (2020)',
        esaGlobCover2009: 'ESA GlobCover (2009)',
        esri2020: 'ESRI (2020)',
        globeLand2020: 'GlobeLand (2020)',
        hansenGfc2020: 'Hansen GFC (2020)',
        jaxa2017: 'JAXA (2017)',
        modis: 'MODIS',
        tanDemX2019: 'TanDEM-X (2019)',
      },
      title: 'Tree Cover',
    },
    protectedArea: {
      layerTitles: {
        customProtectedArea: 'Custom Protected Area',
        filteredWdpa: 'Filtered WDPA',
        wdpa: 'WDPA',
      },
      title: 'Protected Area',
    },
  },
  selectMinTreeCoverPercent: 'Select min. tree cover percentage:',
  sentinel: 'Sentinel',
  showSatelliteMosaic: 'Show Satellite Mosaic',
  statistics: {
    burnedArea: {
      burnedAreaByYear: 'Burned area by year',
    },
    forestArea: {
      extentOfForestPerSource: 'Extent of tree cover per source and as reported to FRA {{year}}',
      extentOfForestTreeCover: 'Extent of tree cover by source',
      forestAreaHa: 'Tree cover area, ha',
      forestAreaPercentOfLandArea: 'Tree cover area % of land area',
      landArea: 'Land area',
    },
    graphs: 'Statistical Graphs',
    protectedArea: {
      allGfc10: 'All (GFC Hansen >=10%)',
      allGfc20: 'All (GFC Hansen >=20%)',
      allGfc30: 'All (GFC Hansen >=30%)',
    },
    title: 'Statistics',
  },
}
