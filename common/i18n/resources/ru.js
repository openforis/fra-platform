module.exports.translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },

  user: {
    roles: {
      reviewer: 'Обозреватель',
      nationalCorrespondent: 'Национальный корреспондент',
      collaborator: 'Коллаборационист',
      administrator: 'Администратор',
      noRole: 'Недоступно'
    }
  },

  fraClass: {
    forest: 'Леса',
    otherWoodedLand: 'Другая лесистая местность',
    otherLand: 'Другая земельная площадь'
  },
  fraForestCharacteristicsClass: {
    naturallyGenerated: 'Естественно возобновленные леса',
    plantationForest: 'Лесные культуры',
    otherPlantedForest: 'Другие лесонасаждения',
    introduced: '...в том числе интродуцированные породы'
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: 'Ошибка: Пользователь {{user}} попытался получить доступ к {{countryIso}} но не была указана задача',
      countryUserNotReviewer: 'Ошибка: Пользователь {{user}} попытался получить доступ к {{countryIso}} не являясь ее обозревателем'
    },
    assessment: {
      transitionNotAllowed: 'Ошибка: Переход с {{currentStatus}} на {{status}} не разрешен для задачи {{role}}'
    },
    review: {
      commentDeleteNotOwner: 'Ошибка: Пользователь {{user}} попытался удалить чужой комментарий',
      commentEnterResolvedIssue: 'Ошибка: Пользователь {{user}} попытался добавить комментарий для разрешенной проблемы'
    },
    ndp: {
      previousNdpNotFound: 'Невозможно найти Национальные данные до {{year}}'
    }
  },
  // components

  countryListing: {
    annuallyReported: 'Ежегодно',
    fiveYearCycle: 'Раз в пять лет'
  },

  navigation: {
    annuallyReported: 'Ежегодные данные',
    fiveYearCycle: 'Пятилетний цикл',
    assessmentStatus: {
      changing: {
        label: 'Изменяется…'
      },
      review: {
        label: 'Рассматривается',
        next: 'Послать для рассмотрения',
        previous: 'Вернуть для рассмотрения'
      },
      accepted: {
        label: 'Принято',
        next: 'Принять',
        previous: ''
      },
      editing: {
        label: 'Редактирование',
        previous: 'Вернуться к редактированию'
      }
    }
  },

  header: {
    logout: 'Выход',
    autoSave: {
      saving: 'Сохранение…'
    }
  },

  review: {
    comments: 'Комментарии',
    noComments: 'Нет комментариев',
    resolve: 'Разрешить',
    commentTime: {
      hour: '{{count}} час назад',
      hour_plural: '{{count}} час-а/-ов назад',
      day: '{{count}} день назад',
      day_plural: '{{count}} дня/дней назад',
      week: '{{count}} неделю назад',
      week_plural: '{{count}} недели назад',
      aMomentAgo: 'Только что'
    },
    confirmDelete: 'Вы действительно хотите удалить этот комментарий? Его будет невозможно восстановить.',
    commentDeleted: 'Комментарий удален',
    commentMarkedAsResolved: 'Помечен как разрешенный',
    delete: 'Удалить',
    writeComment: 'Написать комментарий…',
    commentingClosed: 'Комментирование завершено',
    add: 'Добавить',
    cancel: 'Отменить'
  },

  description: {
    description: 'Описание',
    dataSources: 'Источники данных',
    originalData: 'Исходные данные',
    nationalClassificationAndDefinitions: 'Национальные классификация и определения',
  },

  nationalDataPoint: {
    nationalDataPoint: 'Национальный отчетный год',
    addNationalDataPoint: 'Добавить национальный отчетный год',
    noNationalDataAdded: 'Нет добавленных национальных данных',
    nationalData: 'Национальные данные',
    year: 'Год',
    methods: 'Методы',
    edit: 'Редактировать',
    copyPreviousValues: 'Копировать предыдущие значения',
    nationalClass: 'Национальная категория',
    nationalClasses: 'Национальные категории',
    definition: 'Определения',
    fraClasses: 'Категории ОЛР',
    class: 'Категория',
    area: 'Площадь',
    total: 'Всего',
    delete: 'Удалить',
    confirmDelete: 'Вы действительно хотите удалить этот отчетный год? Его будет невозможно восстановить.',
    cancel: 'Отменить',
    saveData: 'Сохранить данные',
    enterOrCopyPasteNationalClasses: 'Введите либо скопируйте национальные классы'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Площадь лесов',
    generateFraValues: 'Сгенерировать значения ОЛР',
    extentOfForestValues: 'Показатели площади лесов',
    forestArea: 'Покрытая лесом площадь',
    chart: {
      placeholderLine1: 'Чтобы начать, добавьте национальные моменты сбора данных и используйте',
      placeholderLine2: 'их чтобы сгенерировать значения ОЛР автоматически'
    }
  },

  growingStock: {
    growingStock: 'Запасы леса на корню'
  },

  biomassStock: {
    biomassStock: 'Запасы биомассы'
  },

  carbonStock: {
    carbonStock: 'Запасы углерода'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Охраняемые территории и долгосрочные планы управления'
  },

  // five year cycle assessment components

  forestAreaChange: {
    forestAreaLossGainChange: 'Прирост, убыль и чистое изменение лесных площадей',
    forestExpansion: 'Расширение леса (a)',
    ofWhichAfforestation: '…в том числе лесоразведение',
    ofWhichNaturalExpansion: '…в том числе естественное расширение',
    deforestation: 'Обезлесение (b)',
    forestAreaNetChange: 'Чистое изменение лесной площади'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Характеристики леса',
    forestCharacteristicsValues: 'Значения характеристик леса',
    naturalForestArea: 'Естественно возобновленный лес',
    plantationForestArea: 'Лесные культуры',
    plantationForestIntroducedArea: '…в том числе интродуцированные породы',
    otherPlantedForestArea: 'Прочие лесонасаждения'
  },

  specificForestCategories: {
    specificForestCategories: 'Специальные категории леса',
    bamboo: 'Бамбук',
    mangroves: 'Мангры',
    rubberPlantations: 'Каучуковые плантации'
  },

  growingStockComposition: {
    growingStockComposition: 'Состав насаждений'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Недревесные лесные товары'
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Главная назначенная функция',
    production: 'Производство',
    soilWaterProtection: 'Защита почв и охрана вод',
    biodiversityConservation: 'Сохранение биоразнообразия',
    socialServices: 'Услуги в социальной области',
    multipleUse: 'Многоцелевое использование',
    other: 'Другие виды',
    unknown: 'Отсутствует/неизвестно',
    totalForestArea: 'Общая площадь покрытая лесом'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Права собственности на леса и управление лесами'
  },

  disturbances: {
    disturbances: 'Нарушения'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Площадь, пострадавшая от пожара',
    totalLandAreaAffectedByFire: 'Общая площадь земель, пострадавших от пожара',
    ofWhichForest: '…в том числе лесов'
  },

  employment: {
    employment: 'Занятость'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Университетский диплом'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Политика и нормативно-правовая база'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Площадь постоянного лесного фонда'
  }

}
