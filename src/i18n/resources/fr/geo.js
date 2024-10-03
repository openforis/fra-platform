module.exports = {
  agreementLevelExplanation:
    "Le niveau d'accord N signifie qu'au moins N des sources de données sélectionnées doivent être d'accord sur le fait qu'un pixel donné est une zone avec un couvert arboré.",
  burnedArea: 'Zone incendiée',
  burnedAreaWithUnit: '$t(geo.burnedArea) ({{unit}})',
  chooseAgreementLevel: "Choisissez le niveau d'accord minimum requis entre les couches sélectionnées.",
  customAgreementArea: "Superficie de la couche d'accord personnalisée",
  error: {
    extraEstimation: {
      failedToRetrieve: "Il y a eu un problème pour récupérer l'estimation.",
      unexpectedDuringProcessing: 'Erreur inattendue pendant le traitement.',
    },
    map: {
      failedToLoad: 'Il y a eu un problème lors du chargement de la carte.',
    },
    mosaic: {
      noMosaicAvailableForConfiguration: 'Erreur : pas de mosaïque disponible avec la configuration sélectionnée.',
    },
    statistics: {
      dataUnavailable: 'Données non disponibles.',
      failedToFetch: "Une erreur s'est produite lors de l'extraction des statistiques : {{error}}",
      foundNoData: 'Aucune donnée disponible.',
    },
  },
  estimateCustomAgreementArea: "Estimation de la superficie avec l'accord personnalisé",
  forestArea: 'Superficie du couvert arboré',
  geeAssetId: 'GEE Asset ID',
  globalOpacity: 'Opacité globale',
  landsat: 'Landsat',
  map: 'Carte',
  maxCloudCoverage: 'Couverture nuageuse maximale',
  metersReducerScale: 'Échelle de réduction {{meters}}m',
  recipes: {
    forest: {
      allGfc10: 'Tous (GFC Hansen >=10%)',
      allGfc20: 'Tous (GFC Hansen >=20%)',
      allGfc30: 'Tous (GFC Hansen >=30%)',
      esriEsa: 'ESRI et ESA',
      esriEsaGlobland2020Gfc10: 'ESRI, ESA, Globland 2020 et GFC Hansen >=10%',
    },
    recipes: 'Recettes',
  },
  reportedToFra2020: 'Rapporté à FRA 2020',
  satellite: 'Satellite',
  satelliteMosaic: 'Mosaïque satellite',
  sections: {
    burnedArea: {
      layerTitles: {
        modis: 'MODIS',
      },
      title: 'Zone brûlée',
    },
    forest: {
      layerTitles: {
        agreement: "Couche d'accord",
        copernicus2019: 'Copernicus (2019)',
        customFnf: 'FnF personnalisée',
        esa2020: 'ESA (2020)',
        esaGlobCover2009: 'ESA GlobCover (2009)',
        esri2020: 'ESRI (2020)',
        globeLand2020: 'GlobeLand (2020)',
        hansenGfc2020: 'Hansen GFC (2020)',
        hansenGfc2020WithPercent: '$t(geo.sections.forest.layerTitles.hansenGfc2020) {{hansenPercent}} %',
        jaxa2017: 'JAXA (2017)',
        modis: 'MODIS',
        tanDemX2019: 'TanDEM-X (2019)',
      },
      title: 'Couvert arboré',
    },
    protectedArea: {
      layerTitles: {
        customProtectedArea: 'Aires protégées personnalisées',
        filteredWdpa: 'WDPA filtrée',
        wdpa: 'WDPA',
      },
      title: 'Aires protégées',
    },
  },
  selectMinTreeCoverPercent: 'Sélectionner le pourcentage minimum de couvert arboré:',
  sentinel: 'Sentinel',
  showSatelliteMosaic: 'Montrer la mosaïque satellite',
  snowMasking: 'Masquage de la neige',
  statistics: {
    burnedArea: {
      burnedAreaByYear: 'Superficie incendiée par année',
    },
    forestArea: {
      extentOfForestPerSource: 'Étendue du couvert arboré par source et telle que rapporté à FRA {{year}}',
      extentOfForestTreeCover: 'Étendue du couvert arboré par source',
      forestAreaHa: 'Superficie du couvert arboré, ha',
      forestAreaPercentOfLandArea: 'Superficie du couvert arboré en % de la superficie des terres',
      landArea: 'Superficie des terres',
    },
    graphs: 'Graphiques statistiques',
    protectedArea: {
      allGfc10: 'Tous (GFC Hansen >=10%)',
      allGfc20: 'Tous (GFC Hansen >=20%)',
      allGfc30: 'Tous (GFC Hansen >=30%)',
    },
    title: 'Statistiques',
  },
  treeCoverAgreementSelected: 'Accord sélectionné sur le couvert arboré',
  treeCoverProtectedAreas: 'Couvert arboré dans les zones protégées',
  treeCoverProtectedAreasWithUnit: '$t(geo.treeCoverProtectedAreas) ({{unit}})',
}
