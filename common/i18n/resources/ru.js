module.exports.ruTranslation =  {

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
      national_correspondent: 'Национальный корреспондент',
      reviewer_all: 'Обозреватель',
      national_correspondent_all: 'Национальный корреспондент',
      noRole: 'Недоступно'
    }
  },

  fraClass: {
    forest: 'Лесные земли',
    otherWoodedLand: 'Другие лесные земли',
    otherLand: 'Прочие земли'
  },
  fraForestCharacteristicsClass: {
    naturallyGenerated: 'Естественно возобновленный лес',
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
    nationalDataPoint: 'Национальный момент сбора данных',
    addNationalDataPoint: 'Добавить национальный момент сбора данных',
    noNationalDataAdded: 'Нет добавленных национальных данных',
    nationalData: 'Национальные данные',
    year: 'Год',
    methods: 'Методы',
    edit: 'Редактировать',
    copyPreviousValues: 'Копировать предыдущие значения',
    nationalClass: 'Национальный класс',
    nationalClasses: 'Национальные классы',
    definition: 'Определения',
    fraClasses: 'Класс FRA',
    class: 'Класс',
    area: 'Площадь',
    total: 'Итог',
    delete: 'Удалить',
    confirmDelete: 'Вы действительно хотите удалить этот момент сбора данных? Его будет невозможно восстановить.',
    cancel: 'Отменить',
    saveData: 'Сохранить данные',
    enterOrCopyPasteNationalClasses: 'Введите либо скопируйте национальные классы'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Площадь леса',
    generateFraValues: 'Сгенерировать значения FRA',
    forestArea: 'Покрытая лесом площадь',
    chart: {
      placeholderLine1: 'Чтобы начать, добавьте национальные моменты сбора данных и используйте',
      placeholderLine2: 'их чтобы сгенерировать значения FRA автоматически'
    }
  },

  forestAreaChange: {
    forestAreaLossGainChange: 'Прирост, убыль и чистое изменение лесных площадей',
    forestExpansion: 'Распространение леса (a)',
    ofWhichAfforestation: '…в том числе лесоразведение',
    ofWhichNaturalExpansion: '…в том числе естественное распространение',
    deforestation: 'Обезлесение (b)',
    forestAreaNetChange: 'Чистое изменение лесной площади'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Характеристики леса',
    naturalForestArea: 'Естественно возобновленный лес',
    naturalForestPrimaryArea: '…в том числе коренной',
    plantationForestArea: 'Лесные культуры',
    plantationForestIntroducedArea: '…в том числе интродуцированные породы',
    otherPlantedForestArea: 'Прочие лесонасаждения'
  },

  specificForestCategories: {
    specificForestCategories: 'Определенные категории леса',
    bamboo: 'Бамбук',
    mangroves: 'Мангры'
  },

  growingStock: {
    growingStock: 'Запас насаждения'
  },

  growingStockComposition: {
    growingStockComposition: 'Состав насаждений'
  },

  biomassStock: {
    biomassStock: 'Запас биомассы'
  },

  carbonStock: {
    carbonStock: 'Запас углерода'
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'Недревесная продукция леса'
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'Изначально назначенная цель управления',
    production: 'Производство',
    soilWaterProtection: 'Охрана почв и водных ресурсов',
    biodiversityConservation: 'Сохранение биоразнообразия',
    socialServices: 'Общественные услуги',
    multipleUse: 'Многосторонее использование',
    other: 'Прочее',
    unknown: 'Нет/неизвестно',
    totalForestArea: 'Общая площадь покрытая лесом'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Природоохранные зоны и долгосрочные планы управления'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Право владения и управления лесом'
  },

  disturbances: {
    disturbances: 'Нарушения'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Площадь пораженная пожарами',
    totalLandAreaAffectedByFire: 'Общая площадь земель пораженных пожарами',
    ofWhichForest: '…в том числе лесов'
  },

  employment: {
    employment: 'Занятость'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Окончание высшего учебного заведения студентами'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Политика и законодательство'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Площадь постоянного лесного фонда'
  }

}
