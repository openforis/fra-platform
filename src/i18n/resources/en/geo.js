module.exports = {
  agreementLevelExplanation:
    'Agreement level N means that at least N of the selected data sources need to agree that a certain pixel is forest area.',
  chooseAgreementLevel: 'Choose the min. agreement level between selected layers.',
  error: {
    extraEstimation: {
      failedToRetrieve: 'There was a problem retrieving the estimation.',
      unexpectedDuringProcessing: 'Unexpected error during processing.',
    },
    mosaic: {
      noMosaicAvailableForConfiguration: 'Error: No mosaic available for the selected configuration.',
    },
  },
  estimateCustomAgreementArea: 'Estimate Custom Agreement Area',
  metersReducerScale: '{{meters}}m Reducer Scale',
  geeAssetId: 'GEE Asset ID',
  globalOpacity: 'Global Opacity',
  landsat: 'Landsat',
  maxCloudCoverage: 'Max Cloud Coverage',
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
  satelliteMosaic: 'Satellite Mosaic',
  sections: {
    burnedArea: {
      layerTitles: {
        modis: 'MODIS',
      },
      title: 'Burned Area Layers',
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
      title: 'Forest Layers',
    },
    protectedArea: {
      layerTitles: {
        customProtectedArea: 'Custom Protected Area',
        filteredWdpa: 'Filtered WDPA',
        wdpa: 'WDPA',
      },
      title: 'Protected Area Layers',
    },
  },
  selectMinTreeCoverPercent: 'Select min. tree cover percentage:',
  sentinel: 'Sentinel',
  showSatelliteMosaic: 'Show Satellite Mosaic',
}
