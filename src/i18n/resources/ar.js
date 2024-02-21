const admin = require('./ar/admin')
const area = require('./ar/area')
const assessmentSection = require('./ar/assessmentSection')
const common = require('./ar/common')
const contentCheck = require('./ar/contentCheck')
const dataDownload = require('./ar/dataDownload')
const dataSource = require('./ar/dataSource')
const email = require('./ar/email')
const fra = require('./ar/fra')
const generalValidation = require('./ar/generalValidation')
const login = require('./ar/login')
const statisticalFactsheets = require('./ar/statisticalFactsheets')
const uc = require('./ar/uc')

module.exports.translation = {
  admin,
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  email,
  fra,
  generalValidation,
  login,
  statisticalFactsheets,
  uc,

  fileDrop: {
    dropFilesHere: 'ضع الملف هنا',
    dragAndDropOrClick: 'اسحب و ضع الملفات هنا, او اضغط لاختيار الملف ',
  },

  page: {
    assessmentSection,
  },

  anchors: {
    fra: {
      2025: {
        '1a': 'ا) 1',
        '1b': 'ب) 1',
        '1c': 'ج) 1',
        '1d': 'د) 1',
        '1e': 'ه) 1',
        '2a': 'ا) 2',
        '2b': 'ب) 2',
        '2c': 'ج) 2',
        '2d': 'د) 2',
        '3a': 'ا) 3',
        '3b': 'ب) 3',
        '3c': 'ج) 3',
        '4a': 'ا) 4',
        '4b': 'ب) 4',
        '5a': 'ا) 5',
        '5b': 'ب) 5',
        '5c': 'ج) 5',
        '6a': 'ا) 6',
        '6b': 'ب) 6',
      },
    },
  },

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
    zh: '中文',
    ar: 'العربية',
  },

  disclaimer: {
    statisticalFactsheets:
      'إخلاء مسؤولية: قد يحتوي على قيم تقديرية خاصة بمنظمة الأغذية والزراعة، وتكون تغيب عنه بعض القيم',
    part1: 'أنتج هذا الموقع الإلكتروني بمساعدة من',
    europeanUnion: 'الاتحاد الأوروبي',
    part2: ', الـ ',
    govFinland: 'حكومة الفنلندية',
    part3: ', الـ ',
    govNorway: 'حكومة النرويجية',
    part4: ' و ',
    gef: 'مرفق البيئة العالمية',
    part5:
      'يقع محتواه ضمن المسؤولية الحصرية لمنظمة الأغذية والزراعة، ولا يمكن بأي شكل من الأشكال اعتبار أنه يعكس آراء الاتحاد الأوروبي والحكومة الفنلندية والحكومة النرويجية ومرفق البيئة العالمية.',
    termsOfUse: 'شروط استخدام قواعد البيانات الإحصائية',
  },

  home: {
    keyFindings: `يبلغ إجمالي مساحة الغابات في العالم 4,06 مليار هكتار (هـ)، 
أي أنها تشكل 31 في المائة من إجمالي مساحة اليابسة. 
وهذه المساحة تكافئ 0,52 هـ للشخص، إلا أن توزع الغابات يفتقر إلى التجانس بين سكان العالم أو من الناحية الجغرافية، 
حيث تبقى المنطقة الاستوائية هي المستحوذة على النسبة الأكبر من غابات العالم (45 في المائة)، 
لتأتي من بعدها الغابات الشمالية، فالمناطق المعتدلة، وشبه الاستوائية.`,
  },

  footer: {
    contactUs: 'تواصل معنا',
    termsAndConditions: 'الأحكام والشروط',
    scamAlert: 'تبليغ عن احتيال',
    reportMisconduct: 'تبليغ عن سوء تصرف',
    tutorials: 'الفيديو',
    sendFeedback: 'أرسل رأيك',
    licenses: 'التراخيص',
    platformVersion: 'إصدار المنصة',
  },

  unit: {
    haThousand: '1000 هـ',
    ha: 'هـ',
    kmSq: 'كم²',
    mileSq: 'ميل²',
    acre1000: '1000 فدان',
    acre: 'فدان',
    haMillion: 'مليون هكتار',
    haThousandPerYear: '1000 هكتار/السنة',
    tonnesPerHa: 'طن/هـ',
    cubicMeterPerHa: 'م³/هـ',
    millionTonnes: 'مليون طن متري',
    millionsCubicMeterOverBark: 'مليون م³ مع اللحاء',
    thousandCubicMeterOverBark: '1000 م³ مع اللحاء',
    billionCubicMeter: 'مليار م³',
    thousandCubicMeter: '1000 م³',
    thousandCubicMeterRWE: '1000 م³ مكافئ أخشاب مستديرة',
    thousandPersons: '1000 شخص',
    gt: 'جيجاطن',
    fte1000: '1000 مكافئ الدوام الكامل',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
    absoluteNumber: 'العدد المطلق',
    annualNumberOfVisitsMillion: 'عدد الزيارات السنوية (مليون)',
    millionNationalCurrency: 'مليون وفق العملة المحلية',
    facilityLengthIn1000Km: 'المرفق (الطول بآلاف الكيلومترات)',
    growingStockPercent: '٪ من إجمالي مخزون الأشجار الحيّة في الغابات',
  },

  countrySelection: {
    selectCountry: 'اختر بلداً',
  },

  definition: {
    definitionLabel: 'انظر التعاريف',
    faqLabel: 'أسئلة متكررة',
  },

  audit: {
    notStarted: 'لم يبدأ',
    edited: 'منقح',
  },

  yesNoTextSelect: {
    yes: 'نعم',
    no: 'لا',
    notSelected: '',
  },

  user: {
    roles: {
      REVIEWER: 'مُراجع',
      NATIONAL_CORRESPONDENT: 'مراسل وطني',
      ALTERNATE_NATIONAL_CORRESPONDENT: 'مراسل وطني بديل',
      COLLABORATOR: 'متعاون',
      ADMINISTRATOR: 'مدير',
      noRole: 'غير محدد',
      VIEWER: 'مشاهد',
      reviewer_plural: 'المراجعين',
      nationalCorrespondent_plural: 'المراسلون الوطنيون',
      alternateNationalCorrespondent_plural: 'المراسلون الوطنيون المناوبون',
      collaborator_plural: 'المتعاونين',
    },

    resetPasswordEmail: {
      subject: 'منصة تقييم الموارد الحرجية، إعادة ضبط كلمة المرور',
      textMessage: `عزيزي {{user}}

تلقينا طلباً بإعادة ضبط كلمة المرور إلى حساب تقييم الموارد الحرجية الخاص بك. إذا لم تقدم هذا الطلب يمكنك تجاهل هذه الرسالة بأمان.
انقر على الرابط التالي لإعادة ضبط كلمة المرور{{- link}}

Click the following link to reset your password
{{- link}}


شكراً
فريق تقييم الموارد الحرجية fra@fao.org
{{- url}}`,
      htmlMessage: `عزيزي {{user}}
<br/><br/>
تلقينا طلباً بإعادة ضبط كلمة المرور إلى حساب تقييم الموارد الحرجية الخاص بك. 
<br/>
إن لم تقدم هذا الطلب، يمكنك تجاهل هذه الرسالة بأمان.
<br/><br/><br/>
<a href="{{link}}" style="text-decoration: none; background-color: #0098a6;border: 2px solid #00988F;color: white;font-size: 14px;font-weight: 700;    padding: 10px 50px;">Click here to reset your password</a>
<br/><br/><br/>
Thanks,
<br/>
فريق تقييم الموارد الحرجية fra@fao.org
<br/>
{{- url}}
      `,
    },
  },

  fraClass: {
    forest: 'غابة',
    otherWoodedLand: 'أرض حرجية أخرى',
    otherLand: 'أرض أخرى',
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: 'غابة متجددة طبيعياً',
    plantationForest: 'الغابات الاصطناعية (مشجرة)',
    ofWhichIntroduced: '... الأنواع المدخلة منها',
    otherPlantedForest: 'غابة مزروعة أخرى',
    totalForest: 'إجمالي مساحة الغابة',
  },

  fraOtherLandClass: {
    palms: 'منها النخيل (زيت، جوز الهند، تمر، إلخ)',
    treeOrchards: '... منها بساتين أشجار (بما فيها الفاكهة والمكسرات والزيتون، إلخ)',
    agroforestry: '... منها زراعة حرجية',
    treesUrbanSettings: '...منها أشجار في بيئة حضرية',
  },

  landing: {
    home: 'الصفحة الرئيسية',
    sections: {
      overview: 'استعراض',
      messageBoard: 'لوح الرسائل',
      about: 'نبذة عن تقييم الموارد الحرجية',
      recentActivity: 'آخر النشاطات',
      userManagement: 'إدارة المتعاونين',
      externalData: 'بيانات خارجية',
      links: 'الروابط والمستودع',
      contentCheck: 'المحتوى / التحقق',
      versioning: 'الإصدار',
    },
    overview: {
      loadingMap: 'تحميل الخارطة...',
      withFinancialSupportOf: 'بدعم مالي من ',
    },
    milestones: {
      milestones: 'معالم أساسية',
      milestone1: 'اجتماع شامل للمراسلين الوطنيين',
      milestone2: 'ورشات عمل إقليمية ودون إقليمية',
      milestone3: 'آخر موعد لتقديم التقارير القطرية',
      milestone4: 'التحقق من التقارير القطرية النهائية',
      milestone5: 'النتائج الأولية لتقييم الموارد الحرجية لعام 2020',
      milestone6: 'التقرير الرئيس الخاص بتقييم الموارد الحرجية لعام 2020',
      milestone7: 'تحليل البيانات وإعداد مسودة التقارير',
      milestone8: 'إطلاق منصة تحليل ونشر البيانات',
      date1: 'مارس/آذار',
      date2: 'أبريل/نيسان - سبتمبر/أيلول',
      date3: 'أكتوبر/تشرين الأول',
      date4: 'يناير/كانون الثاني - فبراير/شباط',
      date5: 'مارس/آذار',
      date6: 'يوليو/تموز',
      date7: 'مارس/آذار -ديسمبر/كانون الأول',
      date8: 'أغسطس/آب',
    },
    users: {
      users: 'التواصل',
      message: 'رسالة',
    },
    about: {
      contact: 'التواصل',
      seniorForestryOfficer: 'كبير مسؤولي الحراجة',
      faoForestryDepartment: 'قسم الحراجة في منظمة الأغذية والزراعة',
      email: 'البريد الإلكتروني',
      fraProcess:
        'ترصد منظمة الأغذية والزراعة الغابات في العالم منذ عام 1946 بفارق زمني من خمس إلى 10 سنوات. وقد بات تقييم الموارد الحرجية العالمية يصدر كل خمس سنوات بهدف توفير نهج متسق يقدم من خلاله توصيفاً للغابات في العالم والتغيرات التي تطرأ عليها. وهذا التقييم يعتمد على مصدرين أساسيين للبيانات، ألا وهما التقارير القطرية التي يعدها مراسلون وطنيون، والاستشعار عن بعد الذي تقوم به منظمة الأغذية والزراعة بالتعاون مع مسؤولي تواصل وطنيين وشركاء إقليميين. أما نطاق تقييم الموارد الحرجية فيشهد تغيرات مطردة منذ نشر أول تقييم لتلك الموارد عام 1948. إذا توفر هذه التقييمات تاريخاً مثيراً للاهتمام حول الغابات في العالم من حيث محتواها الفعلي وحجم التغيرات التي تطرأ عليها. ',
      linkFraProcess: 'اقرأ المزيد عن تقييم الموارد الحرجية',
      or: 'أو',
      selectArea: 'اختر منطقة أدناه للدخول إلى البيانات المتعلقة بتقييم الموارد الحرجية',
    },
    recentActivity: {
      noRecentActivityTitle: 'لا يوجد نشاط مؤخراً على ما يبدو',
      noRecentActivityBody:
        'تظهر هنا التغيرات التي تطرأ على المنصة، وهو ما يمكنك من التعرف بعجالة على ما حدث أثناء غيابك.',
      getStarted: 'ابدأ',
      actions: {
        added: 'مضاف',
        addedFile: 'مضاف {{file}}',
        commented: 'تم التعليق عليه',
        deleted: 'محذوف',
        deletedFile: 'محذوف {{file}}',
        edited: 'منقح',
        resolved: 'تم حل المسألة في',
        status: 'تم تغيير الحالة إلى',
        addUser: 'مضاف {{user}} بصفته {{role}}',
        updateUser: 'مضاف {{user}}',
        removeUser: 'ملغى {{user}}',
        acceptInvitation: 'انضم بصفته {{role}}',
        addInvitation: 'مدعو {{user}} بصفته {{role}}',
        removeInvitation: 'إلغاء دعوة {{user}} بصفته {{role}}',
        updateInvitation: 'تحديث الدعوة وتوجيهها إلى {{user}} بصفته {{role}}',
        updateAssessmentStatus: 'تغيير حالة {{assessment}} إلى {{status}}',
      },
      fraProcess:
        'ترصد منظمة الأغذية والزراعة الغابات في العالم منذ عام 1946 بفارق زمني يتراوح من خمس إلى 10 سنوات. وقد بات تقييم الموارد الحرجية العالمية يصدر كل خمس سنوات بهدف توفير نهج متسق يقدم من خلاله توصيفاً للغابات في العالم والتغيرات التي تطرأ عليها. ويعتمد هذا التقييم على مصدرين أساسيين للبيانات، ألا وهما التقارير القطرية التي يعدها مراسلون وطنيون، والاستشعار عن بعد الذي تقوم به منظمة الأغذية والزراعة بالتعاون مع مسؤولي تواصل وطنيين وشركاء إقليميين. أما نطاق تقييم الموارد الحرجية فيشهد تغيرات مطردة منذ نشر أول تقييم لتلك الموارد عام 1948. إذ توفر هذه التقييمات تاريخاً مثيراً للاهتمام حول الغابات في العالم من حيث محتواها الفعلي وحجم التغيرات التي تطرأ عليها.',
      linkFraProcess: 'اقرأ المزيد عن تقييم الموارد الحرجية',
    },
    links: {
      links: 'روابط',
      unfcccFocalPoints: 'مسؤولو التواصل بخصوص اتفاقية الأمم المتحدة الإطارية بشأن تغير المناخ',
      sdgFocalPoints: 'مسؤولو التواصل الوطنيون بخصوص أهداف التنمية المستدامة',
      reddPortal:
        'منظومات السواتل المخصصة لرصد الأراضي المعززة من قبل مبادرة الأمم المتحدة لخفض الانبعاثات الناجمة عن إزالة الغابات/منظمة الأغذية والزراعة',
      fraGeoSpatialTools: ' ادوات الاستشعار عن بعد المخصصة لتقييم الموارد الحرجية',
      repository: 'المستودع',
      uploadFile: 'حمل ملفاً',
      confirmDelete: 'هل ستحذف {{file}}? لا يمكنك العودة عن هذه الخطوة',
      fileUploaded: 'تم تحميل الملف بنجاح',
      fileDeleted: 'تم حذف الملف بنجاح',
      fileOperationFailed: `:لا يمكن تنفيذ العملية لأن الملف قيد الاستخدام في :\n{{sectionNames}}`,
    },
    dataExport: {
      downloadData: 'تحميل البيانات',
    },
    versioning: {
      status: {
        pending: 'معلق',
        running: 'قيد العمل',
        completed: 'استكمل',
        failed: 'فشل',
      },
      form: {
        newVersion: 'نسخة جديدة',
        versionNumber: 'نسخة',
        date: 'تاريخ',
        cancel: 'إلغاء',
        error: 'ثمة أخطاء في الاستمارة. يرجى تصحيحها وتقديمها مجدداً.',
      },
      table: {
        noVersions: 'لا توجد نسخ بعد',
        databaseVersions: 'نسخ قاعدة البيانات',
        versionNumber: 'رقم النسخة',
        publishedAt: 'وقت منظم من خلال جدول زمني',
        createdBy: 'أوجده',
        status: 'الحالة',
        delete: 'إلغاء',
        scheduledAt: 'مُجدول في الساعة',
      },
    },
  },
  userChat: {
    chatHeader: 'رسائل مع {{user}}',
    noMessages: 'لاتوجد رسائل',
    writeMessage: 'اكتب رسالة',
    send: 'إرسال',
    cancel: 'إلغاء',
    notificationEmail: {
      subject: '{{sender}} أرسل لك رسالة حول {{country}}',
      textMessage: `عزيزي {{recipient}},

{{sender}} أرسل لك رسالة حول {{country}}.

ادخل إلى المنصة من خلال عنوان الموقع التالي لمشاهدتها والإجابة عنها:
{{- link}}

فريق تقييم الموارد الحرجية
{{- url}}
    `,
      htmlMessage: `عزيزي {{recipient}},
<br/><br/>
{{sender}} أرسل لك رسالة حول {{country}}.
<br/><br/>
<b><a href="{{- link}}">ادخل إلى المنصة من خلال عنوان الموقع التالي لمشاهدتها والإجابة عنها.</a></b>
<br/><br/>
The FRA team
<br/>
{{- url}}
    `,
    },
  },

  // رسائل خائطة
  error: {
    access: {
      countryRoleNotSpecified: 'خطأ : المستخدم {{user}} حاول الدخول إلى {{countryIso}} لكن لم يتم تحديد دوره',
      countryUserNotReviewer: 'خطأ: المستخدم {{user}} حاول الدخول إلى {{countryIso}} وهو ليس مراجعاً فيه',
      roleChangeNotAllowed:
        'خطأ: المستخدم {{user}} المستخدم حاول تحديد دور آخر إضافة إلى  {{role}} وهو غير مسموح للشخص المسجل للدخول',
      invitationAlreadyUsed:
        'خطأ: الدعوة {{invitationUuid}} استخدمت مسبقا، وإن قرصنة البريد الإلكتروني {{loginEmail}} ممنوعة!',
      countryDoesNotMatch: 'خطأ: البلد {{countyryIso}} غير مطابق',
      assessmentEditingNotAllowed:
        'خطأ: المستخدم {{user}} المضطلع بدور {{role}} لا يمكنه تعديل تقييم حالة {{assessmentStatus}} البلد {{countryIso}}',
      assessmentCommentingNotAllowed:
        'خطأ: المستخدم {{user}} المضطلع بدور {{role}} لا يمكنه كتابة تقييم عن حالة {{assessmentStatus}} البلد {{countryIso}}',
      userNotAdministrator: 'خطأ: حاول المستخدم {{المستخدم}} الوصول إلى مورد متاح فقط للمسؤولين',
      userAlreadyAddedToCountry: 'خطأ: تمت إضافة المستخدم {{المستخدم}} بالفعل إلى البلد {{البلد}}',
    },
    assessment: {
      transitionNotAllowed: 'خطأ: التحول من حالة {{currentStatus}} إلى {{status}} غير مسموح لهذا الدور {{role}}',
      deskStudyNotAllowed: 'خطأ: المديرون فقط هم من يحق لهم تغيير حالة الدراسة المكتبية',
    },
    review: {
      commentDeleteNotOwner: 'خطأ: المستخدم {{user}} حاول حذف تعليق ليس له',
      commentEnterResolvedIssue: 'خطأ: المستخدم {{user}} حاول إدخال تعليق حول مسألة تم حلها',
    },
    ndp: {
      previousNdpNotFound: 'عاجز عن إيجاد أية نقطة بيانات وطنية قبل عام {{year}}',
    },
  },
  // components

  countryListing: {
    annuallyUpdated: 'محدّث سنوياً',
    fra2020: 'تقييم الموارد الحرجية 2020',
  },

  navigation: {
    hideAll: 'إخفاء الكل',
    showAll: 'إظهار الكل',
    support: {
      dontDelete: 'معلومات خاصة بالنظام يرجى عدم إزالتها',
      feedbackEmailSubject: 'آراء حول منصة تقييم الموارد الحرجية',
      platformVersion: 'نسخة المنصة',
      userAgent: 'وكيل المستخدم',
      user: 'المستخدم',
      manageCollaborators: 'إدارة المتعاونين',
    },
    sectionHeaders: {
      introduction: 'مدخل',
      forestExtentCharacteristicsAndChanges: 'نطاق الغابات ومواصفاتها والتغيرات التي تطرأ عليها',
      forestGrowingStockBiomassAndCarbon: 'مخزون الأشجار الحية والكتلة الحيوية والكربون في الغابة',
      forestDesignationAndManagement: 'تسمية الغابة وإدارتها',
      forestOwnershipAndManagementRights: 'حقوق ملكية الغابات وإدارتها',
      forestDisturbances: 'اضطرابات الغابات',
      forestPolicyAndLegislation: 'السياسات والتشريعات الخاصة بالغابات',
      employmentEducationAndNwfp: 'التوظيف والتعليم ومنتجات حرجية غير خشبية',
      sustainableDevelopment: 'الهدف الخامس عشر من أهداف التنمية المستدامة',
      panEuropeanIndicators: 'مؤشرات عموم أوروبا',
    },
    cancel: 'إلغاء',
    changeStatusTextPlaceholder: 'إضافة رسالة اختيارية',
    doNotNotifyUsers: 'عدم إرسال إشعار إلى المستخدمين',
    notifySelf: 'إرسال نسخة الي البريد الالكتروني الخاص بك',
  },

  header: {
    editProfile: 'تعديل معلومات الملف الشخصي',
    logout: 'تسجيل خروج',
    hideSidebar: 'إخفاء العمود الجانبي',
    showSidebar: 'إظهار العمود الجانبي',
    autoSave: {
      saving: 'حفظ...',
      complete: 'تم حفظ جميع التغييرات',
      lastSaveTimestampReceived: 'آخر تعديل ',
    },
  },

  time: {
    hour: '{{count}} قبل ساعة',
    day: '{{count}} قبل يوم',
    week: '{{count}} قبل أسبوع',
    aMomentAgo: 'قبل لحظة',

    hour_plural: 'قبل {{عدد}} ساعات',
    day_plural: 'قبل {{عدد}} ايام',
    week_plural: 'قبل {{عدد}} أسابيع',
  },

  review: {
    comments: 'تعليقات',
    noComments: 'لاتوجد تعليقات',
    resolve: 'حل',
    confirmDelete: 'هل تود حذف هذا التعليق؟ لايمكن الرجوع عن هذه الخطوة.',
    commentDeleted: 'تم حذف التعليق',
    commentMarkedAsResolved: 'وُسمت بأنه تم حلها',
    delete: 'إلغاء',
    writeComment: 'كتابة تعليق...',
    commentingClosed: 'إغلاق التعليقات',
    add: 'إضافة',
    cancel: 'إلغاء',
    loading: 'تحميل',
  },

  description: {
    edit: 'تعديل',
    done: 'تم',
    loading: 'تحميل المحتوى...',
    description: 'وصف',
    dataSourcesTitle: 'مصادر البيانات، والبيانات الأصلية والتصنيف الوطني، والتعاريف',
    generalCommentsTitle: 'التعليقات',
    dataSources: 'مصادر البيانات',
    dataSourcesPlus: 'مصادر البيانات + نمط مصدر البيانات، مثلاً الجرد الوطني للغابات، إلخ.',
    originalData: 'بيانات أصلية',
    nationalClassificationAndDefinitions: 'التصنيف والتعاريف الوطنية',
    nationalData: 'بيانات وطنية',
    analysisAndProcessing: 'تحليل البيانات الوطنية ومعالجتها',
    estimationAndForecasting: 'التوقعات والتنبؤات',
    reclassification: 'إعادة التصنيف بما يتوافق وفئات تقييم الموارد الحرجية لعام {{cycleName}}',
  },

  nationalDataPoint: {
    clickOnNDP: 'انقر على العام للدخول إلى البيانات الأصلية',
    nationalDataPoint: 'نقطة البيانات الوطنية',
    addNationalDataPoint: 'أضف نقطة بيانات وطنية',
    noNationalDataAdded: 'لم تتم إضافة نقطة بيانات وطنية',
    nationalData: 'بيانات وطنية',
    reclassificationLabel: 'بيانات أصلية وإعادة التصنيف',
    forestCategoriesLabel: 'غابة، أرض حرجية أخرى، أرض أخرى',
    referenceYearData: 'العام المرجعي للبيانات',
    referenceYear: 'العام المرجعي',
    references: 'المراجع',
    selectYear: 'اختر...',
    methods: 'الأساليب',
    methodsUsed: 'الأساليب المستخدمة',
    dataSource: 'مصدر البيانات',
    dataSources: 'مصادر البيانات',
    additionalComments: 'تعليقات إضافية',
    edit: 'تعديل',
    copyPreviousValues: 'نسخ المراجع السابقة',
    nationalClass: 'شريحة وطنية',
    nationalClasses: 'شرائح وتعاريف',
    fraClasses: 'شرائح تقييم الموارد الحرجية',
    definition: 'تعريف',
    class: 'شريحة',
    area: 'المساحة (1000 هـ)',
    total: 'الإجمالي',
    delete: 'حذف',
    modifiedExplanation: 'نقطة البيانات الوطنية مع التعديلات',
    confirmDelete: 'هل تود حذف نقطة البيانات هذه؟ لايمكن الرجوع عن هذه الخطوة.',
    discardChanges: 'إهمال التغييرات',
    doneEditing: 'التعديلات تمت',
    enterOrCopyPasteNationalClasses: 'إدخال أو نسخ ولصق الشرائح الوطنية',
    forestCharacteristics: 'مواصفات الغابة',
    otherLandCharacteristics: 'أرض أخرى ذات غطاء شجري',
    plantationForest: 'الغابات الاصطناعية (مشجرة)',
    remindDirtyOdp: 'تم تحديث نقطة البيانات الوطنية، تذكر تحديث القيم',
    disabled: 'معطّل، يمكنك التفعيل في الجدول 1ب',
    dataSourceMethodsOptions: {
      nationalForestInventory: 'الجرد الوطني للغابات',
      sampleBasedRemoteSensingAssessment: 'تقييم الاستشعار عن بعد استناداً إلى العينة',
      fullCoverMaps: 'خرائط الغطاء الكلي للغابات/النباتات',
      registersQuestionnaires: 'سجلات/استبيانات',
      other: 'غير ذلك (حدده في التعليقات)',
    },
    appliesToVariablesOptions: {
      forest: 'غابة',
      otherWoodedLand: 'أرض حرجية أخرى',
      otherLand: 'أرض أخرى',
    },
    forestCategoriesLabel2025: 'الغابات والأراضي الحرجية الأخرى والأراضي المتبقية',
    nationalClassifications: 'التصنيفات الوطنية',
    categories: 'فئات',
    fileAddedWillBecomePublic: ' سيصبح الملف الذي تمت إضافته كمرجع , متاح للوصول إليها بشكل عام من جميع المستخدمين',
  },

  userManagement: {
    manageCollaborators: 'إدارة المتعاونين',
    loginEmail: 'تسجيل دخول',
    noUsers: 'لم تتم إضافة متعاونين آخرين',
    placeholder: 'اختيار...',
    remove: 'إزالة',
    done: 'تم',
    edit: 'تعديل',
    addUser: 'إضافة متعاون',
    formErrors: 'هنالك أخطاء في الاستمارة. يرجى تصويبها وتقديمها مجدداً.',
    insufficientPrivileges: 'امتيازات غير كافية',
    confirmDelete: 'إزالة {{user}}?',
    allUsers: 'جميع المتعاونين',
    info: 'معلومات',
    tableAccess: 'الدخول إلى الجدول',
    invitationLink: 'رابط الدعوة',
    sendInvitation: 'إرسال دعوة عبر البريد الإلكتروني',
    invitationEmail: {
      subject: 'دعوة خاصة بمنصة تقييم الموارد الحرجية',
      textMessage: `عزيزي {{invitedUser}},

تمت دعوتك للدخول إلى منصة تقييم الموارد الحرجية{{role}} عن {{country}}.

بإمكانك قبول الدعوة والدخول إلى المنصة من خلال عنوان الموقع الإلكتروني التالي: 
{{- link}}

وقتاً سعيداً في إعداد التقارير!

فريق تقييم الموارد الحرجية fra@fao.org
{{- url}}
    `,
      htmlMessage: `عزيزي {{invitedUser}},
<br/><br/>
تمت دعوتك للدخول إلى منصة تقييم الموارد الحرجية بصفتك {{role}} عن {{country}}.
<br/><br/>
<b><a href="{{- link}}">اقبل هذه الدعوة وادخل إلى المنصة</a></b>
<br/><br/>
وقتاً سعيداً في إعداد التقارير!
<br/><br/>
فريق تقييم الموارد الحرجية fra@fao.org
<br/>
{{- url}}
    `,
    },
    editPermissions: 'تحرير الأذونات',
    invitationDeleted: 'تم حذف الدعوة',
    invitationEmailSent: 'تم إرسال بريد إلكتروني للدعوة',
    inviteAgain: 'دعوة مرة أخرى',
    permissions: 'أذونات',
    personalInfoRequired: 'يرجى استكمال معلوماتك الشخصية قبل المتابعة',
    userAdded: 'تمت إضافة {{البريد الالكتروني}}',
    userModified: 'تم تعديل {{المستخدم}}',
    permissionNames: {
      tableData: 'بيانات الجدول',
      descriptions: 'التفصيل',
    },
  },

  contactPersons: {
    reportPreparationAndContactPersons: 'إعداد التقارير ومسؤولي التواصل',
    contactPersons: 'مدخل',
    contactPersonsSupport: 'أعد التقرير الحالي من قبل الأشخاص التالية أسماؤهم',
    introductoryText: 'نص استهلالي',
    introductoryTextSupport: 'ضع نصاً استهلالياً ضمن محتوى هذا التقرير',
    firstName: 'الاسم',
    lastName: 'النسب',
    institution: 'المؤسسة/العنوان',
    email: 'البريد الإلكتروني',
    tables: 'جداول',
    all: 'الكل',
    none: 'ولا واحد',
  },

  extentOfForest: {
    extentOfForest: 'نطاق الغابة والأرض الحرجية الأخرى',
    estimationAndForecasting: 'تقييمات وتنبؤات',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    forestArea: 'غابة',
    chart: {
      placeholderLine1: 'للبدء، قم بإضافة نقاط بيانات وطنية جديدة واستخدمها',
      placeholderLine2: 'لإيجاد القيم الخاصة بتقييم الموارد الحرجية آلياً',
    },
    otherLandCategories: 'فئات أراض أخرى',
    ofWhichPalms: 'منها النخيل (زيت، جوز الهند، تمر، إلخ)',
    ofWhichTreeOrchards: '... منها بساتين أشجار مختلفة (بما فيها الفاكهة والمكسرات والزيتون، إلخ)',
    ofWhichAgroforestry: 'منها زراعة حرجية',
    ofWhichTreesUrbanSettings: '...منها أشجار في بيئات حضرية',
    totalLandArea: 'إجمالي مساحة الأرض',
    fedAreasExceedTotalLandArea: 'مساحة الغابة والأرض الحرجية الأخرى تتجاوز إجمالي مساحة الأرض',
    forestAreaDoesNotMatchPreviouslyReported:
      'مساحة الغابة لا تتوافق مع مساحة تقييم الموارد الحرجية لعام {{year}}: {{previous}}',
    useOriginalDataPoints: 'استخدم نقاط البيانات الوطنية',
    dontUseOriginalDataPoints: 'لاتستخدم نقاط البيانات الوطنية',
    whatIsThis: 'ما هذا؟',
    tableNoticeMessage:
      'استخدم الرقم المتعلق بمساحة الأرض المستمد من قاعدة البيانات الإحصائية الموضوعية في منظمة الأغذية والزراعة لعام 2015 لكافة السنوات المرجعية',
    ndpMissingValues: 'هنالك قيم مفقودة في نقطة البيانات الوطنية',
    showNDPs: 'إظهار نقاط البيانات الوطنية',
    hideNDPs: 'إخفاء نقاط البيانات الوطنية',
    forestAreaNetChangeDoesNotMatch: 'التغيير الصافي لمساحة الغابة لا يطابق القيمة المتوقعة: {{القيمه}}',
  },

  climaticDomain: {
    climaticDomain: 'النطاق المناخي',
    percentOfForestArea2015: '% من مساحة الغابة عام 2015',
    percentOfForestArea2015Override: 'تجاهل القيمة',
    selectDefault: 'افتراضي',
    boreal: 'شمالية',
    temperate: 'معتدلة',
    subtropical: 'دون استوائية',
    sub_tropical: '$t(climaticDomain.subtropical)',
    tropical: 'استوائية',
  },

  forestCharacteristics: {
    forestCharacteristics: 'مواصفات الغابات',
    estimationAndForecasting: 'تقييمات وتنبؤات',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    naturalForestArea: 'غابة متجددة طبيعياً',
    plantationForestArea: 'غابات مزروعة',
    plantationForestIntroducedArea: '...منها أنواع مدخلة',
    otherPlantedForestArea: 'غابة مزروعة أخرى',
    plantedForest: 'الغابات المزروعة',
    totalForestArea: 'إجمالي مساحة الغابة',
    total: 'الإجمالي',
    useOriginalDataPoints: 'استخدم نقاط البيانات الوطنية',
    dontUseOriginalDataPoints: 'لا تستخدم نقاط البيانات الوطنية',
  },

  tableWithOdp: {
    confirmGenerateFraValues: 'هل تود تجاهل القيم الموجودة؟',
    generateFraValues: 'أوجد قيماً',
    linearExtrapolation: 'خطي',
    repeatLastExtrapolation: 'كرر الأخير',
    annualChangeExtrapolation: 'تغيير سنوي',
    placeholderFuture: 'في المستقبل',
    placeholderPast: 'في الماضي',
    copyToClipboard: 'انسخ القيم',
    placeholderSelect: 'تقييمات وتنبؤات',
    _1000haYear: '1000 هـ/العام',
    generatingFraValues: 'جارٍ الإنشاء ...',
  },

  forestAreaChange: {
    forestAreaChange: 'اتساع مساحة الغابة، وإزالة الغابة، وصافي التغيير سنوياً.',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ/العام)',
    forestExpansion: 'اتساع مساحة الغابة',
    ofWhichAfforestation: '...منها تحريج',
    ofWhichNaturalExpansion: '...منها اتساع طبيعي',
    deforestation: 'إزالة الغابة',
    forestAreaNetChange: 'صافي التغيير في مساحة الغابة',
    forestAreaNetChangeFrom1a: 'تم حساب تغيير مساحة الغابات من الجدول 1أ',
    netChangeDoesNotMatch: 'غير مطابق لصافي التغيير في مساحة الغابة',
  },

  annualReforestation: {
    annualReforestation: 'إعادة التحريج السنوي',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ/العام)',
    reforestation: 'إعادة التحريج',
  },

  specificForestCategories: {
    specificForestCategories: 'فئات الغابات البكر والغابات الخاصة',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ)',
    bamboo: 'خيزران',
    mangroves: 'منغروف',
    temporarilyUnstocked: 'غابة أزيلت أشجارها مؤقتاً أو أعيد تجديدها مؤخراً أو كليهما',
    primaryForest: 'غابة بكر',
    exceedsNaturallyRegeneratingForest: 'تتجاوز الغابة المتجددة طبيعياً (1ب)',
    rubberWood: 'خشب المطاط',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover: 'أرض أخرى ذات غطاء شجري',
    areaUnitLabel: 'المساحة (1000 هـ)',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    palms: 'نخيل',
    treeorchards: 'بساتين أشجار',
    agroforestry: 'زراعة حرجية',
    treesinurbansettings: 'الأشجار في بيئات حضرية',
    total: 'الإجمالي',
    otherLandArea: 'مساحة أرض أخرى',
    other: 'غير ذلك (حددها في التعليقات)',
  },

  growingStock: {
    growingStock: 'مخزون الأشجار الحية',
    supportText: 'يرجى التأكد من إدخالك للبيانات في الجدولين 1أ و1ب قبل تعديل هذا الجدول',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    avgTableHeader: 'مخزون الأشجار الحية م3/هـ (مع اللحاء)',
    totalTableHeader: 'إجمالي مخزون الأشجار الحية (مليون م3 مع اللحاء)',
    naturallyRegeneratingForest: 'غابة متجددة طبيعياً',
    plantedForest: 'الغابات المزروعة',
    plantationForest: '...منها غابة اصطناعيه',
    otherPlantedForest: '...منها غابة مزروعة أخرى',
    forest: 'غابة',
    otherWoodedLand: 'أرض حرجية أخرى',
    copyToClipboard: 'انسخ القيم',
  },

  growingStockComposition: {
    native: 'أصلية',
    introduced: 'مدخلة',
    growingStockComposition: 'تكوين مخزون الأشجار الحيّة بالغابات',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    nativeTreeSpecies: 'أنواع أشجار أصلية',
    introducedTreeSpecies: 'أنواع أشجار مدخلة',
    areaUnitLabel: 'مخزون الأشجار الحية في الغابة (مليون م3 مع اللحاء)',
    scientificName: 'الاسم العلمي',
    commonName: 'الاسم الشائع',
    rank: '#{{idx}} مصنفة من حيث الحجم',
    remainingNative: 'أنواع الأشجار الأصلية المتبقية',
    remainingIntroduced: 'أنواع الأشجار المدخلة المتبقية',
    totalNative: 'إجمالي حجم أنواع الأشجار الأصلية',
    totalIntroduced: 'إجمالي حجم أنواع الأشجار المدخلة',
    totalGrowingStock: 'إجمالي مخزون الأشجار الحية',
    rankingYear: 'عام التصنيف 2015',
  },

  biomassStock: {
    biomassStock: 'مخزون الكتلة الحيوية',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    tableHeader: 'الكتلة الحيوية الحرجية (طن/هـ)',
    aboveGround: 'الكتلة الحيوية فوق الأرض',
    belowGround: 'الكتلة الحيوية تحت الأرض',
    deadWood: 'خشب ميت',
    downloadExcel: 'تنزيل حاسبة إكسل',
  },

  carbonStock: {
    carbonStock: 'مخزون الكربون',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    tableHeader: 'الكربون الحرجي (طن/هـ)',
    carbonAboveGroundBiomass: 'الكربون في الكتلة الحيوية فوق الأرض',
    carbonBelowGroundBiomass: 'الكربون في الكتلة الحيوية تحت الأرض',
    carbonDeadwood: 'الكربون في الخشب الميت',
    carbonLitter: 'الكربون في المهاد',
    carbonSoil: 'كربون التربة',
    soilDepthHeading: 'عمق التربة (سم) المستخدم في تقدير كربون التربة',
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'الهدف المحدد للإدارة',
    primaryDesignatedManagementObjective: 'الهدف الرئيسي المحدد للإدارة',
    primaryDesignatedManagementObjectiveSupport:
      'إن الهدف الرئيس المحدد لإدارة الغابة هو ذو أهمية أكبر بكثير قياساً بسائر الأهداف الأخرى. وتعد الأهداف الرئيسة المختلفة للإدارة *حصرية* بمعنى أن المناطق التي تخضع لهدف رئيس للإدارة لا يجب إدراجها في التقارير بغرض إخضاعها لأهداف رئيسة أخرى للإدارة. في حين يضاف إلى الغابة مجموع الأهداف المختلفة للإدارة.  ',
    totalAreaWithDesignatedManagementObjective: 'إجمالي المساحة الخاضعة لهدف إدارة محدد',
    totalAreaWithDesignatedManagementObjectiveSupport:
      'الهدف المحدد للإدارة، بغض النظر أكان الهدف رئيساً أم لا. فالفئات المحددة المختلفة للإدارة هي فئات *غير حصرية*، ما يعطي إمكانية إدراج المناطق في التقارير أكثر من مرة. فعلى سبيل المثال بالنسبة لمنطقة الغابة التي اعتبرت في التقارير أنها خاضعة لهدف إدارة رئيس متمثل في "استخدام متعدد" يجب إدراجها في التقارير عند كل هدف من أهداف الإدارة. ما قد يفضي بالتالي إلى أن مجموع الأهداف المختلفة للإدارة سيتجاوز إجمالي منطقة الغابة.',
    categoryHeader: 'فئات تقييم الموارد الحرجية لعام 2020',
    areaUnitLabel: 'مساحة الغابة (1000 هـ)',
    production: 'الإنتاج',
    soilWaterProtection: 'حماية التربة والمياه',
    biodiversityConservation: 'حفظ التنوع الحيوي',
    socialServices: 'خدمات اجتماعية',
    multipleUse: 'متعدد الاستخدام',
    other: 'غير ذلك (حدده في التعليقات)',
    unknown: 'لا يوجد/مجهول',
    totalForestArea: 'إجمالي مساحة الغابة',
    total: 'الإجمالي',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas: 'مساحة الغابة ضمن المناطق المحمية ومساحة الغابة الخاضعة لخطط إدارة طويلة الأجل',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ)',
    header: 'مساحة الغابة ضمن المناطق المحمية',
    forestAreaWithLongTermManagementPlan: 'مساحة الغابة الخاضعة لخطة إدارة طويلة الأجل للغابة',
    ofWhichInProtectedAreas: '...منها في مناطق محمية',
  },

  forestOwnership: {
    forestOwnership: 'ملكية الغابة',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'مساحة الغابة (1000 هـ)',
    privateOwnership: 'ملكية خاصة',
    ofWhichIndividuals: 'منها خاضع لملكية الأفراد',
    ofWhichPrivateBusinesses: '...منها خاضع لملكية كيانات ومؤسسات أعمال خاصة',
    ofWhichCommunities: '...منها خاضع لملكية مجتمعات محلية وقبلية وأصلية',
    publicOwnership: 'ملكية عامة',
    otherOrUnknown: 'مجهولة/غير ذلك (حددها في التعليقات)',
    totalForestArea: 'إجمالي مساحة الغابة',
    total: 'الإجمالي',
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'صاحب حقوق إدارة الغابات العامة',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'مساحة الغابة (1000 هـ)',
    publicAdministration: 'إدارة عامة',
    individuals: 'أفراد',
    privateBusinesses: 'كيانات ومؤسسات أعمال تابعة للقطاع الخاص',
    communities: 'مجتمعات محلية وقبلية وأصلية',
    other: 'مجهولة/غير ذلك (حددها في التعليقات)',
    totalPublicOwnership: 'إجمالي الملكية العامة',
    total: 'الإجمالي',
    publicOwnershipDoesNotMatch: 'غير مطابق لإجمالي الملكية العامة',
  },

  disturbances: {
    disturbances: 'اضطرابات',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ)',
    insects: 'حشرات',
    diseases: 'أمراض',
    severeWeatherEvents: 'الظواهر الجوية القاسية',
    other: 'غير ذلك (حددها في التعليقات)',
    totalForestArea: 'إجمالي مساحة الغابة',
    total: 'الإجمالي',
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'المساحة المتضررة بالحرائق',
    categoryHeader: 'فئات تقييم الموارد الحرجية',
    areaUnitLabel: 'المساحة (1000 هـ)',
    totalLandAreaAffectedByFire: 'إجمالي مساحة الاراضي المتضررة بالحرائق',
    ofWhichForest: '...منها في الغابات',
  },

  degradedForest: {
    degradedForest: 'غابة متدهورة',
    doesYourCountryMonitor: 'هل يتم رصد منطقة الغابة المتدهورة في بلدك',
    ifYes: 'إن كانت الإجابة "نعم"عندها',
    whatIsDefinition: 'ما هو تعريف "الغابة المتدهورة" على المستوى الوطني؟',
    howMonitored: 'صف عملية الرصد والنتائج',
  },

  forestPolicy: {
    forestPolicy: 'السياسات والتشريع والمنصة الوطنية المطلوبة لمشاركة أصحاب الشأن في السياسة المتعلقة بالغابات',
    categoryHeader: 'أشر إلى وجود',
    areaUnitLabel: 'بوليني  (نعم/لا)',
    national: 'وطني',
    subnational: 'دون وطني',
    policiesSFM: 'سياسات داعمة للإدارة المستدامة للغابات',
    legislationsSFM: 'التشريعات واللوائح الداعمة للإدارة المستدامة للغابات',
    stakeholderParticipation: 'المنصة التي تعزز أو تتيح مشاركة أصحاب الشأن في رسم سياسة الغابات',
    existenceOfTraceabilitySystem: 'نظام (نظم) تعقب المنتجات الخشبية',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'مساحة الأرض المخصصة للغابة بشكل دائم',
    categoryHeader: 'فئات تقييم الموارد الحرجية لعام 2020',
    areaUnitLabel: 'مساحة الغابة (1000 هـ)',
    applicable: 'أقابل للتطبيق؟',
  },

  employment: {
    employment: 'التوظيف في الحراجة وقطع الأشجار',
    average: 'معدل ثلاث سنوات',
    categoryHeader: 'فئات تقييم الموارد الحرجية لعام 2020',
    unitHeader: 'مكافئ العمل بدوام كامل (1000)',
    inForestry: 'التوظيف في الحراجة وقطع الأشجار',
    ofWhichSilviculture: '...منها أنشطة حرجية وغيرها من الأنشطة المرتبطة بالغابات',
    ofWhichLogging: '...منها قطع الأشجار',
    ofWhichGathering: '...منها جمع منتجات حرجية غير خشبية',
    ofWhichSupport: '...منها تقديم خدمات دعم الحراجة',
    total: 'الإجمالي',
    female: 'أنثى',
    male: 'ذكر',
  },

  graduationOfStudents: {
    graduationOfStudents: 'تخريج طلاب في ميدان التعليم المرتبط بالغابات',
    average: 'معدل ثلاث سنوات',
    numberOfStudents: 'عدد الطلاب الخريجين',
    fra2020Categories: 'فئات تقييم الموارد الحرجية لعام 2020',
    doctoralDegree: 'درجة الدكتوراة',
    mastersDegree: 'درجةالماجستير',
    bachelorsDegree: 'درجة البكالوريوس',
    technicianCertificate: 'شهادة/دبلوم فني',
    total: 'الإجمالي',
    female: 'أنثى',
    male: 'ذكر',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'إزالة منتجات حرجية غير خشبية وقيمتها عام 2015',
    nameOfProduct: 'اسم المنتج الحرجي غير الخشبي',
    keySpecies: 'النوع الأساسي',
    quantity: 'الكمية',
    unit: 'الواحدة',
    value: 'القيمة (1000 عملة محلية)',
    category: 'فئة المنتج الحرجي غير الخشبي',
    plantProductsSelectHeading: 'منتجات نباتية/مادة أولية',
    food: '1 غذاء',
    fodder: '2 علف',
    rawMaterialForMedicine: '3 مادة أولية لمنتجات طبية وعطرية',
    rawMaterialForColorants: '4 مادة أولية تستخدم في الملونات والأصبغة',
    rawMaterialForUtensils: '5 مادة أولية تستخدم في صناعة أوانٍ يدوية ',
    ornamentalPlants: '6 نباتات زينة',
    exudates: '7 نضحات',
    otherPlantProducts: '8 منتجات نباتية أخرى',
    animalProductsSelectHeading: 'منتجات حيوانية/ مادة أولية',
    livingAnimals: '9 حيوانات حية',
    hidesSkins: '10 جلود الحيوانات ونصبها',
    wildHoney: '11 عسل بري وشمع النحل',
    wildMeat: '12 لحم بري',
    animalRawMaterialForMedicine: '13 مادة أولية للأدوية',
    animalRawMaterialForColorants: '14 مادة أولية للملونات',
    otherEdibleAnimalProducts: '15 منتجات حيوانية أخرى صالحة للأكل',
    otherNonEdibleAnimalProducts: '16 منتجات حيوانية أخرى غير صالحة للأكل',
    allOtherPlantProducts: 'جميع المنتجات النباتية الأخرى',
    allOtherAnimalProducts: 'جميع المنتجات الحيوانية الأخرى',
    total: 'الإجمالي',
    currency: 'اسم العملة',
    notSelected: '',
  },

  sustainableDevelopment: {
    sustainableDevelopment: 'الهدف الخامس عشر من أهداف التنمية المستدامة',
    indicator: 'المؤشر',
    percent: 'النسبة المئوية',
    nameOfAgencyResponsible: 'اسم الهيئة المسؤولة',
    sdgIndicator1: 'مؤشر هدف التنمية المستدامة 15-1-1 مساحة الغابة كنسبة من إجمالي مساحة الأرض عام 2015',
    sdgIndicator2: 'مؤشر هدف التنمية المستدامة 15-2-1 التقدم باتجاه الإدارة المستدامة للغابات',
    forestAreaProportionLandArea2015: 'مساحة الغابة كنسبة من إجمالي مساحة الأرض عام 2015',
    subIndicator: 'المؤشر الفرعي {{no}}',
    forestAreaAnnualNetChangeRate: 'المعدل السنوي لصافي التغيير في مساحة الغابة',
    aboveGroundBiomassStockForests: 'مخزون الكتلة الحيوية فوق الأرض في الغابة',
    percent2015ForestAreaBaseline: 'النسبة المئوية (بيانات خط المنطلق الخاصة بمساحة الغابة عام 2015)',
    proportionForestAreaLegallyEstablishedProtectedAreas: 'نسبة مساحة الغابة الموجودة ضمن مناطق محمية قانونياً',
    proportionForestAreaLongTermForestManagement: 'نسبة مساحة الغابة الخاضعة لخطة إدارة طويلة الأجل للغابة',
    forestArea1000Ha: 'مساحة الغابة (1000 هـ)',
    forestAreaVerifiedForestManagement: 'مساحة الغابة الخاضعة لخطط اعتماد إدارة الغابة المتحقق منها بشكل مستقل ',
  },

  panEuropeanIndicators: {
    panEuropeanIndicators: 'المؤشرات الكمية في عموم أوروبا للإدارة المستدامة للغابات',
    uploadQuestionnaire: 'حمّل الاستبيان',
    chooseFile: 'اختر ملفاً',
    downloadQuestionnaire: 'نزل الاستبيان',
    download: 'تنزيل',
    remove: 'إزالة',
    noQuestionnaire: 'لم يتم اختيار استبيان',
    panEuropeanQualitativeIndicators: 'المؤشرات الكمية في عموم أوروبا للإدارة المستدامة للغابات',
    accessReportingPage: 'ادخل إلى صفحة إعداد التقارير',
  },

  assessment: {
    fra: 'تقييم الموارد الحرجية عام',
    panEuropean: 'عموم أوروبا',
    deskStudy: 'دراسة مكتبية',
    statusChangeNotification: {
      subject: '{{country}} تغير الحالة الي {{status}} على منصة تقييم الموارد الحرجية.',
      textMessage: `عزيزي {{recipientName}},

{{changer}} غير الحالة الخاصه {{assessment}} إلى "{{status}}"بالنسبة لـ  {{country}} على منصة تقييم الموارد الحرجية.

{{message}}

قم بزيارة المنصة على: {{- serverUrl}}

فريق تقييم الموارد الحرجية
{{- serverUrl}}`,
      htmlMessage: `عزيزي {{recipientName}},
<br/><br/>
{{changer}} غير الحالة الخاصه {{assessment}} إلى "{{status}}"بالنسبة لـ {{country}} على منصة تقييم الموارد الحرجية.
<br/><br/>
{{message}}
<br/><br/>
<a href="{{- serverUrl}}"><b>لزيارة المنصة</b></a>
<br/><br/>
فريق تقييم الموارد الحرجية
<br/>
{{- serverUrl}}`,
    },
    status: {
      changing: {
        label: 'تغيير...',
      },
      editing: {
        label: 'تعديل...',
        previous: 'العودة إلى تعديل',
      },
      review: {
        label: 'قيد المراجعة',
        next: 'أرسل إلى المراجعة',
        previous: 'العودة إلى المراجعة',
      },
      approval: {
        label: 'بانتظار الموافقة',
        next: 'أرسل للحصول على الموافقة',
        previous: 'العودة إلى الموافقة',
      },
      accepted: {
        label: 'مقبول',
        next: 'اقبل',
        previous: '',
      },
      notStarted: {
        label: 'لم يبدأ',
      },
    },
  },

  multiSelect: {
    placeholder: 'اختر...',
  },

  emoji: {
    picker: {
      search: 'ابحث',
      categories: {
        search: 'ابحث في النتائج',
        recent: 'مستخدم بشكل متكرر',
        people: 'أوجه ضاحكة وأشخاص',
        nature: 'حيوانات وطبيعة',
        foods: 'طعام وشراب',
        activity: 'نشاط',
        places: 'سفر وأماكن',
        objects: 'أشياء',
        symbols: 'رموز',
        flags: 'أعلام',
      },
    },
  },

  editUser: {
    activate: 'تفعيل',
    activated: 'مفعل',
    chooseProfilePicture: 'اختر صورة',
    city: 'المدينة',
    contactPreference: 'الطريقة المفضلة للاتصال',
    contactPreferenceMethod: 'طريقة الاتصال',
    contributions: 'مساهمات',
    countryIso: 'البلد',
    deactivate: 'إلغاء التفعيل',
    demoteToUser: 'هل أنت متأكد أنك تريد إزالة امتيازات المسؤول؟',
    done: 'حفظ',
    email: 'البريد الإلكتروني',
    institution: 'المؤسسة',
    loginEmail: 'تسجيل دخول',
    mandatoryFields: '* هي خانات إلزامية',
    mr: 'السيد',
    mrs: 'السيدة',
    ms: 'السيدة',
    name: 'الاسم',
    organization: 'المنظمة',
    organizationalUnit: 'وحدة تنظيمية',
    other: 'الاخر',
    picture1MbMax: 'لا يجب أن يزيد حجم صورة الملف الشخصي عن 1 ميجابايت',
    platformChat: 'منصة الدردشة',
    poBox: 'الصندوق البريدي',
    position: 'المنصب',
    primaryEmail: 'عنوان البريد الإلكتروني الرئيسي',
    primaryPhoneNumber: 'رقم الهاتف الأساسي',
    professionalTitle: 'المسمى الوظيفي',
    promoteToAdmin: 'هل أنت متأكد أنك تريد منح امتيازات المسؤول؟',
    role: 'الدور',
    secondaryEmail: 'عنوان البريد الإلكتروني الثانوي',
    secondaryPhoneNumber: 'رقم الهاتف الثانوي',
    signal: 'الإشارة',
    skype: 'اسم المستخدم في سكايب',
    status: 'الحالة',
    street: 'العنوان',
    surname: 'اللقب ',
    title: 'التسمية',
    whatsapp: 'رقم الواتس اب',
    zipCode: 'الرمز البريدي',
  },

  country: {
    region: {
      asia: 'آسيا',
      europe: 'أوروبا',
      oceania: 'أوقيانوسيا',
      north_and_central_america: 'أمريكا الشمالية والوسطى',
      south_america: 'أمريكا الجنوبية',
      africa: 'أفريقيا',
      atlantis: 'أطلانطس',
      forest_europe: 'المبادرة الأوروبية للغابات',
    },
  },

  countryMessageBoard: {
    messageBoard: 'لوح الرسائل',
    messageBoardDesc: 'يمكن لجميع الأعضاء القطريين مشاهدة الرسائل الموضوعة هنا ',
    oneToOneMessages: 'رسائل من شخص إلى شخص',
  },

  tutorial: {
    watch: 'المشاهدة',
    passwordLogin: 'البرنامج التعليمي لمنصة الفرا - كيفية تسجيل الدخول باستخدام كلمة مرور محددة ذاتيًا.',
    googleLogin: 'البرنامج التعليمي لمنصة الفرا - كيفية تسجيل الدخول باستخدام جوجل.',
    collaboratorAdd: 'البرنامج التعليمي لمنصة الفرا - كيفية إضافة شخص اخر للتعاون في ملئ التقارير',
    platformNavigation: 'البرنامج التعليمي لمنصة الفرا - استكشاف المنصة',
    documentUpload: 'البرنامج التعليمي لمنصة الفرا - كيفية رفع المستندات',
    ndpAdd: 'البرنامج التعليمي لمنصة الفرا - كيفية إضافة نقطة بيانات وطنية',
    passwordLoginShort: 'كيفية تسجيل الدخول باستخدام كلمة مرور محددة ذاتيًا',
    googleLoginShort: 'كيفية تسجيل الدخول باستخدام جوجل',
    guidelinesAndSpecifications: 'المبادئ التوجيهية والمواصفات',
    ndpAddReferenceLink: 'البرنامج التعليمي لمنصة الفرا - كيفية إضافة رابط مرجعي لنقطة البيانات الوطنية؟',
    nationalDataAddReferenceLink: 'البرنامج التعليمي لمنصة الفرا - كيفية إضافة رابط مرجعي للبيانات الوطنية؟',
  },

  panEuropean: {
    panEuropeanAssessment: 'تقييم عموم أوروبا',
    variable: 'متغير',
    landing: {
      link: 'إعداد تقارير مشتركة بين المبادرة الأوروبية للغابات/اللجنة الاقتصادية لأوروبا التابعة للأمم المتحدة/منظمة الأغذية والزراعة حول مؤشرات عموم أوروبا الخاصة بالإدارة المستدامة للغابات: المبادرة الأوروبية للغابات.',
    },
    home: {
      description1:
        'تتألف مجموعة البيانات من معلومات قدمها مراسلون وطنيون استجابة إلى استبيان مشترك بين المبادرة الأوروبية للغابات واللجنة الاقتصادية لأوروبا التابعة للأمم المتحدة ومنظمة الأغذية والزراعة حول مؤشرات كمية لعموم أوروبا خاصة بالإدارة المستدامة للغابات.',
      description2:
        'نفذ إعداد تقارير عموم أوروبا لعام 2020 على التوازي مع تقييم الموارد الحرجية لعام 2020. صحيح أنهما عمليتين منفصلتين، إلا أن بعض المتغيرات ظهرت في كليهما معاً. وهنا تجدر الملاحظة أنه تم تعديل بعض المعلومات المتعلقة بحالة الغابات في أوروبا عام 2020 في أعقاب جمع البيانات بالمشورة مع مراسلين وطنيين، وبالتالي قد تختلف تلك البيانات عن التي جرى تقديمها على منصة تقييم الموارد الحرجية. ',
    },
    disclaimer: {
      and: 'و',
      forestEurope: 'المبادرة الأوروبية للغابات',
      govSwitzerland: 'حكومة سويسرا',
      part1: 'أعد هذا الموقع الإلكتروني بمساعدة [دعم] من',
    },

    // navigation
    navigation: {
      forestResourcesAndCarbon: 'الموارد الحرجية والكربون',
      maintenanceOfForestEcosystemHealthAndVitality: 'الحفاظ على صحة النظام الإيكولوجي للغابات وحيويته',
      productiveFunctionsOfForestsWoodAndNonWood: 'وظائف إنتاجية للغابات (خشبية وغير خشبية)',
      biologicalDiversityInForestEcosystems: 'التنوع الحيوي في النظم الإيكولوجية للغابات',
      protectiveFunctionsInForestManagement: 'وظائف وقائية في إدارة الغابات',
      socioEconomicFunctionsAndConditions: 'وظائف وظروف اجتماعية واقتصادية',
    },

    // table 1.1a
    forestArea: {
      forestArea: 'مساحة الغابة',
      categoryYear: 'الفئة - العام',
      area: 'المساحة',
      area1000Ha: 'المساحة (1000 هـ)',
      forest: 'غابة- {{year}}',
      _of_which_available_for_wood_supply: '...منها متاح للإمداد بالأخشاب - {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي الغابات والأراضي الحرجية الأخرى - {{year}}',
      other_land: 'أرض أخرى - {{year}}',
      _of_which_with_tree_cover: '...منها ذات غطاء شجري - {{year}}',
    },

    // table 1.1b
    forestAreaByForestTypes: {
      forestAreaByForestTypes: 'مساحة الغابة وفق أنماط الغابة',
      category: 'الفئة',
      forestArea1000Ha: 'مساحة الغابة (1000 هـ)',
      predominantly_coniferous_forest: 'غابة أشجار صنوبرية بالدرجة الأولى',
      predominantly_broadleaved_forest: 'غابة أشجار عريضة الأوراق بالدرجة الأولى',
      mixed_forest: 'غابة خليطة',
      forest_area_1990: 'مساحة الغابة – 1990',
      forest_area_2000: 'مساحة الغابة – 2000',
      forest_area_2005: 'مساحة الغابة – 2005',
      forest_area_2010: 'مساحة الغابة – 2010',
      forest_area_2015: 'مساحة الغابة – 2015',
      forest_area_2020: 'مساحة الغابة – 2020',
    },

    // table 1.2a
    growingStock: {
      growingStock: 'مخزون الأشجار الحية',
      categoryYear: 'الفئة - العام',
      growingStockMillionM3OB: 'مخزون الأشجار الحية (مليون م3 مع اللحاء)',
      total: 'الإجمالي',
      _ofWhich: '...منها',
      coniferous: 'صنوبرية',
      broadleaved: 'عريضة الأوراق',
      forest: 'الغابة- {{year}}',
      _of_which_available_for_wood_supply: '...منها متاح للإمداد بالأخشاب - {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 1.2b
    growingStockByForestType: {
      growingStockByForestType: 'مخزون الأشجار الحية وفق نمط الغابة',
      category: 'الفئة',
      growingStockMillionM3OB: 'مخزون الأشجار الحية (مليون م3 مع اللحاء)',
      predominantly_coniferous_forest: 'غابة أشجار صنوبرية بالدرجة الأولى ',
      predominantly_broadleaved_forest: 'غابة أشجار عريضة الأوراق بالدرجة الأولى',
      mixed_forest: 'غابة مختلطة',
      growing_stock_1990: 'مخزون أشجار حية – 1990',
      growing_stock_2000: 'مخزون أشجار حية - 2000',
      growing_stock_2005: 'مخزون أشجار حية - 2005',
      growing_stock_2010: 'مخزون أشجار حية - 2010',
      growing_stock_2015: 'مخزون أشجار حية - 2015',
      growing_stock_2020: 'مخزون أشجار حية - 2020',
    },

    // table 1.2c
    growingStockComposition: {
      growingStockComposition: 'تكوين مخزون الأشجار الحيّة بالغابات',
      speciesName: 'اسم النوع',
      growingStockInForestMillionM3OB: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء)',
      rank: 'التصنيف',
      scientificName: 'الاسم العلمي',
      commonName: 'الاسم الشائع',
      no1_ranked_in_terms_of_volume: 'مصنفة #1 من حيث الحجم',
      no2_ranked_in_terms_of_volume: 'مصنفة #2 من حيث الحجم',
      no3_ranked_in_terms_of_volume: 'مصنفة #3 من حيث الحجم',
      no4_ranked_in_terms_of_volume: 'مصنفة #4 من حيث الحجم',
      no5_ranked_in_terms_of_volume: 'مصنفة #5 من حيث الحجم',
      no6_ranked_in_terms_of_volume: 'مصنفة #6 من حيث الحجم',
      no7_ranked_in_terms_of_volume: 'مصنفة #7 من حيث الحجم',
      no8_ranked_in_terms_of_volume: 'مصنفة #8 من حيث الحجم',
      no9_ranked_in_terms_of_volume: 'مصنفة #9 من حيث الحجم',
      no10_ranked_in_terms_of_volume: 'مصنفة #10 من حيث الحجم',
      remaining: 'المتبقي',
      total: 'الإجمالي',
      scientific_name: 'الاسم العلمي',
      common_name: 'الاسم الشائع',
      growing_stock_in_forest_1990: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) – 1990',
      growing_stock_in_forest_2000: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) - 2000',
      growing_stock_in_forest_2005: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) - 2005',
      growing_stock_in_forest_2010: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) - 2010',
      growing_stock_in_forest_2015: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) - 2015',
      growing_stock_in_forest_2020: 'المخزون من الأشجار الحية في الغابة (مليون م3 مع اللحاء) - 2020',
    },

    // table 1.3a1
    ageClassDistributionAreaOfEvenAgedStands: {
      ageClassDistributionAreaOfEvenAgedStands: 'توزع فئة العمر (مساحة الشجراء ذات العمر المتساوي)',
      categoryYear: 'الفئة - العام',
      developmentPhases: 'أطوار التطور',
      total_area: 'إجمالي المساحة',
      regeneration_phase: 'طور التجدد',
      intermediate_phase: 'الطور المتوسط',
      mature_phase: 'طور النضوج',
      unspecified: 'غير محدد',
      _1000Ha: '1000 هـ',
      forest_even_aged_stands_of_which: 'الغابة (الشجراء ذات العمر المتساوي)، منها: - {{year}}',
      available_for_wood_supply_of_which: 'متوافرة للإمداد بالأخشاب، منها: - {{year}}',
      predominantly_coniferous_forest: 'غابة صنوبرية بالدرجة الأولى - {{year}}',
      predominantly_broadleaved_forest: 'غابة أشجار عريضة الأوراق بالدرجة الأولى - {{year}}',
      mixed_forest: 'غابة خليطة - {{year}}',
    },

    // table 1.3a2
    ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply: {
      ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply:
        'توزع فئة العمر (حجم الشجراء ذات العمر المتساوي) في الغابة المتوافرة للإمداد بالأخشاب',
      categoryYear: 'الفئة - العام',
      developmentPhases: 'أطوار التطور',
      total_volume: 'إجمالي الحجم',
      regeneration_phase: 'طور التجدد',
      intermediate_phase: 'الطور المتوسط',
      mature_phase: 'طور النضوج',
      unspecified: 'غير محدد',
      _1000M3: '1000 م3',
      forest_available_for_wood_supply_even_aged_stands_of_which:
        'غابة متوافرة للإمداد بالأخشاب (شجراء ذات عمر متساو)، منها: - {{year}}',
      predominantly_coniferous_forest: 'غابة صنوبرية بالدرجة الأولى - {{year}}',
      predominantly_broadleaved_forest: 'غابة أشجار عريضة الأوراق بالدرجة الأولى - {{year}}',
      mixed_forest: 'غابة خليطة - {{year}}',
    },

    // table 1.3b
    diameterDistributionAndTotalAreaUnevenAgedStands: {
      diameterDistributionAndTotalAreaUnevenAgedStands:
        'التوزع بحسب قطر الشجرة وإجمالي المساحة (شجراء غير متساوية العمر)',
      categoryYear: 'الفئة - العام',
      volumeByDiameterClasses1000mob: 'الحجم وفق فئات القطر',
      area: 'المساحة (1000 هـ)',
      total_volume: 'إجمالي الحجم (1000 م3 مع اللحاء)',
      less_or_equal_20_cm: 'أصغر أو يساوي 20 سم (1000 م3 مع اللحاء)',
      _21_40_cm: 'من 21-40 سم (1000 م3 مع اللحاء)',
      _41_60_cm: 'من 41 – 60 سم (1000 م3 مع اللحاء)',
      greater_60_cm: 'أكبر من 60 سم (1000 م3 مع اللحاء)',
      unspecified: 'غير محدد (1000 م3 مع اللحاء)',
      forest_uneven_aged_stands: 'شجراء حرجية غير متساوية العمر - {{year}}',
      _of_which_forest_available_for_wood_supply: '...منها: غابة متوافرة للإمداد بالأخشاب - {{year}}',
    },

    // table 1.4a
    carbonStock: {
      carbonStock: 'مخزون الكربون',
      categoryYear: 'الفئة - العام',
      carbonInAboveGroundAndBelowGroundLivingBiomass: 'الكربون في الكتلة الحيوية الحية فوق الأرض وتحت الأرض',
      carbonInDeadwoodAndLitter: 'الكربون في الخشب الميت والمهاد',
      above_ground: 'الكربون في الكتلة الحيوية الحية فوق الأرض',
      aboveGround: 'فوق الأرض',
      below_ground: 'الكربون في الكتلة الحيوية الحية تحت الأرض',
      belowGround: 'تحت الأرض',
      deadwood: 'الكربون في الخشب الميت',
      deadwoodCarbon: 'خشب ميت',
      litter: 'الكربون في المهاد',
      litterCarbon: 'مهاد',
      soil_carbon: 'الكربون في التربة',
      millionMetricTonnes: 'مليون طن متري',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 1.4b
    carbonStockInHarvestedWoodProductsHWP: {
      carbonStockInHarvestedWoodProductsHWP: 'مخزون الكربون في المنتجات الخشبية المحصودة ',
      categoryYear: 'الفئة - العام',
      totalCarbonStockInHWPMillionMetricTonnes: 'إجمالي مخزون الكربون في المنتجات الخشبية المحصودة (مليون طن متري)',
      total_carbon_stock_in_hwp: 'إجمالي مخزون الكربون في المنتجات الخشبية المحصودة',
      harvested_wood_products: 'منتجات خشبية محصودة - {{year}}',
    },

    // table 2.4
    forestAreaWithDamage: {
      forestAreaWithDamage: 'المساحة المتضررة من الغابة',
      categoryYear: 'الفئة - العام',
      areaWithDamageByDifferentAgents: 'المساحة المتضررة بفعل عوامل مختلفة',
      primarilyDamagedByBioticAgents: 'متضررة بفعل عوامل أحيائية بالدرجة الأولى',
      damagePrimarilyHumanInduced: 'الضرر ناجم عن البشر بالدرجة الأولى',
      primarilyDamagedByFire: 'متضررة بالحرائق بالدرجة الأولى',
      thousandHa: '1000 هـ',
      total_area_with_damage: 'إجمالي المساحة المتضررة',
      insects_and_disease: 'عوامل أحيائية: حشرات وأمراض',
      insectsAndDisease: 'حشرات وأمراض',
      wildlife_and_grazing: 'عوامل أحيائية: حياة برية ورعي',
      wildlifeAndGrazing: 'حياة برية ورعي',
      forest_operations: 'ناجم عن البشر: عمليات حرجية',
      forestOperations: 'عمليات حرجية',
      other: 'ناجم عن البشر: غير ذلك',
      otherHumanInduced: 'غير ذلك',
      primarily_damaged_by_abiotic_agents: 'عوامل غير أحيائية (عواصف، رياح، ثلوج، إلخ)',
      primarilyDamagedByAbioticAgents: 'متضررة بالدرجة الأولى بعوامل غير أحيائية (عواصف، رياح، ثلوج، إلخ)',
      primarily_damaged_by_fire_total: 'حرائق: الإجمالي',
      primarilyDamagedByFireTotal: 'الإجمالي',
      of_which_human_induced: 'حرائق: منها ناجم عن البشر',
      ofWhichHumanInduced: 'منها ناجم عن البشر',
      unspecified_mixed_damage: 'ضرر غير محدد/خليط',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي الغابات والأراضي الحرجية الأخرى - {{year}}',
    },

    // table 2.5
    areaWithForestLandDegradation: {
      areaWithForestLandDegradation: 'المساحة ذات الأرض الحرجية المتدهورة',
      categoryYear: 'الفئة - العام',
      totalAreaOfDegradedLand: 'إجمالي مساحة الأرض المتدهورة',
      areaPrimarilyDegradedBy: 'المساحة المتدهورة بالدرجة الأولى بفعل',
      formerDegradedLandRestored: 'استعادة الأرض التي كانت متدهور سابقاً',
      grazing: 'رعي',
      repeatedFires: 'حرائق متكررة',
      airPollution: 'تلوث الهواء',
      desertification: 'تصحر',
      other1: 'غير ذلك 1',
      other2: 'غير ذلك 2',
      other3: 'غير ذلك 3',
      unknown: 'مجهول',
      nA: '',
      thousandHa: '1000 هـ',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي الغابات والأراضي الحرجية الأخرى - {{year}}',
      otherNames: 'أسماء العوامل الأخرى التي تدهورت بفعلها تلك المساحة',
      total_area_of_degraded_land: 'إجمالي مساحة الأرض المتدهورة',
      repeated_fires: 'حرائق متكررة',
      air_pollution: 'تلوث الهواء',
      other_1: 'غير ذلك 1',
      other_2: 'غير ذلك 2',
      other_3: 'غير ذلك 3',
      former_degraded_land_restored: 'استعادة الأرض التي كانت متدهور سابقاً',
    },

    // table 3.1
    incrementAndFellings: {
      incrementAndFellings: 'النمو والقطع',
      categoryYear: 'الفئة - العام',
      fellings: 'قطع',
      volume1000mob: 'الحجم (1000 م3 مع اللحاء)',
      gross_annual_increment: 'إجمالي النمو السنوي',
      natural_losses: 'خسائر طبيعية',
      net_annual_increment: 'صافي النمو السنوي',
      fellings_total: 'القطع: الإجمالي',
      fellingsTotal: 'الإجمالي',
      _of_which_of_natural_losses: 'القطع: خسائر طبيعية',
      ofWhichOfNaturalLosses: '...منها: خسائر طبيعية',
      forest: 'غابة- {{year}}',
      _of_which_forest_available_for_wood_supply: '...منها: غابة متوافرة للإمداد بالأخشاب - {{year}}',
    },

    // table 3.2
    removals: {
      removals: 'إزالة',
      categoryYear: 'الفئة - العام',
      woodRemovals: 'إزالة الأخشاب',
      total: 'الإجمالي',
      industrialRoundwood: 'أخساب مستديرة صناعية',
      woodfuel: 'حطب',
      volume1000M3UB: 'الحجم (1000 م3 مع اللحاء)',
      marketValue1000NationalCurrency: 'القيمة السوقية (1000 عملة وطنية)',
      roundwood: 'أخشاب مستديرة - {{year}}',
      total_volume: 'إجمالي: الحجم (1000 م3 مع اللحاء)',
      industrial_roundwood_volume: 'أخشاب مستديرة صناعية: الحجم (1000 م3 دون اللحاء)',
      industrial_roundwood_market_value: 'أخشاب مستديرة صناعية: القيمة السوقية (1000 عملة وطنية)',
      woodfuel_volume: 'حطب: الحجم (1000 م3 دون اللحاء)',
      woodfuel_market_value: 'حطب: القيمة السوقية (1000 عملة وطنية)',
    },

    // table 3.3
    nonWoodGoods2015: {
      nonWoodGoods2015: 'سلع غير خشبية (2015)',
      rankValue: 'الرتبة (القيمة)',
      nameOfGroupsOfProduct: 'اسم (مجموعات) المنتج',
      keySpecies: 'أنواع أساسية',
      totalHarvestedNonWoodGoods: 'إجمالي السلع غير الخشبية المحصودة',
      unit: 'الواحدة',
      quantity: 'الكمية',
      marketValue1000NationalCurrency: 'Market value (1000 national currency)',
      nwfpCategory: 'فئة المنتجات الحرجية غير الخشبية',
      _01st: 'الرتبة الأولى (القيمة)',
      _02nd: 'الرتبة الثانية (القيمة)',
      _03rd: 'الرتبة الثالثة (القيمة)',
      _04th: 'الرتبة الرابعة (القيمة)',
      _05th: 'الرتبة الخامسة (القيمة)',
      _06th: 'الرتبة السادسة (القيمة)',
      _07th: 'الرتبة السابعة (القيمة)',
      _08th: 'الرتبة الثامنة (القيمة)',
      _09th: 'الرتبة التاسعة (القيمة)',
      _10th: 'الرتبة العاشرة (القيمة)',
      all_other_plant_products: 'جميع المنتجات النباتية الأخرى',
      all_other_animal_products: 'جميع المنتجات الحيوانية الأخرى',
      total: 'الإجمالي',
      name_of_groups_of_product: 'اسم (مجموعات) المنتج',
      key_species: 'أنواع أساسية',
      total_harvested_non_wood_goods_unit: 'إجمالي السلع غير الخشبية المحصودة: الواحدة',
      total_harvested_non_wood_goods_quantity: 'إجمالي السلع غير الخشبية المحصودة: الكمية',
      market_value_1000_national_currency: 'القيمة السوقية (1000 عملة وطنية)',
      nwfp_category: 'فئة المنتجات الحرجية غير الخشبية',
    },

    // table 3.4
    marketedServices2015: {
      marketedServices2015: 'خدمات مسوقة (2015)',
      rankValue: 'الرتبة (القيمة)',
      nameOfServiceProduct: 'اسم الخدمة/المنتج',
      unit: 'الواحدة',
      serviceProvision: 'تقديم الخدمة',
      forestServiceCategory: 'فئة الخدمة الحرجية',
      amountOfServiceProduct: 'حجم الخدمة/المنتج',
      value1000NationalCurrency: 'القيمة (1000 عملةوطنية)',
      _01st: 'الرتبة الأولى (القيمة)',
      _02nd: 'الرتبة الثانية (القيمة)',
      _03rd: 'الرتبة الثالثة (القيمة)',
      _04th: 'الرتبة الرابعة (القيمة)',
      _05th: 'الرتبة الخامسة (القيمة)',
      _06th: 'الرتبة السادسة (القيمة)',
      _07th: 'الرتبة السابعة (القيمة)',
      _08th: 'الرتبة الثامنة (القيمة)',
      _09th: 'الرتبة التاسعة (القيمة)',
      _10th: 'الرتبة العاشرة (القيمة)',
      remaining_total: 'إجمالي الباقي',
      total: 'الإجمالي',
      name_of_service_product: 'اسم الخدمة/المنتج',
      service_provision_amount_of_service_product: 'تقديم الخدمة: حجم الخدمة/المنتج',
      service_provision_value_1000_national_currency: 'تقديم الخدمة: القيمة (1000 عملة وطنية)',
      forest_service_category: 'فئة الخدمة الحرجية',
    },

    // table 4.1
    treeSpeciesComposition: {
      treeSpeciesComposition: 'تركيبة أنواع الأشجار',
      categoryYear: 'الفئة - العام',
      areaWithNumberOfTreeSpeciesOccurring1000ha: 'المساحة مع عدد أنواع الأشجار الموجودة (1000 هـ)',
      area_with_number_of_tree_species_occurring_1: 'المساحة مع عدد أنواع الأشجار الموجودة: 1',
      areaWithNumberOfTreeSpeciesOccurring1: '1',
      area_with_number_of_tree_species_occurring_2_3: 'المساحة مع عدد أنواع الأشجار الموجودة: 2-3',
      areaWithNumberOfTreeSpeciesOccurring2_3: '2-3',
      area_with_number_of_tree_species_occurring_4_5: 'المساحة مع عدد أنواع الأشجار الموجودة: 4-5',
      areaWithNumberOfTreeSpeciesOccurring4_5: '4-5',
      area_with_number_of_tree_species_occurring_6_pl: 'المساحة مع عدد أنواع الأشجار الموجودة: أكثر من 6',
      areaWithNumberOfTreeSpeciesOccurring6_pl: 'أكثر من 6',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 4.2a
    totalForestAreaByExpansionAndRegenerationType: {
      totalForestAreaByExpansionAndRegenerationType: 'إجمالي مساحة الغابة وفق نمط التوسع والتجديد',
      categoryYear: 'الفئة - العام',
      totalAreaOfForestByExpansionRegenerationType1000ha: 'إجمالي مساحة الغابة وفق نمط التوسع والتجديد (1000 هـ)',
      natural_expansion_and_natural_regeneration: 'توسع طبيعي وتجدد طبيعي',
      afforestation_and_regeneration_by_planting_and_or_seeding: 'تحريج وتجديد عن طريق زراعة الغراس أو البذور',
      coppice: 'منسغة',
      forest: 'غابة- {{year}}',
    },

    // table 4.2b
    annualForestExpansionAndRegeneration: {
      annualForestExpansionAndRegeneration: 'التوسع والتجدد السنوي للغابة',
      categoryYear: 'الفئة - العام',
      annualForestExpansionAndRegeneration1000ha: 'التوسع والتجدد السنوي للغابة (1000 هـ)',
      expansionOfForestArea: 'توسع منطقة الغابة',
      regenerationOfForestArea: 'تجدد منطقة الغابة',
      afforestation: 'التوسع: تحريج',
      afforestationExpansion: 'تحريج',
      natural_expansion: 'التوسع: توسع طبيعي',
      naturalExpansion: 'توسع طبيعي',
      natural_regeneration: 'التجدد: تجدد طبيعي',
      naturalRegeneration: 'تجدد طبيعي',
      planting_and_seeding: 'التجدد: زراعة غراس وبذور',
      plantingAndSeeding: 'زراعة غراس وبذور',
      coppice: 'تجدد: منسغة',
      coppiceRegeneration: 'منسغة',
      forest: 'غابة- {{year}}',
    },

    // table 4.3a
    naturalness: {
      naturalness: 'الطبيعية',
      categoryYear: 'الفئة - العام',
      area1000ha: 'المساحة (1000 هـ)',
      undisturbed_by_man: 'غير مضطربة بفعل الإنسان',
      semi_natural: 'شبه طبيعية',
      plantations: 'مزروعة',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية - {{year}}',
    },

    // table 4.3b
    naturalnessBySubclasses: {
      naturalnessBySubclasses: 'الطبيعية وفق الشرائح الفرعية',
      categoryYear: 'الفئة - العام',
      area1000ha: 'المساحة (1000 هـ)',
      semiNatural: 'شبه طبيعية',
      plantations: 'مزروعة',
      naturally_established: 'شبه طبيعي: تأسيس طبيعي',
      naturallyEstablished: 'تأسيس طبيعي',
      naturalised_introduced_species: 'شبه طبيعي: أنواع مدخلة طبيعياً',
      naturalisedIntroducedSpecies: 'أنواع مدخلة طبيعياً',
      established_by_planting_and_or_seeding: 'شبه طبيعي: تأسيس عن طريق زراعة الغراس أو البذور أو كليهما',
      establishedByPlantingAndOrSeeding: 'تأسيس عن طريق زراعة الغراس أو البذور أو كليهما',
      coppice: 'شبه طبيعي: منسغة',
      coppiceSemiNatural: 'منسغة',
      unknown_origin: 'شبه طبيعي: مجهول الأصل',
      unknownOrigin: 'مجهول الأصل',
      native_species: 'مزروعة: أنواع أصلية',
      nativeSpecies: 'أنواع أصلية',
      introduced_species: 'مزروعة: أنواع مدخلة',
      introducedSpecies: 'أنواع مدخلة',
      forest: 'غابة- {{year}}',
    },

    // table 4.4a
    introducedTreeSpecies: {
      introducedTreeSpecies: 'مساحة الشجراء التي تحتوي على أنواع أشجار مدخلة بالدرجة الأولى',
      categoryYear: 'الفئة - العام',
      areaOfStandsDominatedByIntroducedTreeSpecies1000ha:
        'مساحة الشجراء التي تحتوي على أنواع أشجار مدخلة بالدرجة الأولى (1000 هـ)',
      total: 'الإجمالي',
      _of_which_invasive: '...منها: غازية',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 4.4b
    introducedTreeSpecies4_4b: {
      introducedTreeSpecies4_4b: 'أنواع أشجار مدخلة',
      category: 'Category',
      scientificNameOfIntroducedTreeSpecies: 'الاسم العلمي للنوع المدخل',
      forestAreaOccupied1000Ha: 'مساحة الغابة المشغولة (1000 هـ)',
      _01: 'نوع الشجرة المدخلة 1',
      _02: 'نوع الشجرة المدخلة 2',
      _03: 'نوع الشجرة المدخلة 3',
      _04: 'نوع الشجرة المدخلة 4',
      _05: 'نوع الشجرة المدخلة 5',
      _06: 'نوع الشجرة المدخلة 6',
      _07: 'نوع الشجرة المدخلة 7',
      _08: 'نوع الشجرة المدخلة 8',
      _09: 'نوع الشجرة المدخلة 9',
      _10: 'نوع الشجرة المدخلة 10',
      _11: 'نوع الشجرة المدخلة 11',
      _12: 'نوع الشجرة المدخلة 12',
      _13: 'نوع الشجرة المدخلة 13',
      _14: 'نوع الشجرة المدخلة 14',
      _15: 'نوع الشجرة المدخلة 15 ',
      _16: 'نوع الشجرة المدخلة 16',
      _17: 'نوع الشجرة المدخلة 17',
      _18: 'نوع الشجرة المدخلة 18 ',
      _19: 'نوع الشجرة المدخلة 19',
      _20: 'نوع الشجرة المدخلة 20',
      scientific_name_of_introduced_tree_species: 'الاسم العلمي للنوع المدخل',
      forest_area_occupied_2005: 'مساحة الغابة المشغولة (1000 هـ) – 2005',
      forest_area_occupied_2010: 'مساحة الغابة المشغولة (1000 هـ) - 2010',
      forest_area_occupied_2015: 'مساحة الغابة المشغولة (1000 هـ) - 2015',
    },

    // table 4.4c
    invasiveTreeSpecies: {
      invasiveTreeSpecies: 'أنواع الأشجار الغازية',
      category: 'الفئة',
      scientificNameOfInvasiveTreeSpecies: 'الاسم العلمي لأنواع الأشجار الغازية',
      forestAreaAffected1000Ha: 'مساحة الغابة المتضررة (1000 هـ)',
      _01: 'نوع الشجرة الغازية 1',
      _02: 'نوع الشجرة الغازية 2',
      _03: 'نوع الشجرة الغازية 3',
      _04: 'نوع الشجرة الغازية 4',
      _05: 'نوع الشجرة الغازية 5',
      _06: 'نوع الشجرة الغازية 6',
      _07: 'نوع الشجرة الغازية 7',
      _08: 'نوع الشجرة الغازية 8',
      _09: 'نوع الشجرة الغازية 9',
      _10: 'نوع الشجرة الغازية 10',
      _11: 'نوع الشجرة الغازية 11',
      _12: 'نوع الشجرة الغازية 12',
      _13: 'نوع الشجرة الغازية 13',
      _14: 'نوع الشجرة الغازية 14',
      _15: 'نوع الشجرة الغازية 15',
      _16: 'نوع الشجرة الغازية 16',
      _17: 'نوع الشجرة الغازية 17',
      _18: 'نوع الشجرة الغازية 18',
      _19: 'نوع الشجرة الغازية 19',
      _20: 'نوع الشجرة الغازية 20',
      scientific_name_of_invasive_tree_species: 'الاسم العلمي لأنواع الأشجار الغازية',
      forest_area_affected_2005: 'مساحة الغابة المتضررة (1000 هـ) – 2005',
      forest_area_affected_2010: 'مساحة الغابة المتضررة (1000 هـ) - 2010',
      forest_area_affected_2015: 'مساحة الغابة المتضررة (1000 هـ) - 2015',
    },

    // table 4.5
    deadwood: {
      deadwood: 'أخشاب ميتة',
      categoryYear: 'الفئة - العام',
      volumeOfDeadwoodM3Ha: 'حجم الأخشاب الميتة (م3/هـ)',
      total: 'الإجمالي',
      standing: 'واقفة',
      lying: 'مضجعة',
      forest: 'غابة - {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي الغابات والأراضي الحرجية الأخرى - {{year}}',
      volumeOfDeadwoodInFOWLBySpeciesGroups:
        'حجم الأخشاب الميتة في الغابات وفي الأراضي الحرجية الأخرى وفق مجموعات الأنواع',
      coniferous: 'صنوبريات - {{year}}',
      broadleaved: 'عريضة الأوراق - {{year}}',
    },

    // table 4.8
    threatenedForestSpecies: {
      threatenedForestSpecies: 'أنواع حرجية مهددة',
      categoryYear: 'الفئة - العام',
      threatenedForestSpeciesCol: 'أنواع حرجية مهددة',
      absoluteNumber: 'العدد المطلق',
      total_of_taxa: 'إجمالي الأصناف',
      vulnerable: 'سريعة التأثر',
      endangered: 'معرضة للانقراض',
      critically_endangered: 'معرضة للانقراض بمستوى حرج',
      extinct_in_the_wild: 'منقرضة في البرية',
      trees: 'أشجار - {{year}}',
      birds: 'طيور - {{year}}',
      mammals: 'ثدييات - {{year}}',
      other_vertebrates: 'فقاريات أخرى - {{year}}',
      invertebrates: 'لافقريات - {{year}}',
      vascular_plants: 'نباتات وعائية - {{year}}',
      cryptogams_and_fungi: 'نباتات لازهرية وفطور - {{year}}',
    },

    // table 4.9
    protectedForests: {
      protectedForests: 'غابات محمية',
      categoryYear: 'الفئة - العام',
      ha1000: '1000 ha',
      mcpfe_class_1_1: 'الفئة 1-1 للمؤتمر الوزاري لحماية الغابات في أوروبا',
      mcpfe_class_1_2: 'الفئة 1-2 للمؤتمر الوزاري لحماية الغابات في أوروبا',
      mcpfe_class_1_3: 'الفئة 1-3 للمؤتمر الوزاري لحماية الغابات في أوروبا',
      mcpfe_class_2: 'الفئة 2 للمؤتمر الوزاري لحماية الغابات في أوروبا',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 5.1
    protectiveForestsSoilWaterAndOtherEcosystemFunctions: {
      protectiveForestsSoilWaterAndOtherEcosystemFunctions:
        'غابات الحماية – التربة والمياه ووظائف أخرى للنظام الإيكولوجي؛ بنى تحتية وموارد طبيعية خاضعة للإدارة',
      categoryYear: 'الفئة - العام',
      protectiveForestsMCPFEClass31000ha: 'غابات الحماية – الفئة 3 للمؤتمر الوزاري لحماية الغابات في أوروبا (1000 هـ)',
      soil_water_and_other_forest_ecosystem_functions: 'Soil, water and other forest ecosystem functions',
      infrastructure_and_managed_natural_resources: 'Infrastructure and managed natural resources',
      total: 'الإجمالي',
      forest: 'غابة- {{year}}',
      other_wooded_land: 'أرض حرجية أخرى - {{year}}',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 6.1
    forestHoldings: {
      forestHoldings: 'حيازات حرجية',
      categoryYear: 'الفئة - العام',
      areaAndNumberOfForestHoldingsInSizeClasses: 'المساحة وعدد الحيازات الحرجية وفق فئات المساحة',
      less10ha: 'أصغر أو تساوي 10 هـ',
      _11_500ha: 'من 11 - 500 هـ',
      more500ha: 'أكبر من 500 هـ',
      total_forest_area: 'إجمالي مساحة الغابة (1000 هـ)',
      total_number_of_holdings: 'إجمالي عدد الحيازات',
      less_10_ha_area: 'المساحة أصغر أو تساوي 10 هكتار (1000 هـ)',
      less_10_ha_number: 'أصغر أو تساوي 10 هـ: عدد الحيازات',
      _11_500_ha_area: '11-500 هـ: المساحة (1000 هـ)',
      _11_500_ha_number: 'من 11 – 500: عدد الحيازات ',
      more_500_ha_area: 'أكبر من 500 هـ: المساحة (1000 هـ)',
      more_500_ha_number: 'أكبر من 500 هـ: عدد الحيازات',
      area1000Ha: 'المساحة (1000 هـ)',
      numberOfHoldings: 'عدد الحيازات',
      in_public_ownership: 'ملكية عامة - {{year}}',
      in_private_ownership: 'ملكية خاصة - {{year}}',
      other_types_of_ownership_unknown: 'أنواع ملكية أخرى/مجهولة - {{year}}',
    },

    // table 6.2
    grossValueAdded: {
      grossValueAdded: 'إجمالي القيمة المضافة',
      categoryYear: 'الفئة - العام',
      grossValueAddedCol: 'إجمالي القيمة المضافة',
      million_national_currency: 'مليون بالعملة الوطنية',
      percent_of_total_gva: '% من إجمالي القيمة المضافة',
      forestry: 'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood:
        'تصنيع الأخشاب والقطع الخشبية (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 16) - {{year}}',
      manufacture_of_paper_and_paper_products:
        'تصنيع الأوراق والمنتجات الورقية (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 17) - {{year}}',
    },

    // table 6.3
    factorIncomeAndEntrepreneurialIncome: {
      factorIncomeAndEntrepreneurialIncome: 'الدخل المتدفق من عوامل مختلفة والدخل المتدفق من الأعمال التجارية',
      categoryYear: 'الفئة - العام',
      millionNationalCurrency: 'مليون بالعملة الوطنية',
      factor_income: 'الدخل المتدفق من عوامل مختلفة',
      net_operating_surplus: 'صافي الفائض التشغيلي',
      forestry: 'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
    },

    // table 6.4a
    totalGrossFixedCapitalFormationInForestsAndForestry: {
      totalGrossFixedCapitalFormationInForestsAndForestry: 'صافي إجمالي تشكيلة رأس المال الثابت في الغابات والحراجة',
      categoryYear: 'الفئة - العام',
      grossFixedCapitalFormationMillionNationalCurrency:
        'صافي إجمالي تشكيلة رأس المال الثابت في الغابات والحراجة (مليون بالعملة الوطنية)',
      plantingOfTreesToProvideRegularIncome: 'زراعة الأشجار لتوفير دخل منتظم',
      equipmentAndBuildings: 'تجهيزات ومباني',
      otherGrossFixedCapitalFormation: 'تشكيلة أخرى لإجمالي رأس المال الثابت',
      total: 'الإجمالي',
      forestry_isic_nace_02:
        'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
      planting_of_trees_to_provide_regular_income: 'زراعة الأشجار لتوفير دخل منتظم',
      equipment_and_buildings: 'تجهيزات ومباني',
      other_gross_fixed_capital_formation: 'تشكيلة أخرى لإجمالي رأس المال الثابت',
    },

    // table 6.4b
    totalFixedCapitalConsumptionInForestsAndForestry: {
      totalFixedCapitalConsumptionInForestsAndForestry: 'إجمالي استهلاك رأس المال الثابت في الغابات والحراجة',
      categoryYear: 'الفئة - العام',
      fixedCapitalConsumptionMillionNationalCurrency: 'استهلاك رأس المال الثابت (مليون بالعملة الوطنية)',
      fixed_capital_consumption: 'استهلاك رأس المال الثابت',
      forestry_isic_nace_02:
        'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
    },

    // table 6.4c
    totalCapitalTransfersInForestsAndForestry: {
      totalCapitalTransfersInForestsAndForestry: 'إجمالي عمليات تحويل رأس المال في الغابات والحراجة',
      categoryYear: 'الفئة - العام',
      capitalTransfersMillionNationalCurrency: 'عمليات تحويل رأس المال (مليون بالعملة الوطنية)',
      capital_transfers: 'عمليات تحويل رأس المال',
      forestry_isic_nace_02:
        'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
    },

    // table 6.5a
    employmentByGenderAndAge: {
      employmentByGenderAndAge: 'التوظيف بحسب الجنس والعمر',
      categoryYear: 'الفئة - العام',
      total: 'الإجمالي',
      gender: 'الجنس',
      ageGroup: 'مجموعة الأعمار',
      male: 'ذكر',
      female: 'أنثى',
      _15_49: 'من 15-49',
      _50_: 'من 50 فما فوق',
      _1000Persons: '1000 شخص',
      forestry: 'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood:
        'تصنيع الأخشاب والقطع الخشبية (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 16) - {{year}}',
      manufacture_of_paper_and_paper_products:
        'تصنيع الأوراق والمنتجات الورقية (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 17) - {{year}}',
      gender_male: 'الجنس: ذكر',
      gender_female: 'الجنس: أنثى',
      age_group_15_49: 'مجموعة الأعمار: من 15 -49',
      age_group_50_plus: 'مجموعة الأعمار: من 50 فما فوق',
    },

    // table 6.5b
    employmentByEducationAndJobCharacteristics: {
      employmentByEducationAndJobCharacteristics: 'التوظيف بحسب المستوى التعليمي ومواصفات العمل',
      categoryYear: 'الفئة - العام',
      education: 'المستوى التعليمي (فئات التصنيف الدولي الموحد للتعليم 1997) ',
      jobCharacteristics: 'متطلبات العمل',
      _0_2: '0-2',
      _3_4: '3-4',
      _5_6: '5-6',
      _1000Persons: '1000 شخص',
      education_0_2: 'المستوى التعليمي (فئات التصنيف الدولي الموحد للتعليم 1997): 0-2',
      education_3_4: 'المستوى التعليمي (فئات التصنيف الدولي الموحد للتعليم 1997): 3-4',
      education_5_6: 'المستوى التعليمي (فئات التصنيف الدولي الموحد للتعليم 1997): 5-6',
      employees: 'مواصفات العمل: موظفون',
      employeesJobCharacteristics: 'موظفون',
      self_employed: 'مواصفات العمل: عمل حر',
      selfEmployed: 'عمل حر',
      forestry: 'Forestry (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: 'Manufacture of wood and articles in wood (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Manufacture of paper and paper products (ISIC/NACE 17) - {{year}}',
    },

    // table 6.6
    occupationalAccidents: {
      occupationalAccidents: 'حوادث مهنية',
      categoryYear: 'الفئة - العام',
      fatalOccupationalAccidents: 'حوادث مهنية قاتلة',
      nonFatalOccupationalAccidents: 'حوادث مهنية غير قاتلة',
      number: 'العدد',
      annualRatePer1000Workers: 'المعدل السنوي لكل 1000 عامل',
      fatal_occupational_accidents_number: 'الحوادث المهنية القاتلة: العدد',
      fatal_occupational_accidents_per_1000_workers: 'الحوادث المهنية القاتلة: المعدل السنوي لكل 1000 عامل',
      non_fatal_occupational_accidents_number: 'الحوادث المهنية غير القاتلة: العدد',
      non_fatal_occupational_accidents_per_1000_workers: 'الحوادث المهنية غير القاتلة: المعدل السنوي لكل 1000 عامل',
      forestry_isic_nace_02:
        'الحراجة (التصنيف الدولي الصناعي الموحد/التصنيف الصناعي العام للأنشطة الاقتصادية 02) - {{year}}',
    },

    // table 6.7
    woodConsumption: {
      woodConsumption: 'استهلاك الأخشاب',
      category: 'الفئة',
      woodConsumption1000M3RWE: 'استهلاك الأخشاب (مكافئ 1000 م3 أخشاب مستديرة)',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      wood_consumption: 'استهلاك منتجات حرجية',
    },

    // table 6.8
    tradeInWood: {
      tradeInWood: 'تجارة الأخشاب',
      category: 'الفئة',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      exports_of_forest_products_quantity: 'صادرات منتجات حرجية (مليون م3 مكافئ الأخشاب المستديرة)',
      exports_of_forest_products_value: 'صادرات منتجات حرجية (مليون يورو/وحدة نقد أوروبية)',
      imports_of_forest_products_quantity: 'واردات منتجات حرجية (مليون م3 مكافئ أشجار مستديرة)',
      imports_of_forest_products_value: 'واردات منتجات حرجية (مليون يورو/وحدة نقد أوروبية)',
    },

    // table 6.9
    totalEnergySupplyFromWood: {
      totalEnergySupplyFromWood: 'إجمالي الإمداد بالطاقة المستمدة من الخشب',
      category: 'الفئة',
      tj: 'تيراجول',
      _1000_metric_tonnes_dry_matter: '1000 طن متري مادة جافة',
      total_primary_energy_supply: 'إجمالي الإمداد بالطاقة الأولية',
      total_renewable_energy_supply: 'إجمالي الإمداد بالطاقة المتجددة',
      total_energy_supply_from_wood: 'إجمالي الإمداد بالطاقة المستمدة من الخشب:',
      energy_from_direct_wood_fibre_sources: '- طاقة مستمدة من مصادر ألياف خشبية مباشرة:',
      of_which_from_forests: 'منها مستمد من الغابات',
      of_which_from_other_wooded_land: 'منها مستمد من أراض حرجية وأراض أخرى (أشجار خارج الغابات)',
      energy_from_co_products: '- طاقة مستمدة من منتجات ثانوية ومخلفات تصنيع الأخشاب:',
      of_which_solid_residues:
        'منها مخلفات صلبة (مثل الرقائق والجزيئات وبقايا الخشب واللحاء ما عدا الوقود الخشبي المعالج)',
      energy_from_processed_wood_based_fuels: '- طاقة مستمدة من الوقود الخشبي المعالج (حبيبات وقويلبات وفحم نباتي):',
      of_which_imported: 'منها مستورد',
      energy_from_post_consumer_recovered_wood: '- طاقة مستمدة من خشب مسترد بعد الاستهلاك',
      energy_from_unknown_unspecified_sources: '- طاقة مستمدة من مصادر مجهولة/غير محددة',
      tj_2007: '2007: تيراجول',
      tj_2009: '2009: تيراجول',
      tj_2011: '2011: تيراجول',
      tj_2013: '2013: تيراجول',
      tj_2015: '2015: تيراجول',
      _1000_metric_tonnes_dry_matter_2007: '2007: 1000 طن متري مادة جافة',
      _1000_metric_tonnes_dry_matter_2009: '2009: 1000 طن متري مادة جافة',
      _1000_metric_tonnes_dry_matter_2011: '2011: 1000 طن متري مادة جافة',
      _1000_metric_tonnes_dry_matter_2013: '2013: 1000 طن متري مادة جافة',
      _1000_metric_tonnes_dry_matter_2015: '2015: 1000 طن متري مادة جافة',
    },

    // table 6.10a
    accessibilityForRecreation: {
      accessibilityForRecreation: 'إمكانية الوصول إليها للترفيه',
      categoryYear: 'الفئة - العام',
      areaAvailableForPublicRecreation: 'المساحة المتوافرة لترفيه العموم',
      total1000Ha: 'الإجمالي (1000 هـ)',
      _oftotal: '%من الإجمالي ',
      areaPrimarilyDesignatedOrManagedForPublicRecreation:
        'مساحة مخصصة بالدرجة الأولى لترفيه العموم أو تدار لهذا الغرض',
      area_available_for_public_recreation_total: 'المساحة المتوافرة لترفيه العموم: إجمالي (1000 هـ)',
      area_available_for_public_recreation_percent: 'المساحة المتوافرة لترفيه العموم: % من المساحة الإجمالية',
      area_designated_or_managed_for_public_recreation_total:
        'مساحة مخصصة بالدرجة الأولى لترفيه العموم أو تدار لهذا الغرض: إجمالي (1000 هـ)',
      area_designated_or_managed_for_public_recreation_percent:
        'مساحة مخصصة بالدرجة الأولى لترفيه العموم أو تدار لهذا الغرض: % من المساحة الإجمالية',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابة والأرض الحرجية الأخرى - {{year}}',
    },

    // table 6.10b
    intensityOfUse: {
      intensityOfUse: 'حجم الاستخدام',
      categoryYear: 'الفئة - العام',
      annualNumberOfVisitsMillion: 'عدد الزيارات السنوية (مليون)',
      areaAvailableForPublicRecreation: 'المساحة المتوافرة لترفيه العموم',
      areaPrimarilyDesignatedAndOrManagedForPublicRecreation:
        'مساحة مخصصة بالدرجة الأولى لترفيه العموم أو تدار لهذا الغرض',
      total_forest_and_other_wooded_land: 'إجمالي مساحة الغابات والأراضي الحرجية الأخرى- {{year}}',
      area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم',
      area_designated_and_or_managed_for_public_recreation:
        'مساحة مخصصة بالدرجة الأولى لترفيه العموم أو تدار لهذا الغرضم',
    },

    // table 6.10c
    recreationFacilities: {
      recreationFacilities: 'مرافق ترفيه',
      categoryYear: 'الفئة - العام',
      forestRoadsAndPathsAvailableForPublicRecreation: 'طرقات ودروب حرجية متوافرة لترفيه العموم',
      _ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc:
        '... منها مخصص لرياضة المشي وركوب الدراجات والتزلج الريفي، إلخ',
      facilityLengthIn1000Km: 'المرفق (الطول في 1000 كم)',
      area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم - {{year}}',
      forest_roads_and_paths_available_for_public_recreation: 'طرقات ودروب حرجية متوافرة لترفيه العموم',
      _of_which_designated_for_hiking_biking_cross_country_skiing_etc:
        '...منها مخصص لرياضة المشي وركوب الدراجات والتزلج الريفي، إلخ',
    },

    // table 6.10d
    otherRecreationFacilitiesPilotReporting2015: {
      otherRecreationFacilitiesPilotReporting2015: 'مرافق ترفيه أخرى – إعداد تقارير نموذجية (2015)',
      category: 'الفئة',
      facility: 'المرفق',
      measurement_unit: 'وحدة القياس',
      extent_multiplicity: 'النطاق/ البلدية',
      facility_category: 'فئة المرفق',
      no1_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 1',
      no2_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 2',
      no3_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 3',
      no4_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 4',
      no5_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 5',
      no6_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 6',
      no7_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 7',
      no8_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 8',
      no9_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 9',
      no10_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 10',
      no11_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 11',
      no12_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 12',
      no13_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 13',
      no14_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 14',
      no15_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 15',
      no16_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 16',
      no17_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 17',
      no18_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 18',
      no19_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 19',
      no20_area_available_for_public_recreation: 'المساحة المتوافرة لترفيه العموم 20',
    },
  },
}
