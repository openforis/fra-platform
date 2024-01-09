// eslint-disable-next-line @typescript-eslint/no-var-requires
const print = require('./print')

module.exports = {
  print,

  // common
  area100HaYear: 'Superficie (1000 ha)',
  categoryHeader2020: 'Catégories de FRA 2020',
  categoryHeader2025: 'Catégories de FRA 2025',
  forestArea100HaYear: 'Superficie forestière (1000 ha)',
  area100Ha: 'Superficie (1 000 ha)',
  areaAffectedByFire: {
    areaAffected: 'Superficie touchée (1 000 ha)',
    areaAffectedByFire2025: '$t(areaAffectedByFire.areaAffectedByFire)',
    totalLandAreaAffectedByFire2025: 'Superficie totale des terres touchées par des incendies',
  },
  biomassStock: {
    biomassStock2025: 'Stock de biomasse',
  },
  biomassStockAvg: {
    forestBiomass: 'Biomasse de la forêt (t/ha)',
  },
  biomassStockTotal: {
    totalForestBiomass: 'Biomasse totale de la forêt (en million de tonnes)',
  },
  carbonStock: {
    carbonStock2025: 'Stock de carbone',
  },
  carbonStockTotal: {
    totalForestCarbon: 'Carbone total de la forêt (en million de tonnes)',
  },
  climaticDomain: {
    percentOfForestArea: '% de la superficie de forêt',
  },
  contactPersons: {
    expectedYearForNextCountryReportUpdate: 'Année prévue pour la prochaine mise à jour du rapport national',
  },
  degradedForest: {
    degradedForest: 'Forêt dégradée',
    degradedForestDefinition: 'Définition de la forêt dégradée',
    forestDegradationMonitoringAndAssessment: 'Evaluation et suvi de la dégradation des forêts',
    degradedAreaForThatYear: 'Superficie de forêt dégradée pour cette année-là (1 000 ha)',
    doesYourCountryMonitor: 'Votre pays assure-t-il un suivi de la superficie de forêts dégradée',
    hasNationalDefinitionOfDegradedForest: 'Votre pays dispose-t-il d’une définition de la « forêt dégradée » ?',
    hasNationalLevelData: 'Si des données sont disponibles à l’échelle nationale',
    howMonitored: 'Décrire le processus de suivi  et les résultats',
    ifYes: 'Si « Oui »',
    whatIsDefinition: 'Quelle est la définition nationale de la « forêt dégradée » ?',
    yearOfLatestAssessment: 'Année de la dernière évaluation',
    other: 'Autre (expliquer dans les commentaires)',
    notSelected: '',
    criteriaOfDegradedForest: 'Critères utilisés dans la définition de la forêt dégradée',
    changeInForestStructureDecreaseInForestCanopy:
      'Changement dans la structure de la forêt / Diminution du couvert forestier',
    forestDisturbances: 'Perturbations forestières',
    lossOfProductivityAndForestGoods: 'Pertes de la productivité et de biens forestiers',
    lossOfForestServices: 'Perte de services forestiers',
    lossOfCarbonBiomassAndGrowingStock: 'Perte de carbone, de biomasse et de matériel sur pied',
    lossOfBiologicalDiversity: 'Perte de diversité biologique',
    soilDamageErosion: 'Dommages au sol / érosion',
    mainMethods: 'Principales méthodes appliquées pour assurer un suivi de la superficie de forêt dégradée',
    fieldInventoryAndObservations: 'Inventaire et observations sur le terrain',
    wallToWallRemoteSensingMapping: 'Cartographie complète par télédétection',
    remoteSensingSurvey: 'Enquête par télédétection',
    expertOpinion: "Avis d'experts",
    productionHarvestData: 'Données de production/récolte',
    forestManagementPlanReport: 'Rapports des plans de gestion forestière',
    underDevelopment: 'En cours de développement',
    monitoringScale: 'Échelle du suivi',
    national: 'Nationale',
    subnational: 'Sous-nationale',
    biome: 'Biome',
    standLocal: 'Peuplement / Locale',
    criteriaOfDegradedForest2025: 'Critères appliqués dans la définition de la forêt dégradée',
  },
  designatedManagementObjective: {
    designatedManagementObjective2025: 'Objectif de gestion fixés',
    noDesignation: 'Aucune affectation',
    unknown2025: 'Affectation inconnue',
  },
  disturbances: {
    forestDamage: 'Dommages causés aux forêts',
    predominantCause: 'Cause prédominante',
    forestAreaAffected: 'Superficie de forêt touchée (1 000 ha)',
    severeWeatherEvents2025: 'Phénomènes météorologiques graves',
  },
  extentOfForest: {
    remainingLandArea: 'Terres restantes',
    extentOfForest2025: '$t(extentOfForest.extentOfForest)',
    otherWoodedLand: '$t(fraClass.otherWoodedLand)',
  },
  forestAreaChange: {
    forestAreaChange2025: 'Expansion de la forêt, déforestation et changement net annuels',
    forestAreaNetChange2025: 'Changement net de la superficie de forêt (a-b)',
  },
  forestAreaWithinProtectedAreas: {
    forestAreaWithLongTermManagementPlan2025: 'Superficie de forêt soumise à un plan de gestion à long terme',
    forestAreaWithinProtectedAreas2025:
      'Superficie de forêt se trouvant à l’intérieur d’aires protégées juridiquement constituées et superficie de forêt soumise à des plans de gestion à long terme',
  },
  forestCharacteristics: {
    ofWhichOtherPlantedForest: '...dont autres forêts plantées',
    primaryForest: '...dont forêt primaire',
    plantationForestIntroducedArea2025: "...dont d'espèces introduites",
    otherPlantedForest2025: '...dont autres forêts plantées',
  },
  forestOwnership: {
    ofWhichPrivateBusinesses2025: '...dont appartenant à des entités et institutions commerciales privées',
    ofWhichCommunities2025: '...dont Peuples autochtones et aux communautés locales',
    other2025: 'Autres formes de propriété (préciser dans les commentaires)',
    unknown2025: 'Propriété inconnue',
    total2025: 'Total',
  },
  forestRestoration: {
    forestRestoration: 'Restauration des forêts',
    hasYourCountryForestRestorationCommitments:
      'Votre pays a-t-il pris des engagements en faveur de la restauration des forêts? ',
    isThereALawOrOtherGovernmentMandateInSupportOfRestoration:
      'Existe-t-il une loi ou un autre mandat gouvernemental en soutien à la restauration des forêts ?',
    isThereANationalDefinitionOfRestoration:
      'Existe-t-il une définition nationale de la « restauration des forêts »? Si « Oui », indiquer cette définition, le processus de suivi et les résultats.',
    whatAreasInNeedOfRestorationHaveBeenIdentified:
      'Quelles sont les zones nécessitant une restauration des forêts qui ont été identifiées et, le cas échéant, comment ont-elles été identifiées ?',
    whatAreTheTargetsSetForTheRestoration:
      'Quelles sont les objectifs fixés pour la restauration des forêts ? Par exemple, xxx hectares d’ici à l’année yyyy',
    howManyHectaresOfForestHaveBeenRestoredToDate: 'Combien d’hectares de forêts ont été restaurés à ce jour ?',
    ifYes: 'Si « Oui »',
  },
  growingStock: {
    totalForest: 'Total Forêt (a+b)',
    naturallyRegeneratingForest2025: 'Forêt naturellement régénérée (a)',
    plantedForest2025: 'Forêts plantées (b)',
    otherPlantedForest2025: '...dont autres forêts plantées',
  },
  growingStockComposition: {
    millionCubicMeter: 'Millions de m³',
    mostRecentYear: 'Année la plus récente',
    percentOfTotal: '% du total',
    ranked: 'Classée #{{idx}}',
    totalGrowingStock: 'TOTAL Matériel sur pied ',
    totalIntroducedTreeSpecies: 'TOTAL Espèces d’arbres introduites ',
    totalNativeTreeSpecies: 'TOTAL Espèces d’arbres indigènes ',
    nativeTreeSpecies2025: 'Espèces d’arbres indigènes',
    remainingNative2025: 'Autres espèces d’arbres indigènes',
    introducedTreeSpecies2025: 'Espèces d’arbres introduite',
    remainingIntroduced2025: 'Autres espèces d’arbres introduites',
  },
  holderOfManagementRights: {
    holderOfManagementRights2025: 'Droits de gestion des forêts publiques',
    privateBusinesses2025: 'Entités et institutions commerciales privées',
    communities2025: 'Peuples autochtones et communautés locales ',
    other2025: 'Autres formes de droits de gestion (préciser dans les commentaires)',
    unknown2025: 'Droits de gestion inconnus',
  },
  otherWoodedLand: {
    otherWoodedLand2025: 'Autres terres boisées',
  },
  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals2025: 'Extraction et valeur des produits forestiers non ligneux en 2020',
    nameOfProduct2025: 'Nom du produit PFNL',
    allOtherPlantProducts2025: 'Tout autre produit végétal',
    allOtherAnimalProducts2025: 'Tout autre produit animal',
    currency2025: 'Nom de la monnaie',
  },
  otherLandWithTreeCover: {
    otherLandWithTreeCover2025: 'Autres terres avec un couvert arboré',
    agroforestry2025: 'Systèmes agroforestiers',
    other2025: 'Autre (à préciser)',
  },
  primaryForestByClimaticDomain: {
    primaryForestByClimaticDomain: 'Forêt primaire par domaine climatique',
    primaryForestBoreal: '...dont forêt primaire boréale',
    primaryForestTemperate: '...dont forêt primaire tempérée',
    primaryForestTropical: '...dont  forêt primaire tropicale',
    primaryForestSubTropical: '...dont l forêt primaire subtropicale',
    totalPrimaryForest: 'Total Forêt primaire',
  },
  specificForestCategories: {
    specificForestCategories2025: 'Catégories spécifiques de forêts',
    mangroves2025: 'Mangroves¹',
    rubberWood2025: 'Hévéas',
    mangrovesDisclaimer:
      '¹Pour la catégorie « Mangroves », la superficie doit inclure celles des « Forêts » et des « Autres terres boisées »',
  },
  forestPolicy: {
    forestPolicy2025:
      'Politiques, législation et plateforme nationale de participation des parties prenantes à l’élaboration des politiques forestières',
    policiesSFM2025: 'Politiques d’appui à la gestion durable des forêts (GDF)',
    legislationsSFM2025: 'Législations et/ou règlementations en faveur de la GDF',
    stakeholderParticipation2025:
      'Plateforme de participation des parties prenantes à l’élaboration de politiques forestières',
    existenceOfTraceabilitySystem2025: 'Système de traçabilité des produits ligneux',
  },
  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate2025: 'Superficie des domaines forestiers permanents',
  },
  sustainableDevelopment: {
    annualForestAreaChangeRate: 'Taux de changement annuel de la superficie forestière',
    sdgIndicator1_2025: 'Indicateur ODD 15.1.1: Surface des zones forestières, en proportion de la surface terrestre ',
    forestAreaProportionLandArea: 'Surface des zones forestières, en proportion de la surface terrestre ',
    aboveGroundBiomassStockForests2025: 'Stock de biomasse aérienne dans les forêts',
    proportionForestAreaLegallyEstablishedProtectedAreas2025:
      'Proportion de la superficie forestière se trouvant dans des aires protégées juridiquement constituées',
    proportionForestAreaLongTermForestManagement2025:
      'Proportion de la superficie forestière faisant l’objet d’un plan de gestion forestière à long terme',
    forestAreaVerifiedForestManagement2025:
      'Superficie forestière dont la gestion est certifiée par des systèmes de vérification indépendants',
  },
  navigation: {
    sectionHeaders: {
      employmentEducationAndNwfp2025: 'Extraction et valeur des produits forestiers non ligneux en 2020',
      forestGrowingStockBiomassAndCarbon2025: 'Matériel sur pied, biomasse et carbone de la forêt',
      forestDesignationAndManagement2025: 'Affectation et gestion des forêts',
      forestPolicyAndLegislation2025: 'Politiques et législations forestières',
    },
  },
  extentOfForest_forestAreaStatusAndTrend_Description: {
    header_0: 'Critères d’évaluation du niveau pour la superficie de forêt',
    status: {
      high: 'Sources de données : récentes¹  – inventaire forestier national ou télédétection (enquête sur un échantillon représentatif ou cartographie complète) avec une évaluation de l’exactitude / calibrage à partir de données de terrain.',
      medium:
        'Sources de données : anciennes² – inventaire forestier national ou télédétection (enquête sur un échantillon représentatif ou cartographie complète) avec une évaluation de l’exactitude / calibrage à partir de données de terrain.',
      low: 'Sources de données : autres – par exemple, registres, estimations d’experts ou télédétection sans évaluation de l’exactitude/calibrage à partir de données de terrain.',
    },
    trend: {
      high: 'Estimations reposant sur des inventaires forestiers nationaux répétés compatibles³ dont les données du plus récent ne remontent pas à plus de cinq ans ; et/ou analyse des données de télédétection multitemporelles pour une période qui a pris fin il y a cinq ans au plus.',
      medium:
        'Estimations reposant sur des inventaires forestiers nationaux répétés compatibles³ dont les données du plus récent remontent à plus de cinq ans ; et/ou analyse des données de télédétection multitemporelles pour une période qui a pris fin il y a plus de cinq ans ; ou comparaison de cartes compatibles sans analyse multitemporelle',
      low: 'Autres sources de données – par exemple, estimations d’experts ou estimations reposant sur des évaluations non compatibles.',
    },
    footer1:
      '¹ Données ne remontant pas à plus de 5 ans à compter de l’année de soumission du rapport (2018 ou plus récent pour les rapports nationaux de FRA 2025)',
    footer2:
      '² Données remontant à plus de 5 ans à partir de l’année de soumission du rapport (antérieures à 2018 pour les rapports nationaux de FRA 2025)',
    footer3: '³ Compatibles en termes de méthodes, de catégories et de définitions utilisées',
  },
  biomassStock_biomassStockStatus_Description: {
    header_0: 'Critères d’évaluation du niveau pour le Matériel sur pied',
    status: {
      high: 'Application des facteurs de conversion et d’expansion de la biomasse ou équations allométriques spécifiques au pays.',
      medium:
        'Application d’équations allométriques génériques ou au niveau du biome, ou d’une combinaison de facteurs de conversion spécifiques au pays/biome et de facteurs par défaut de l’expansion de la biomasse du GIEC.',
      low: 'Application des facteurs par défaut de conversion et d’expansion de la biomasse du GIEC (par exemple, utilisation du « calculateur de biomasse »), ou estimations reposant sur une cartographie par télédétection de la biomasse.',
    },
  },
  growingStock_growingStockStatus_Description: {
    header_0: 'Critères d’évaluation du niveau pour les estimations de la biomasse',
    status: {
      high: 'Application des facteurs de conversion et d’expansion de la biomasse ou équations allométriques spécifiques au pays.',
      medium:
        'Application d’équations allométriques génériques ou au niveau du biome, ou d’une combinaison des facteurs de conversion spécifiques au pays/biome et des facteurs par défaut de l’expansion de la biomasse du GIEC.',
      low: 'Application des facteurs par défaut de conversion et d’expansion de la biomasse du GIEC (par exemple, utilisation du « calculateur de la biomasse »), ou estimations reposant sur une cartographie par télédétection de la biomasse.',
    },
    status2025: {
      high: 'Sources de données: récentes¹ – Inventaire forestier national ou balayage laser aéroporté (BLA) calibré avec des données de terrain.',
      medium:
        'Sources de données: anciennes² – Inventaire forestier national, inventaires de terrain partiels ou balayage laser aéroporté (BLA) non calibré avec des données de terrain.',
      low: 'Autres sources de données telles que données satellites, registres, questionnaires ou évaluations d’experts.',
    },
    footer1:
      '¹ Données ne remontant pas à plus de 10 ans à compter de l’année de soumission du rapport (2013 ou plus récent pour les rapports nationaux de FRA 2025)',
    footer2:
      '² Données remontant à plus de 10 ans à compter de l’année de soumission du rapport (antérieures à 2013 pour les rapports nationaux de FRA 2025)',
  },
}
