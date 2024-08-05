// eslint-disable-next-line @typescript-eslint/no-var-requires
const print = require('./print')

module.exports = {
  print,

  // common
  area100HaYear: 'Área (1000 ha)',
  categoryHeader2020: 'Categorías de FRA 2020',
  categoryHeader2025: 'Categorías de FRA 2025',
  forestArea100HaYear: 'Área forestal (1000 ha)',

  area100Ha: 'Área (1000 ha)',
  areaAffectedByFire: {
    areaAffected: 'Área afectada (1000 ha)',
    areaAffectedByFire2025: '$t(areaAffectedByFire.areaAffectedByFire)',
  },

  biomassStock: {
    aboveGround2025: 'Biomasa aérea',
    belowGround2025: 'Biomasa subterránea',
    deadWood2025: 'Biomasa de madera muerta',
    biomassStock2025: 'Existencias de biomasa',
  },

  biomassStockAvg: {
    forestBiomass: 'Biomasa forestal (toneladas/ha)',
  },
  biomassStockTotal: {
    totalForestBiomass: 'Biomasa forestal total (millones de toneladas)',
  },

  carbonStock: {
    carbonAboveGroundBiomass2025: 'Carbono en la biomasa aérea',
    carbonBelowGroundBiomass2025: 'Carbono en la biomasa subterránea',
    carbonStock2025: 'Existencias de carbono',
  },

  carbonStockTotal: {
    totalForestCarbon: 'Carbono forestal total (millones de toneladas)',
  },
  climaticDomain: {
    percentOfForestArea: '% de área de bosque',
  },
  contactPersons: {
    expectedYearForNextCountryReportUpdate: 'Año previsto de la próxima actualización del informe nacional',
  },
  degradedForest: {
    degradedForest: 'Bosque degradado',
    degradedForestDefinition: 'Definición de bosque degradado',
    forestDegradationMonitoringAndAssessment: 'Seguimiento y evaluación de la degradación forestal',
    degradedAreaForThatYear: 'Superficie forestal degradada ese año (en 1000 ha)',
    doesYourCountryMonitor: '¿Realiza su país un seguimiento de la superficie de bosques degradados?',
    hasNationalDefinitionOfDegradedForest: '¿Tiene su país una definición nacional de "bosque degradado"?',
    hasNationalLevelData: 'Si se dispone de datos a nivel nacional',
    howMonitored: 'Describa el proceso de seguimiento y sus resultados',
    ifYes: 'Si la respuesta es "sí"',
    whatIsDefinition: '¿Cuál es la definición nacional de "bosque degradado"?',
    yearOfLatestAssessment: 'Año de la última evaluación',
    other: 'Otro (explíquelo en los comentarios)',
    notSelected: '',
    criteriaOfDegradedForest: 'Criterios aplicados en la definición de bosque degradado',
    changeInForestStructureDecreaseInForestCanopy:
      'Cambio en la estructura del bosque / Disminución del dosel forestal',
    forestDisturbances: 'Perturbaciones forestales',
    lossOfProductivityAndForestGoods: 'Pérdida de productividad y de bienes proprocionados por el bosque',
    lossOfForestServices: 'Pérdida de servicios ecosistémicos del bosque',
    lossOfCarbonBiomassAndGrowingStock: 'Pérdida de carbono, biomasa y existencias en formación',
    lossOfBiologicalDiversity: 'Pérdida de biodiversidad',
    soilDamageErosion: 'Daños en el suelo / erosión',
    mainMethods: 'Principales métodos utilizados para realizar el seguimiento del área de bosque degradado',
    fieldInventoryAndObservations: 'Inventario y observaciones sobre el terreno',
    wallToWallRemoteSensingMapping: "Mapas realizados mediante técnicas de teledetección (''wall-to-wall'')",
    remoteSensingSurvey: 'Muestreo estadístico basado en imágenes de teledetección',
    expertOpinion: 'Opinión de expertos',
    productionHarvestData: 'Datos de producción / rendimiento',
    forestManagementPlanReport: 'Informe de plan de gestión forestal',
    underDevelopment: 'En desarrollo',
    monitoringScale: 'Escala a la que se realiza el seguimiento',
    national: 'Nacional',
    subnational: 'Subnacional',
    biome: 'Bioma',
    standLocal: 'Parcela / Local',
  },
  designatedManagementObjective: {
    noDesignation: 'Sin designación',
    unknown2025: 'Desconocido',
  },
  disturbances: {
    forestDamage: 'Daños forestales',
    predominantCause: 'Causa principal',
    forestAreaAffected: 'Área de bosque afectado (1000 ha)',
    severeWeatherEvents2025: 'Fenómenos meteorológicos extremos',
  },
  extentOfForest: {
    remainingLandArea: 'Superficie terrestre restante',
    totalLandArea2025: 'Superficie terrestre total',
    extentOfForest2025: '$t(extentOfForest.extentOfForest)',
    otherWoodedLand: '$t(fraClass.otherWoodedLand)',
  },

  forestAreaChange: {
    forestExpansion2025: 'Expansión forestal',
    forestAreaChange2025: 'Expansión forestal, deforestación y cambio neto anual',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithLongTermManagementPlan2025: 'Área de bosque con planes de gestión a largo plazo',
    forestAreaWithinProtectedAreas2025: '$t(forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas)',
  },
  forestCharacteristics: {
    primaryForest: '...del cual es bosque primario',
    plantationForestIntroducedArea2025: '...del cual de especies introducidas',
    naturalForestArea2025: 'Bosque con procesos de regeneración natural',
  },
  forestOwnership: {
    ofWhichCommunities2025: '...de la cual pertenece a Pueblos Indígenas y comunidades locales',
    other2025: '$t(common.otherSpecifyInComments)',
    unknown2025: 'Desconocido',
    total2025: 'Total',
    forestOwnership2025: 'Propiedad forestal',
  },

  forestRestoration: {
    forestRestoration: 'Restauración forestal',
    hasYourCountryForestRestorationCommitments: '¿Tiene su país objetivos concretos de restauración forestal?',
    isThereALawOrOtherGovernmentMandateInSupportOfRestoration:
      '¿Existe alguna ley u otro mandato gubernamental que apoye la restauración?',
    isThereANationalDefinitionOfRestoration:
      '¿Existe una definición nacional de "restauración"? En caso afirmativo, indique la definición, el proceso de seguimiento y los resultados.',
    whatAreasInNeedOfRestorationHaveBeenIdentified:
      'Describa qué tipo de zonas han sido identificadas como áreas con necesidades de restauración y cómo se han identificado',
    whatAreTheTargetsSetForTheRestoration:
      '¿Cuáles son los objetivos concretos de restauración? Por ejemplo, xxx hectáreas antes del año aaaa',
    howManyHectaresOfForestHaveBeenRestoredToDate: '¿Cuántas hectáreas de bosque se han restaurado hasta la fecha?',
    ifYes: 'Si la respuesta es "sí"',
  },
  growingStock: {
    totalForest: 'Total Bosque',
    naturallyRegeneratingForest2025: 'Bosque con procesos de regeneración natural',
  },
  growingStockComposition: {
    millionCubicMeter: 'Millones de m³',
    mostRecentYear: 'Año más reciente:',
    percentOfTotal: '% del total',
    ranked: '#{{idx}} Clasificado',
    totalGrowingStock: 'Existencias totales en formación',
    totalIntroducedTreeSpecies: 'Total de especies arbóreas introducidas',
    totalNativeTreeSpecies: 'Total de especies arbóreas nativas',

    nativeTreeSpecies2025: 'Especies arbóreas nativas',
    introducedTreeSpecies2025: 'Especies arbóreas introducidas',
  },
  holderOfManagementRights: {
    communities2025: 'Pueblos Indígenas y comunidades locales',
    other2025: '$t(common.otherSpecifyInComments)',
    unknown2025: 'Desconocido',
  },
  otherWoodedLand: {
    otherWoodedLand2025: '$t(growingStock.otherWoodedLand)',
  },
  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals2025: 'Extracción y valor de productos forestales no madereros en 2020',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover2025: 'Otras tierras con cobertura arbórea',
  },

  primaryForestByClimaticDomain: {
    primaryForestByClimaticDomain: 'Bosque primario por región climática',
    primaryForestBoreal: '...del cual bosque primario boreal',
    primaryForestTemperate: '...del cual bosque primario templado',
    primaryForestTropical: '...del cual bosque primario tropical',
    primaryForestSubTropical: '...del cual bosque primario subtropical',
    totalPrimaryForest: 'Área total de bosque primario',
    primaryForestArea100Ha: 'Área de bosque primario ($t(unit.haThousand))',
  },
  specificForestCategories: {
    specificForestCategories2025: 'Categorías específicas de los bosques',
    mangroves2025: 'Manglares¹',
    mangrovesDisclaimer: '¹Incluye tanto Bosque como Otras Tierras Boscosas ',
  },
  sustainableDevelopment: {
    annualForestAreaChangeRate: 'Tasa de cambio anual del área de bosque',
    sdgIndicator1_2025: 'Indicador ODS 15.1.1: Área de bosque en proporción a la superficie terrestre total',
    forestAreaProportionLandArea: 'Área de bosque en proporción a la superficie terrestre total',
    dataProvidedBy: `Los datos para este subindicador ODS son proporcionados por FSC y PEFC (organizaciones de certificación forestal).`,
    'Metadata-15-01-01': `Metadatos del Indicador ODS 15.1.1`,
    'Metadata-15-02-01': `Metadatos del Indicador ODS 15.2.1`,
  },
  navigation: {
    sectionHeaders: {
      employmentEducationAndNwfp2025: 'Extracción y valor de productos forestales no madereros',
      forestGrowingStockBiomassAndCarbon2025: 'Existencias forestales en formación, biomasa y carbono',
      forestDesignationAndManagement2025: 'Designación y gestión forestal',
      forestOwnershipAndManagementRights2025: 'Propiedad forestal y derechos de gestión',
      forestDisturbances2025: 'Perturbaciones forestales',
      forestExtentCharacteristicsAndChanges2025: '$t(navigation.sectionHeaders.forestExtentCharacteristicsAndChanges)',
      forestPolicyAndLegislation2025: '$t(navigation.sectionHeaders.forestPolicyAndLegislation)',
    },
  },
  extentOfForest_forestAreaStatusAndTrend_Description: {
    header_0: 'Criterios de nivel de superficie forestal',
    status: {
      high: 'Fuentes de datos: Inventario Forestal Nacional reciente¹ o evaluación basada en técnicas de teledetección (muestreo estadístico o mapas wall-to-wall) con medición de precisión / calibración con datos de campo.',
      medium:
        'Fuentes de datos: Inventario Forestal Nacional antiguo² o teledetección (muestreo estadístico o mapas wall-to-wall) con medición de precisión / calibración con datos de campo.',
      low: 'Fuentes de datos: Otras, como registros, estimaciones de expertos o teledetección sin medición de precisión / calibración con datos de campo.',
    },
    trend: {
      high: 'Estimaciones basadas en repetidos Inventarios Forestales Nacionales compatibles³, cuando el más reciente no tenga más de cinco años; y/o evaluaciones de cambios por teledetección mediante análisis multitemporal para un período de tiempo que no haya finalizado hace más de cinco años.',
      medium:
        'Estimaciones basadas en repetidos Inventarios Forestales Nacionales compatibles³ cuando el más reciente tenga más de cinco años; y/o evaluaciones de cambios por teledetección mediante análisis multitemporal para un período de tiempo que haya finalizado hace más de cinco años; o comparación de mapas compatibles sin análisis multitemporal.',
      low: 'Otras fuentes de datos, por ejemplo, estimaciones de expertos, o estimaciones basadas en evaluaciones no compatibles.',
    },
    footer1:
      '¹ Datos con una antigüedad inferior a 5 años a partir del año de presentación del informe (2018 o más reciente en el caso de los informes nacionales de FRA 2025)',
    footer2:
      '² Datos con una antigüedad superior a 5 años a partir del año de presentación del informe (anteriores a 2018 en el caso de los informes nacionales de FRA 2025)',
    footer3: '³ Compatibles en términos de métodos, categorías y definiciones utilizados',
  },
  biomassStock_biomassStockStatus_Description: {
    header_0: 'Criterios de nivel aplicables a los métodos de estimación de la biomasa',
    status: {
      high: 'Factores de conversión y expansión de biomasa específicos al país o ecuaciones alométricas que se hayan aplicado.',
      medium:
        'Aplicación de ecuaciones alométricas genéricas o a nivel de bioma o una combinación de factores de conversión específicos al país o al bioma y factores de expansión por defecto de la biomasa publicados por el IPCC',
      low: 'Aplicación de factores de conversión y expansión por defecto de la biomasa del IPCC (por ejemplo, el uso de la “calculadora de biomasa”), o estimaciones basadas en mapas de biomasa trazados mediante teledetección.',
    },
  },
  growingStock_growingStockStatus_Description: {
    header_0: 'Criterios de nivel aplicables a los métodos de estimación de las existencias en formación',
    status: {
      high: 'Fuentes de datos: Inventario forestal nacional reciente¹ o escaneado láser aerotransportado (ALS por sus siglas en inglés) con calibración de datos sobre el terreno.',
      medium:
        'Fuentes de datos: Inventario forestal nacional antiguo², inventarios parciales sobre el terreno o escaneado láser aerotransportado (ALS) sin calibración de datos sobre el terreno.',
      low: 'Fuentes de datos: Otras fuentes de datos, como datos satelitales, registros, cuestionarios o evaluaciones de expertos.',
    },
    footer1:
      '¹ Datos con una antigüedad inferior a 10 años a partir del año de presentación del informe (2013 o más reciente en el caso de los informes nacionales de FRA 2025)',
    footer2:
      '² Datos con una antigüedad superior a 10 años a partir del año de presentación del informe (anteriores a 2013 en el caso de los informes nacionales de FRA 2025)',
  },
}
