const area = require('./zh/area')
const common = require('./zh/common')
const contentCheck = require('./zh/contentCheck')
const dataDownload = require('./zh/dataDownload')
const fra = require('./zh/fra')
const statisticalFactsheets = require('./zh/statisticalFactsheets')
const login = require('./zh/login')
const uc = require('./zh/uc')
const print = require('./zh/print')
const dataSource = require('./zh/dataSource')

module.exports.translation = {
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  fra,
  statisticalFactsheets,
  login,
  uc,
  print,

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
    ar: 'العربية',
    zh: '中文',
  },

  disclaimer: {
    statisticalFactsheets: '声明：可能包含粮农组织估计数值，可能有缺失的数值',
    part1: '本网站的制作得到了下述各方的协助：',
    europeanUnion: '欧洲联盟',
    part2: '、',
    govFinland: '芬兰政府',
    part3: '、',
    govNorway: '挪威政府',
    part4: '和',
    gef: '全球环境基金',
    part5: '。 网站内容由粮农组织全权负责，不代表欧洲联盟、芬兰政府、挪威政府和全球环境基金的观点。',
    termsOfUse: '统计数据库使用条款',
  },

  home: {
    keyFindings: `全球森林面积共计40.6亿公顷，占陆地总面积的31%。根据这一森林总面积计算得出的人均森林面积为0.52公顷。
	森林在各民族或地理区域间分布并不均匀，热带地区拥有的森林面积最大，占比45%，其次是寒带、温带和亚热带。`,
  },

  footer: {
    contactUs: '联系我们',
    termsAndConditions: '条款和条件',
    scamAlert: '防欺诈警告',
    reportMisconduct: '报告不当行为',
    userGuide: '使用指南',
    sendFeedback: '发送反馈',
    licenses: '许可',
    platformVersion: '平台版本',
  },

  unit: {
    haThousand: '1000 公顷',
    ha: '公顷',
    kmSq: '平方公里',
    mileSq: '平方英里',
    acre1000: '1000 英亩',
    acre: '英亩',
    haMillion: '百万公顷',
    haThousandPerYear: '1000 公顷/年',
    tonnesPerHa: '吨/公顷',
    cubicMeterPerHa: '立方米/公顷',
    millionTonnes: '百万公吨',
    millionsCubicMeterOverBark: '百万立方米（带皮）',
    thousandCubicMeterOverBark: '1000 立方米（带皮）',
    billionCubicMeter: '10亿立方米',
    thousandCubicMeter: '1000 立方米',
    thousandCubicMeterRWE: '1000 立方米原木当量',
    thousandPersons: '1000 人',
    gt: '10亿吨',
    fte1000: '1000 全职人力工时',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
    absoluteNumber: '绝对数',
    annualNumberOfVisitsMillion: '年访问量(百万)',
    millionNationalCurrency: '百万国家货币',
    facilityLengthIn1000Km: '设施 (单位：1000公里)',
    growingStockPercent: '森林总立木蓄积的百分比',
  },

  countrySelection: {
    selectCountry: '选择国家',
  },

  definition: {
    definitionLabel: '术语和定义',
    faqLabel: '常见问题',
  },

  audit: {
    notStarted: '未开始',
    edited: '已编辑',
  },

  yesNoTextSelect: {
    yes: '是',
    no: '否',
    notSelected: '',
  },

  user: {
    roles: {
      REVIEWER: '审核人',
      NATIONAL_CORRESPONDENT: '国家通讯员',
      ALTERNATE_NATIONAL_CORRESPONDENT: '候补国家通讯员',
      COLLABORATOR: '合作者',
      ADMINISTRATOR: '管理员',
      noRole: '不适用',
      // unused?
      VIEWER: '观察者',
      reviewer_plural: '审查者',
      nationalCorrespondent_plural: '国家通讯员',
      alternateNationalCorrespondent_plural: '候补国家通讯员',
      collaborator_plural: '合作者',
    },

    resetPasswordEmail: {
      subject: 'FRA平台 - 重置密码',
      textMessage: `尊敬的 {{user}}

我们收到了一个重置您FRA账户密码的请求。
如果您没有提出这一要求，请忽略这封邮件。


请点击以下链接重置您的密码
{{- link}}


谢谢！,
FRA工作组 fra@fao.org
{{- url}}`,
      htmlMessage: `尊敬的 {{user}}
<br/><br/>
我们收到了一个重置您FRA账户密码的请求。 
<br/>
如果您没有提出这一要求，请忽略这封邮件。
<br/><br/><br/>
<a href="{{link}}" style="text-decoration: none; background-color: #0098a6;border: 2px solid #00988F;color: white;font-size: 14px;font-weight: 700;    padding: 10px 50px;">点击此处重设密码</a>
<br/><br/><br/>
谢谢！
<br/>
FRA工作组 fra@fao.org
<br/>
{{- url}}
      `,
    },
  },

  fraClass: {
    forest: '森林',
    otherWoodedLand: '其他林地',
    otherLand: '其他土地',
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: '天然再生林',
    plantationForest: '种植林',
    ofWhichIntroduced: '引入外来树种的种植林',
    otherPlantedForest: '其他人工林',
    totalForest: '森林总面积',
  },

  fraOtherLandClass: {
    palms: '棕榈类 (油棕、椰树、枣椰等)…',
    treeOrchards: '果树 (包括水果、坚果、橄榄等)',
    agroforestry: '农林间作…',
    treesUrbanSettings: '城市树木…',
  },

  landing: {
    home: '主页',
    sections: {
      overview: '概览',
      messageBoard: '留言板',
      about: '关于FRA',
      recentActivity: '近期活动',
      userManagement: '合作管理',
      externalData: '外部数据',
      links: '链接和存储库',
      contentCheck: '内容/检查',
      versioning: '版本更新',
    },
    overview: {
      loadingMap: '加载网站地图…',
      withFinancialSupportOf: '赞助方为 ',
    },
    milestones: {
      milestones: '里程碑',
      milestone1: '国家通讯员全球会议',
      milestone2: '区域和分区域研讨会',
      milestone3: '提交国家报告截止日期',
      milestone4: '审核国家报告最终稿',
      milestone5: 'FRA 2020初步发现',
      milestone6: 'FRA 2020主报告',
      milestone7: '数据分析和报告起草',
      milestone8: '启动分析和宣传平台',
      date1: '3月',
      date2: '4–9月',
      date3: '10月',
      date4: '1–2月',
      date5: '3月',
      date6: '7月',
      date7: '3-12月',
      date8: '8月',
    },
    users: {
      users: '联系方式',
      message: '留言',
    },
    about: {
      contact: '联系人',
      seniorForestryOfficer: '高级林业官员',
      faoForestryDepartment: '粮农组织林业部',
      email: '电子邮箱',
      fraProcess:
        '自1946年以来，粮农组织每隔5至10年对世界森林进行一次评估。全球森林资源评估（FRA）报告现在每五年编制一次，目的是提供一种连贯一致的方法来描述世界森林及其变化情况。该评估基于两个主要数据来源：国家通讯员编写的国家报告，以及粮农组织与国家联络点和区域伙伴一起进行的遥感监测。自1948年发表第一份评估报告以来，FRA报告的范围经常发生变化。这些评估构成了全球森林资源利益方面的一段有趣历史，不仅具备实质性的内容，而且涵盖的范围不断变化。',
      linkFraProcess: '了解FRA进程的更多信息',
      or: '或',
      selectArea: '选择下述某一领域，获取FRA数据',
    },
    recentActivity: {
      noRecentActivityTitle: '似乎没有近期活动',
      noRecentActivityBody: '平台上所做的更改将在此处显示，以便您快速了解您离开时所发生的事情。',
      getStarted: '开始',
      actions: {
        added: '已添加',
        addedFile: '已添加 {{file}}',
        commented: '已评论',
        deleted: '已删除',
        deletedFile: '已删除 {{file}}',
        edited: '已编辑',
        resolved: '已解决的问题为',
        status: '更改状态为',
        addUser: '已添加 {{user}} 为 {{role}}',
        updateUser: '已编辑 {{user}}',
        removeUser: '已移除 {{user}}',
        acceptInvitation: '以 {{role}}加入',
        addInvitation: '邀请 {{user}} 成为 {{role}}',
        removeInvitation: '删除有关请 {{user}} 成为 {{role}}的邀请',
        updateInvitation: '更新关于请{{user}} 成为{{role}}的邀请',
        updateAssessmentStatus: '将{{assessment}} 的状态变更为 {{status}}',
      },
      fraProcess:
        '自1946年以来，粮农组织每隔5至10年对世界森林进行一次监测。全球森林资源评估（FRA）报告现在每五年编制一次，目的是提供一种连贯一致的方法来描述世界森林及其变化情况。该评估基于两个主要数据来源：国家通讯员编写的国家报告，以及粮农组织与国家联络点和区域伙伴一起进行的遥感监测。自1948年发表第一份评估报告以来，FRA报告的范围经常发生变化。这些评估构成了全球森林资源利益方面的一段有趣历史，不仅具备实质性的内容，而且涵盖的范围不断变化。',
      linkFraProcess: '了解有关FRA进程的更多信息',
    },
    links: {
      links: '链接',
      unfcccFocalPoints: '《气候变化框架公约》联络点（人）',
      sdgFocalPoints: '国家可持续发展目标联络点（人）',
      reddPortal: '卫星地面监测系统 (SLMS)，由UN-REDD/FAO授权',
      fraGeoSpatialTools: 'FRA地理空间工具',
      repository: '资源库',
      uploadFile: '上传文件',
      confirmDelete: '删除 {{file}}? 此操作无法撤销。',
      fileUploaded: '文件成功上传',
      fileDeleted: '文件成功删除',
    },
    dataExport: {
      downloadData: '下载数据',
    },
    versioning: {
      status: {
        pending: '等待中',
        running: '正在运行',
        completed: '已完成',
        failed: '失败',
      },
      form: {
        newVersion: '新版本',
        versionNumber: '版本',
        date: '日期',
        cancel: '取消',
        error: '表格内有错误。请修改后再次提交。',
      },
      table: {
        noVersions: '尚无版本',
        databaseVersions: '数据库版本',
        versionNumber: '版本编号',
        publishedAt: '预定时间',
        createdBy: '创建人为',
        status: '状态',
        delete: '删除',
        scheduledAt: '预定于',
      },
    },
  },
  userChat: {
    chatHeader: '与 {{user}}的消息',
    noMessages: '无消息',
    writeMessage: '写消息…',
    send: '发送',
    cancel: '取消',
    notificationEmail: {
      subject: '{{sender}} 发送了一条有关{{country}}的消息给您',
      textMessage: `尊敬的 {{recipient}},

{{sender}} 发送了一条有关 {{country}}的消息给您。

请通过下述URL登陆平台查看和回复消息:
{{- link}}

FRA工作组
{{- url}}
    `,
      htmlMessage: `尊敬的 {{recipient}},
<br/><br/>
{{sender}} 发送了一条有关 {{country}}的消息给您。
<br/><br/>
<b><a href="{{- link}}">请登陆平台查看和回复消息。</a></b>
<br/><br/>
FRA工作组
<br/>
{{- url}}
    `,
    },
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: '错误: 用户 {{user}} 试图登陆 {{countryIso}} ，但未明确身份',
      countryUserNotReviewer: '错误: 用户 {{user}} 试图登陆 {{countryIso}} ，但其并非审核人',
      userNotAdministrator: '错误: 用户 {{user}} 试图登陆仅向管理员开放的资源',
      roleChangeNotAllowed: '错误: 用户 {{user}} 试图将另一名用户的身份设置为 {{role}}，但该用户没有这一操作权限',
      userAlreadyAddedToCountry: '错误: 用户 {{user}} 已被添加至国家 {{countryIso}}',
      invitationAlreadyUsed: '错误: 邀请函 {{invitationUuid}}已被使用，不得通过{{loginEmail}}加以劫持!',
      countryDoesNotMatch: '错误: 国家 {{countyryIso}} 不匹配',
      assessmentEditingNotAllowed: '错误: 用户{{user}}为 {{role}}身份，不得编辑状态为{{assessmentStatus}}的国家{{countryIso}}评估报告',
      assessmentCommentingNotAllowed: '错误: 用户{{user}}为 {{role}}身份，不得评论状态为{{assessmentStatus}}的国家{{countryIso}}评估报告',
    },
    assessment: {
      transitionNotAllowed: '错误: 身份为{{role}}的用户，不得将{{currentStatus}}变更为{{status}}',
      deskStudyNotAllowed: '错误: 仅管理员有权限变更书面审查状态',
    },
    review: {
      commentDeleteNotOwner: '错误: 用户{{user}}试图删除他人评论',
      commentEnterResolvedIssue: '错误: 用户{{user}}试图对已解决的问题发表评论',
    },
    ndp: {
      previousNdpNotFound: '无法找到{{year}}前的任何国家数据点',
    },
    userNotAdministrator: '错误：用户{{user}}试图访问仅对管理员开放的资源',
    userAlreadyAddedToCountry: '错误：用户{{user}}已被添加到国家{{countryIso}}',
  },
  // components

  countryListing: {
    annuallyUpdated: '每年更新',
    fra2020: '2020年森林资源评估（FRA 2020）',
  },

  navigation: {
    hideAll: '隐藏所有',
    showAll: '显示所有',
    support: {
      dontDelete: '系统信息，请勿移除',
      feedbackEmailSubject: 'FRA平台反馈',
      platformVersion: '平台版本',
      userAgent: '用户代理',
      user: '用户',
      manageCollaborators: '管理合作者',
    },
    sectionHeaders: {
      introduction: '引言',
      forestExtentCharacteristicsAndChanges: '森林面积、特征和变化',
      forestGrowingStockBiomassAndCarbon: '森林立木蓄积量、生物量和碳储量',
      forestDesignationAndManagement: '森林的指定用途和管理',
      forestOwnershipAndManagementRights: '森林所有权和管理权',
      forestDisturbances: '森林遭到的干扰',
      forestPolicyAndLegislation: '森林政策和法律',
      employmentEducationAndNwfp: '就业、教育和非木质林产品',
      sustainableDevelopment: '可持续发展目标15',
      panEuropeanIndicators: '泛欧洲指标',
    },
    submit: '提交',
    cancel: '取消',
    changeStatusTextPlaceholder: '添加可选消息',
    doNotNotifyUsers: '不通知用户',
  },

  header: {
    editProfile: '编辑简介',
    logout: '退出',
    hideSidebar: '隐藏边栏',
    showSidebar: '显示边栏',
    autoSave: {
      saving: '正在保存…',
      complete: '所有变更已保存',
      lastSaveTimestampReceived: '最后编辑',
    },
  },

  time: {
    hour: '{{count}} 小时前',
    day: '{{count}} 天前',
    week: '{{count}} 星期前',
    aMomentAgo: '刚才',
    hour_plural: '{{count}}小时前',
    day_plural: '{{count}}天以前',
    week_plural: '{{count}}周前',
  },

  review: {
    comments: '评论',
    noComments: '无评论',
    resolve: '解决',
    confirmDelete: '确定要删除此条评论吗？此操作不可撤销。',
    commentDeleted: '评论删除',
    commentMarkedAsResolved: '标注为”已解决”',
    delete: '删除',
    writeComment: '写评论…',
    commentingClosed: '评论关闭',
    add: '添加',
    cancel: '取消',
    loading: '正在加载',
  },

  description: {
    edit: '编辑',
    done: '已完成',
    loading: '正在加载内容…',
    description: '描述',
    dataSourcesTitle: '数据来源、原始数据和国家分类与定义',
    generalCommentsTitle: '评论',
    dataSources: '数据来源',
    dataSourcesPlus: '数据来源 + 数据来源类型，如国家森林资源清查（NFI）, 等等',
    originalData: '原始数据',
    nationalClassificationAndDefinitions: '国家分类和定义',
    nationalData: '国家数据',
    analysisAndProcessing: '国家数据分析和处理',
    estimationAndForecasting: '估算和预测',
    reclassification: '按照FRA {{cycleName}} 类别进行重新分类',
  },

  nationalDataPoint: {
    clickOnNDP: '点击年份获取原始数据',
    nationalDataPoint: '国家数据点',
    addNationalDataPoint: '添加国家数据点',
    noNationalDataAdded: '未添加国家数据',
    nationalData: '国家数据',
    reclassificationLabel: '原始数据和重新分类',
    forestCategoriesLabel: '森林、其他林地和其他土地',
    referenceYearData: '数据参考年份',
    referenceYear: '参考年份',
    references: '参考',
    selectYear: '选择…',
    methods: '方法',
    methodsUsed: '已使用的方法',
    dataSource: '数据来源',
    dataSources: '数据来源',
    additionalComments: '额外评论',
    edit: '编辑',
    copyPreviousValues: '复制先前的参考文献',
    nationalClass: '国家界定的类别',
    nationalClasses: '分类和定义',
    definition: '定义',
    class: '类别',
    fraClasses: 'FRA界定的类别',
    area: '面积(1000公顷)',
    total: '总计',
    delete: '删除',
    modifiedExplanation: '修正后的国家数据点',
    confirmDelete: '确定删除这一数据点吗？此操作不可撤销。',
    discardChanges: '放弃修改',
    doneEditing: '编辑完成',
    enterOrCopyPasteNationalClasses: '输入或复制与粘贴国家界定的类别',
    forestCharacteristics: '森林特征',
    otherLandCharacteristics: '有树木覆盖的其他土地',
    plantationForest: '种植林',
    remindDirtyOdp: '国家数据点已经更新，请记得重新生成数值',
    disabled: '第1b项的禁用、启用',
    dataSourceMethodsOptions: {
      nationalForestInventory: '国家森林资源清查',
      sampleBasedRemoteSensingAssessment: '基于采样的遥感评估',
      fullCoverMaps: '全幅森林/植被图',
      registersQuestionnaires: '登记/调查表',
      other: '其他 (在评论中注明)',
    },
    appliesToVariablesOptions: {
      forest: '森林',
      otherWoodedLand: '其他林地',
      otherLand: '其他土地',
    },
    forestCategoriesLabel2025: '森林、其他林地和其它土地',
    nationalClassifications: '国家级分类',
    categories: '类别',
  },

  userManagement: {
    manageCollaborators: '管理合作者',
    name: '姓名',
    role: '身份',
    email: '电子邮箱',
    loginEmail: '登陆',
    noUsers: '未添加合作者',
    placeholder: '选择…',
    remove: '移除',
    done: '完成',
    edit: '编辑',
    addUser: '添加合作者',
    formErrors: '表格内有错误。请修改后再次提交。',
    insufficientPrivileges: '权限不足',
    confirmDelete: '移除 {{user}}?',
    allUsers: '所有合作者',
    info: '信息',
    tableAccess: '表格访问',
    invitationLink: '邀请链接',
    sendInvitation: '发送邀请邮件',
    invitationEmail: {
      subject: 'FRA平台邀请',
      textMessage: `尊敬的 {{invitedUser}},

您被邀请以{{country}}{{role}} 的身份访问FRA平台。

请点击下述链接接受邀请和访问FRA平台：
{{- link}}

欢迎来访！

FRA工作组 fra@fao.org
{{- url}}
    `,
      htmlMessage: `尊敬的 {{invitedUser}},
<br/><br/>
您被邀请以{{country}}{{role}} 的身份访问FRA平台。.
<br/><br/>
<b><a href="{{- link}}">接受邀请并访问平台</a></b>
<br/><br/>
欢迎来访！
<br/><br/>
FRA工作组 fra@fao.org
<br/>
{{- url}}
    `,
    },
    editPermissions: '编辑权限',
    invitationDeleted: '邀请已被删除',
    invitationEmailSent: '已发送邀请邮件',
    permissions: '权限',
    personalInfoRequired: '请在继续之前完成您的个人信息',
    userAdded: '{{email}}已被添加',
    userModified: '用户{{user}}已被修改',
    permissionNames: {
      tableData: '表格数据',
      descriptions: '描述',
    },
  },

  // FRA 2020 questionare
  // Object name and title should have always the same name

  contactPersons: {
    reportPreparationAndContactPersons: '报告编写者和联系方式',
    contactPersons: '简介',
    contactPersonsSupport: '本报告由下述人员编写：',
    introductoryText: '介绍性文字',
    introductoryTextSupport: '简述本报告的内容',
    firstName: '名',
    lastName: '姓',
    institution: '机构/地址',
    email: '电子邮箱',
    tables: '表格',
    all: '所有',
    none: '无',
  },

  extentOfForest: {
    extentOfForest: '森林及其他林地的面积',
    estimationAndForecasting: '估算和预测',
    categoryHeader: 'FRA类别',
    forestArea: '森林',
    chart: {
      placeholderLine1: '请先添加新的国家数据点，然后使用',
      placeholderLine2: '其自动生成FRA数值。',
    },
    otherLandCategories: '其他土地类别',
    ofWhichPalms: '棕榈类 (油棕、椰树、枣椰等)…',
    ofWhichTreeOrchards: '果树类(包括水果、坚果、橄榄等)…',
    ofWhichAgroforestry: '农林间作…',
    ofWhichTreesUrbanSettings: '城市树木…',
    totalLandArea: '土地面积总和',
    fedAreasExceedTotalLandArea: '森林和其他林地面积超过土地面积总和',
    forestAreaDoesNotMatchPreviouslyReported: '森林面积与FRA {{year}}中报告的面积不匹配: {{previous}}',
    useOriginalDataPoints: '使用国家数据点',
    dontUseOriginalDataPoints: '不使用国家数据点',
    whatIsThis: '这是什么？',
    tableNoticeMessage: '所有参考年份均使用FAOSTAT中的2015年土地面积数据',
    ndpMissingValues: '国家数据点存在缺失值',
    showNDPs: '显示国家数据点',
    hideNDPs: '隐藏国家数据点',
    forestAreaNetChangeDoesNotMatch: '森林面积净变化与预期值不符：{{value}}',
  },

  climaticDomain: {
    climaticDomain: '气候区',
    percentOfForestArea2015: '占2015年森林面积的百分比',
    percentOfForestArea2015Override: '覆盖数值',
    selectDefault: '默认',
    boreal: '寒带',
    temperate: '温带',
    subtropical: '亚热带',
    tropical: '热带',
  },

  forestCharacteristics: {
    forestCharacteristics: '森林特征',
    estimationAndForecasting: '估算和预测',
    categoryHeader: 'FRA类别',
    naturalForestArea: '天然再生林',
    plantationForestArea: '种植林',
    plantationForestIntroducedArea: '引入外来树种的种植林',
    otherPlantedForestArea: '其他人工林',
    plantedForest: '人工林',
    totalForestArea: '森林总面积',
    total: '总计',
    useOriginalDataPoints: '使用国家数据点',
    dontUseOriginalDataPoints: '不使用国家数据点',
  },

  tableWithOdp: {
    confirmGenerateFraValues: '覆盖当前值？',
    generateFraValues: '生成数值',
    linearExtrapolation: '线性',
    repeatLastExtrapolation: '重复上一步',
    annualChangeExtrapolation: '年度变化',
    placeholderFuture: '未来',
    placeholderPast: '过去',
    copyToClipboard: '复制数值',
    placeholderSelect: '估算和预测',
    _1000haYear: '1000公顷/年',
    generatingFraValues: '生成中...',
  },

  forestAreaChange: {
    forestAreaChange: '年度森林扩张、砍伐和净变化',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积(1000公顷/年)',
    forestExpansion: '森林扩张',
    ofWhichAfforestation: '造林',
    ofWhichNaturalExpansion: '自然扩张',
    deforestation: '砍伐',
    forestAreaNetChange: '森林面积净变化',
    forestAreaNetChangeFrom1a: '表1a中森林面积净变化',
    netChangeDoesNotMatch: '与森林面积净变化不匹配',
  },

  annualReforestation: {
    annualReforestation: '年度造林',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积(1000 公顷/年)',
    reforestation: '造林',
  },

  specificForestCategories: {
    specificForestCategories: '原始林和特殊森林类别',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积 (1000公顷)',
    bamboo: '竹林',
    mangroves: '红树林',
    temporarilyUnstocked: '暂时无储量或近期恢复的',
    primaryForest: '原始林',
    exceedsNaturallyRegeneratingForest: '超过天然再生林(1b)',
    rubberWood: '橡胶种植林',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover: '有树木覆盖的其他土地',
    areaUnitLabel: '面积(1000公顷)',
    categoryHeader: 'FRA类别',
    palms: '棕榈类',
    treeorchards: '果树类',
    agroforestry: '农林间作',
    treesinurbansettings: '城市树木',
    total: '总计',
    otherLandArea: '其他土地面积',
    other: '其他 (在评论中注明)',
  },

  growingStock: {
    growingStock: '立木蓄积量',
    supportText: '在编辑本表格前，请先在表1a和表1b中输入数据',
    categoryHeader: 'FRA类别',
    avgTableHeader: '立木蓄积量[立方米/公顷(带皮)]',
    totalTableHeader: '立木总蓄积量[百万立方米（带皮）]',
    naturallyRegeneratingForest: '天然再生林',
    plantedForest: '人工林',
    plantationForest: '种植林',
    otherPlantedForest: '其他人工林',
    forest: '森林',
    otherWoodedLand: '其他林地',
    copyToClipboard: '复制数值',
  },

  growingStockComposition: {
    native: '本地',
    introduced: '引进',
    growingStockComposition: '立木蓄积量组成',
    categoryHeader: 'FRA类别',
    nativeTreeSpecies: '本地树种',
    introducedTreeSpecies: '引进树种',
    areaUnitLabel: '森林立木蓄积量[百万立方米（带皮）]',
    scientificName: '学名',
    commonName: '通用名',
    rank: '#{{idx}} 按数量排名',
    remainingNative: '其余的本地树种',
    remainingIntroduced: '其余的引入树种',
    totalNative: '本地树种总量',
    totalIntroduced: '引进树种总量',
    totalGrowingStock: '立木蓄积总量',
    rankingYear: '2015年排名',
  },

  biomassStock: {
    biomassStock: '生物量',
    categoryHeader: 'FRA类别',
    tableHeader: '森林生物量(吨/公顷)',
    aboveGround: '地上生物量',
    belowGround: '地下生物量',
    deadWood: '枯死木',
    downloadExcel: '下载excel计算器',
  },

  carbonStock: {
    carbonStock: '碳储量',
    categoryHeader: 'FRA类别',
    tableHeader: '森林碳储量(吨/公顷)',
    carbonAboveGroundBiomass: '地上生物质碳储量',
    carbonBelowGroundBiomass: '地下生物质碳储量',
    carbonDeadwood: '枯死木碳储量',
    carbonLitter: '林分枯落物碳储量',
    carbonSoil: '土壤碳储量',
    soilDepthHeading: '用于土壤碳储量估算的土壤深度（厘米）',
  },

  designatedManagementObjective: {
    designatedManagementObjective: '指定管理目标',
    primaryDesignatedManagementObjective: '主要指定管理目标',
    primaryDesignatedManagementObjectiveSupport:
      '主要指定管理目标比其他管理目标重要得多。各项主要指定管理目标之间具有“排他性”，在一个主要指定管理目标下报告的面积不应再报告给任何其他的主要指定管理目标。不同管理目标下所报告面积的总和应等于森林面积。',
    totalAreaWithDesignatedManagementObjective: '指定管理目标所涉面积总和',
    totalAreaWithDesignatedManagementObjectiveSupport:
      '指定管理目标，包括主要和非主要目标。不同的指定类别之间“无排他性”，因此，面积数据可在多个目标下重复报告，例如，作为主要管理目标“多用途”报告的森林面积应在每个管理目标下报告。因此，不同管理目标下报告的面积总和可以大于森林总面积。',
    categoryHeader: 'FRA 2020类别',
    areaUnitLabel: '森林面积(1000公顷)',
    production: '生产',
    soilWaterProtection: '水土保持',
    biodiversityConservation: '生物多样性养护',
    socialServices: '社会服务',
    multipleUse: '多重用途',
    other: '其他 (请在评论中注明)',
    unknown: '无/未知',
    totalForestArea: '森林总面积',
    total: '总和',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas: '保护区内森林面积和纳入长期管理计划的森林面积',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积(1000公顷)',
    header: '保护区内森林面积',
    forestAreaWithLongTermManagementPlan: '纳入长期森林管理计划的森林面积',
    ofWhichInProtectedAreas: '保护区内纳入长期森林管理计划的森林面积',
  },

  forestOwnership: {
    forestOwnership: '森林所有权',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '森林面积(1000公顷)',
    privateOwnership: '私有',
    ofWhichIndividuals: '个人拥有',
    ofWhichPrivateBusinesses: '私营实体和机构拥有',
    ofWhichCommunities: '本地、部落和土著社区拥有',
    publicOwnership: '公有',
    otherOrUnknown: '未知/其他 (在评论中注明)',
    totalForestArea: '森林总面积',
    total: '总和',
  },

  holderOfManagementRights: {
    holderOfManagementRights: '公有森林管理权',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '森林面积(1000公顷)',
    publicAdministration: '公共管理',
    individuals: '个人',
    privateBusinesses: '私营企业实体和机构',
    communities: '本地、部落和土著社区',
    other: '未知/其他(在评论中注明)',
    totalPublicOwnership: '公有合计',
    total: '总计',
    publicOwnershipDoesNotMatch: '与公有合计数不匹配',
  },

  disturbances: {
    disturbances: '森林干扰因素',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积(1000公顷)',
    insects: '虫害',
    diseases: '病害',
    severeWeatherEvents: '极端天气事件',
    other: '其他(在评论中注明)',
    totalForestArea: '森林总面积',
    total: '总计',
  },

  areaAffectedByFire: {
    areaAffectedByFire: '受火灾影响的区域',
    categoryHeader: 'FRA类别',
    areaUnitLabel: '面积(1000公顷)',
    totalLandAreaAffectedByFire: '受火灾影响的土地总面积',
    ofWhichForest: '受影响的森林面积为',
  },

  degradedForest: {
    degradedForest: '退化的森林',
    doesYourCountryMonitor: '贵国监测退化森林的面积吗？',
    ifYes: '如果 "是"',
    whatIsDefinition: '贵国是如何界定“退化的森林”的？',
    howMonitored: '描述监测进程和结果',
  },

  forestPolicy: {
    forestPolicy: '政策、法律和鼓励利益相关者参与森林政策制定的国家平台',
    categoryHeader: '是否存在',
    areaUnitLabel: '布尔值 (是/否)',
    national: '国家',
    subnational: '地方',
    policiesSFM: '支持可持续森林管理的政策',
    legislationsSFM: '支持可持续森林管理的法律法规',
    stakeholderParticipation: '鼓励或允许利益相关者参与森林政策制定的平台',
    existenceOfTraceabilitySystem: '木材产品追溯系统',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: '永久性森林资产面积',
    categoryHeader: 'FRA 2020中的类别',
    areaUnitLabel: '森林面积(1000公顷)',
    applicable: '适用与否?',
  },

  employment: {
    employment: '林业和伐木业的就业',
    average: '平均3年',
    categoryHeader: 'FRA 2020中的类别',
    unitHeader: '全职人力工时 (1000全职人力工时)',
    inForestry: '林业和伐木业的就业',
    ofWhichSilviculture: '从事造林及其他森林活动',
    ofWhichLogging: '从事伐木',
    ofWhichGathering: '从事收集非木质林产品活动',
    ofWhichSupport: '从事林业支持性服务',
    total: '总计',
    female: '女性',
    male: '男性',
  },

  graduationOfStudents: {
    graduationOfStudents: '森林相关专业毕业生',
    average: '平均3年',
    numberOfStudents: '毕业生人数',
    fra2020Categories: 'FRA 2020中的类别',
    doctoralDegree: '博士学位',
    mastersDegree: '硕士学位',
    bachelorsDegree: '本科学位',
    technicianCertificate: '技术证书/文凭',
    total: '总计',
    female: '女性',
    male: '男性',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: '非木材林产品采集和价值',
    nameOfProduct: '非木材林产品名称',
    keySpecies: '关键种类',
    quantity: '数量',
    unit: '单位',
    value: '价值 (1000当地货币)',
    category: '非木材林产品类别',
    plantProductsSelectHeading: '植物产品/原料',
    food: '1 食物',
    fodder: '2 饲料',
    rawMaterialForMedicine: '3 医药和芳香产品的原料',
    rawMaterialForColorants: '4 着色剂和染料的原料',
    rawMaterialForUtensils: '5 器皿、手工艺品和建筑的原材料',
    ornamentalPlants: '6 观赏植物',
    exudates: '7 渗出物',
    otherPlantProducts: '8 其他植物产品',
    animalProductsSelectHeading: '动物产品/原料',
    livingAnimals: '9 活体动物',
    hidesSkins: '10 兽皮和猎获物',
    wildHoney: '11 野生蜂蜜和蜂蜡',
    wildMeat: '12 野生肉类',
    animalRawMaterialForMedicine: '13 医药原料',
    animalRawMaterialForColorants: '14 着色剂原料',
    otherEdibleAnimalProducts: '15 其他可食用动物产品',
    otherNonEdibleAnimalProducts: '16 其他非可食用动物产品',
    allOtherPlantProducts: '所有其他植物产品',
    allOtherAnimalProducts: '所有其他动物产品',
    total: '总计',
    currency: '货币名称',
    notSelected: '',
  },

  sustainableDevelopment: {
    sustainableDevelopment: '可持续发展目标15',
    indicator: '指标',
    percent: '百分比',
    nameOfAgencyResponsible: '负责机构名称',
    sdgIndicator1: '可持续发展目标指标 15.1.1 森林面积占陆地总面积的比例',
    sdgIndicator2: '可持续发展目标指标15.2.1 实施可持续森林管理取得的进展',
    forestAreaProportionLandArea2015: '森林面积占陆地总面积的比例（陆地总面积以2015年数据为基准）',
    subIndicator: '细化指标 {{no}}',
    forestAreaAnnualNetChangeRate: '森林面积年度净变化率',
    aboveGroundBiomassStockForests: '森林地上生物量',
    percent2015ForestAreaBaseline: '百分比（森林面积以2015年数据为基准）',
    proportionForestAreaLegallyEstablishedProtectedAreas: '依法设立的保护区内森林面积占比',
    proportionForestAreaLongTermForestManagement: '纳入长期森林管理计划的森林面积占比',
    forestArea1000Ha: '森林面积(1000公顷)',
    forestAreaVerifiedForestManagement: '基于独立验证的森林管理认证计划下的森林面积',
  },

  panEuropeanIndicators: {
    panEuropeanIndicators: '泛欧可持续森林管理量化指标',
    uploadQuestionnaire: '上传问卷',
    chooseFile: '选择文件',
    downloadQuestionnaire: '下载文件',
    download: '下载',
    remove: '移除',
    noQuestionnaire: '未选择问卷',
    panEuropeanQualitativeIndicators: '泛欧可持续森林管理定性指标',
    accessReportingPage: '访问报告页',
  },

  assessment: {
    fra: 'FRA',
    panEuropean: '泛欧洲',
    deskStudy: '书面审查',
    statusChangeNotification: {
      subject: 'FRA平台上，{{country}}的状态变更为{{status}} ',
      textMessage: `尊敬的{{recipientName}},

{{changer}} 在FRA平台上将{{country}}{{assessment}}的状态变更为 "{{status}}" 。

{{message}}

平台访问地址: {{- serverUrl}}

FRA工作组
{{- serverUrl}}`,
      htmlMessage: `尊敬的{{recipientName}},
<br/><br/>
{{changer}}在FRA平台上将{{country}}{{assessment}}的状态变更为 "{{status}}" 。
<br/><br/>
{{message}}
<br/><br/>
<a href="{{- serverUrl}}"><b>平台访问地址</b></a>
<br/><br/>
FRA工作组
<br/>
{{- serverUrl}}`,
    },
    status: {
      changing: {
        label: '正在变更…',
      },
      editing: {
        label: '正在编辑',
        previous: '返回编辑',
      },
      review: {
        label: '正在审核',
        next: '提交审核',
        previous: '返回审核',
      },
      approval: {
        label: '等待批准',
        next: '提交批准',
        previous: '返回批准',
      },
      accepted: {
        label: '已接受',
        next: '接受',
        previous: '',
      },
      notStarted: {
        label: '未开始',
      },
    },
  },

  multiSelect: {
    placeholder: '选择…',
  },

  generalValidation: {
    subCategoryExceedsParent: '子类别超过母类别',
    forestAreaDoesNotMatchExtentOfForest: '与森林面积(1a)不匹配',
    forestAreaExceedsExtentOfForest: '超过森林面积(1a)',
    otherLandExceedsExtentOfForest: '超过其他土地面积(1a)',
    valueMustBePositive: '数值应大于0',
    emptyField: '此字段为空',
    mustBeEqualToTotalGrowingStock: '数值应等于立木总蓄积量(2a)',
    remainingLandExceedsExtentOfForest: '超出其他土地(1a)',
    valueMustBeYear: '数值应是有效年份',
    countryReportYearGreaterThanCurrentYear: '数值应大于或等于{{minValue}}',
    valueNotGreaterThan: '值应不大于{{maxValue}}',
    sumNotGreaterThan: '总和不应超过{{maxValue}}',
    valuesAreInconsistentWithNetChange: '数值与森林面积净变化不一致',
    valuesAreInconsistent1aOr1b: '数值与表1a或1b中报告的面积不一致',
    mustBeEqualToPrivateOwnership: '子类别之和应等于私有',
    mustBeEqualToForestExpansion: '子类别之和应等于森林扩张',
    mustBeEqualToPlantedForest: '子类别之和应等于人工林',
    mustBeEqualToForestArea: '自然再生林和人工林之和应等于总立木蓄积',
    mustBeLessThanPrivateOwnership: '子类别之和应小于私有',
    forestSumAreaExceedsExtentOfForest: '报告的FRA类别之和超过了表1a中报告的森林面积',
    valueEqualToSum: '总值应等于子类别之和',
  },

  emoji: {
    picker: {
      search: '搜索',
      categories: {
        search: '搜索结果',
        recent: '经常使用',
        people: '笑脸符&人',
        nature: '动物&自然',
        foods: '食物&饮料',
        activity: '活动',
        places: '出行&地点',
        objects: '对象',
        symbols: '符号',
        flags: '标记',
      },
    },
  },

  editUser: {
    chooseProfilePicture: '选择图片',
    name: '姓名',
    role: '身份',
    email: '电子邮箱',
    loginEmail: '登陆',
    institution: '机构',
    position: '职位',
    done: '保存',
    cancel: '取消',
    deactivate: '取消激活',
    activate: '激活',
    picture1MbMax: '个人简介中的图片不得超过1MB',
    title: '称呼',
    surname: '姓氏',
    professionalTitle: '专业职称',
    organizationalUnit: '组织单位',
    organization: '组织机构',
    street: '街道地址',
    zipCode: '邮编',
    poBox: '邮政信箱',
    city: '城市',
    countryIso: '国家',
    primaryEmail: '主要电子邮件地址',
    secondaryEmail: '次要电子邮件地址',
    primaryPhoneNumber: '主要的联系电话',
    secondaryPhoneNumber: '次要的联系电话',
    skype: 'Skype名称',
    contactPreference: '首选的联系方式',
    contactPreferenceMethod: '联系方式',
    platformChat: 'PlatformChat',
    signal: 'Signal',
    whatsapp: 'Whatsapp',
    activated: '已激活',
    status: '状态',
    demoteToUser: '你确定要删除管理员权限吗？',
    promoteToAdmin: '您确定要授予管理员权限吗？',
    mandatoryFields: '*为必填项',
  },

  country: {
    region: {
      asia: '亚洲',
      europe: '欧洲',
      oceania: '大洋洲',
      north_and_central_america: '中北美洲',
      south_america: '南美洲',
      africa: '非洲',
      atlantis: '亚特兰蒂斯',
      forest_europe: '欧洲森林保护部长级会议',
    },
  },

  admin: {
    admin: '管理',
    filter: '筛选，按照',
    language: '语言',
    country: '国家',
    invitationPending: '邀请待处理',
  },

  countryMessageBoard: {
    messageBoard: '留言板',
    messageBoardDesc: '此处发布的消息对所有本国家/地区的成员可见',
    oneToOneMessages: '一对一消息',
  },

  panEuropean: {
    panEuropeanAssessment: '泛欧洲评估',
    variable: '变量',
    landing: {
      link: '欧洲森林保护部长级会议/联合国欧洲经济委员会/粮农组织泛欧洲可持续森林管理指标联合报告：欧洲森林保护部长级会议',
    },
    home: {
      description1:
        '本数据集中的数据来自国家通讯员在填写欧洲森林保护部长级会议/联合国欧洲经济委员会/粮农组织泛欧洲可持续森林管理量化指标联合调查问卷时所提供的信息。',
      description2:
        '2020年泛欧洲报告的编写与2020年全球森林资源评估（FRA 2020）同时进行。尽管是两项单独进程，但一些变量在两者中同时出现。但请注意，由于数据收集完毕后，部分被用于《2020年欧洲森林状况》的信息在经与国家通讯员协商后进行了调整，因此，可能与FRA平台上的信息有所不同。',
    },
    disclaimer: {
      and: '和',
      forestEurope: '欧洲森林保护部长级会议',
      govSwitzerland: '瑞士政府',
      part1: '本网站的制作得到了下述各方的协助[支持]：',
    },

    // navigation
    navigation: {
      forestResourcesAndCarbon: '森林资源和碳',
      maintenanceOfForestEcosystemHealthAndVitality: '维护森林生态系统的健康与活力',
      productiveFunctionsOfForestsWoodAndNonWood: '森林的生产功能(木材和非木材)',
      biologicalDiversityInForestEcosystems: '森林生态系统的生物多样性',
      protectiveFunctionsInForestManagement: '森林管理的保护功能',
      socioEconomicFunctionsAndConditions: '社会经济职能和条件',
    },

    // table 1.1a
    forestArea: {
      forestArea: '森林面积',
      categoryYear: '类别-年份',
      area: '面积',
      area1000Ha: '面积(1000公顷)',
      forest: '森林-{{year}}',
      _of_which_available_for_wood_supply: '…可用于木材供应-{{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和-{{year}}',
      other_land: '其他土地-{{year}}',
      _of_which_with_tree_cover: '…有树木覆盖-{{year}}',
    },

    // table 1.1b
    forestAreaByForestTypes: {
      forestAreaByForestTypes: '森林面积（按森林类型）',
      category: '类别',
      forestArea1000Ha: '森林面积(1000公顷)',
      predominantly_coniferous_forest: '主要为针叶林',
      predominantly_broadleaved_forest: '主要为阔叶林',
      mixed_forest: '针阔混交林',
      forest_area_1990: '森林面积- 1990',
      forest_area_2000: '森林面积- 2000',
      forest_area_2005: '森林面积- 2005',
      forest_area_2010: '森林面积- 2010',
      forest_area_2015: '森林面积- 2015',
      forest_area_2020: '森林面积- 2020',
    },

    // table 1.2a
    growingStock: {
      growingStock: '立木蓄积量',
      categoryYear: '类别-年份',
      growingStockMillionM3OB: '立木蓄积量[百万立方米（带皮）]',
      total: '总计',
      _ofWhich: '…为',
      coniferous: '针叶林',
      broadleaved: '阔叶林',
      forest: '森林-{{year}}',
      _of_which_available_for_wood_supply: '…可用于木材供应-{{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和-{{year}}',
    },

    // table 1.2b
    growingStockByForestType: {
      growingStockByForestType: '立木蓄积量（按森林类型）',
      category: '类别',
      growingStockMillionM3OB: '立木蓄积量[百万立方米（带皮）]',
      predominantly_coniferous_forest: '主要为针叶林',
      predominantly_broadleaved_forest: '主要为阔叶林',
      mixed_forest: '针阔混交林',
      growing_stock_1990: '立木蓄积量 - 1990',
      growing_stock_2000: '立木蓄积量 - 2000',
      growing_stock_2005: '立木蓄积量 - 2005',
      growing_stock_2010: '立木蓄积量 - 2010',
      growing_stock_2015: '立木蓄积量 - 2015',
      growing_stock_2020: '立木蓄积量 - 2020',
    },

    // table 1.2c
    growingStockComposition: {
      growingStockComposition: '立木的组成',
      speciesName: '树种名称',
      growingStockInForestMillionM3OB: '森林立木蓄积量[百万立方米（带皮）]',
      rank: '排名',
      scientificName: '学名',
      commonName: '通用名',
      no1_ranked_in_terms_of_volume: '从数量而言，排名第#1',
      no2_ranked_in_terms_of_volume: '从数量而言，排名第#2',
      no3_ranked_in_terms_of_volume: '从数量而言，排名第#3',
      no4_ranked_in_terms_of_volume: '从数量而言，排名第#4',
      no5_ranked_in_terms_of_volume: '从数量而言，排名第#5',
      no6_ranked_in_terms_of_volume: '从数量而言，排名第#6',
      no7_ranked_in_terms_of_volume: '从数量而言，排名第#7',
      no8_ranked_in_terms_of_volume: '从数量而言，排名第#8',
      no9_ranked_in_terms_of_volume: '从数量而言，排名第#9',
      no10_ranked_in_terms_of_volume: '从数量而言，排名第#10',
      remaining: '其余的',
      total: '总计',
      scientific_name: '学名',
      common_name: '通用名',
      growing_stock_in_forest_1990: '森林立木蓄积量[百万立方米（带皮）] - 1990',
      growing_stock_in_forest_2000: '森林立木蓄积量[百万立方米（带皮）] - 2000',
      growing_stock_in_forest_2005: '森林立木蓄积量[百万立方米（带皮）] - 2005',
      growing_stock_in_forest_2010: '森林立木蓄积量[百万立方米（带皮）] - 2010',
      growing_stock_in_forest_2015: '森林立木蓄积量[百万立方米（带皮）] - 2015',
      growing_stock_in_forest_2020: '森林立木蓄积量[百万立方米（带皮）] - 2020',
    },

    // table 1.3a1
    ageClassDistributionAreaOfEvenAgedStands: {
      ageClassDistributionAreaOfEvenAgedStands: '龄级分布 (同龄林面积)',
      categoryYear: '类别-年份',
      developmentPhases: '生长阶段',
      total_area: '总面积',
      regeneration_phase: '再生阶段',
      intermediate_phase: '中间阶段',
      mature_phase: '成熟阶段',
      unspecified: '未指明',
      _1000Ha: '1000公顷',
      forest_even_aged_stands_of_which: '森林(同龄林), 其中: - {{year}}',
      available_for_wood_supply_of_which: '可用于木材供应, 其中: - {{year}}',
      predominantly_coniferous_forest: '主要为针叶林 - {{year}}',
      predominantly_broadleaved_forest: '主要为阔叶林 - {{year}}',
      mixed_forest: '针阔混交林 - {{year}}',
    },

    // table 1.3a2
    ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply: {
      ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply: '木材林龄级分布 (同龄林储量) ',
      categoryYear: '类别-年份',
      developmentPhases: '生长阶段',
      total_volume: '总量',
      regeneration_phase: '再生阶段',
      intermediate_phase: '中间阶段',
      mature_phase: '成熟阶段',
      unspecified: '未指明',
      _1000M3: '1000立方米',
      forest_available_for_wood_supply_even_aged_stands_of_which: '木材林 (同龄林), 其中: - {{year}}',
      predominantly_coniferous_forest: '主要为针叶林 - {{year}}',
      predominantly_broadleaved_forest: '主要为阔叶林 - {{year}}',
      mixed_forest: '针阔混交林 - {{year}}',
    },

    // table 1.3b
    diameterDistributionAndTotalAreaUnevenAgedStands: {
      diameterDistributionAndTotalAreaUnevenAgedStands: '胸径分布和总面积(异龄林)',
      categoryYear: '类别-年份',
      volumeByDiameterClasses1000mob: '储量（按胸径区间）',
      area: '面积(1000公顷)',
      total_volume: '总储量 [1000立方米（带皮）]',
      less_or_equal_20_cm: '<20 厘米 [1000立方米（带皮）]',
      _21_40_cm: '21-40 厘米 [1000立方米（带皮）]',
      _41_60_cm: '41-60 厘米 [1000立方米（带皮）]',
      greater_60_cm: '>60 厘米 [1000立方米（带皮）]',
      unspecified: '未指明 [1000立方米（带皮）]',
      forest_uneven_aged_stands: '森林-异龄林 - {{year}}',
      _of_which_forest_available_for_wood_supply: '其中...: 可用于木材供应 - {{year}}',
    },

    // table 1.4a
    carbonStock: {
      carbonStock: '碳储量',
      categoryYear: '类别-年份',
      carbonInAboveGroundAndBelowGroundLivingBiomass: '地上和地下活体生物质中的碳储量',
      carbonInDeadwoodAndLitter: '枯死木和林分枯落物中的碳储量',
      above_ground: '地上活体生物质中的碳储量',
      aboveGround: '地上',
      below_ground: '地下活体生物质中的碳储量',
      belowGround: '地下',
      deadwood: '枯死木中的碳储量',
      deadwoodCarbon: '枯死木',
      litter: '林分枯落物中的碳储量',
      litterCarbon: '林分枯落物',
      soil_carbon: '土壤中的碳储量',
      millionMetricTonnes: '百万公吨',
      forest: '森林 - {{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和-{{year}}',
    },

    // table 1.4b
    carbonStockInHarvestedWoodProductsHWP: {
      carbonStockInHarvestedWoodProductsHWP: '已收获木材产品中的碳储量',
      categoryYear: '类别-年份',
      totalCarbonStockInHWPMillionMetricTonnes: '已收获木材产品中的总碳储量（百万公吨）',
      total_carbon_stock_in_hwp: '已收获木材产品中的总碳储量',
      harvested_wood_products: '已收获木材产品-{{year}}',
    },

    // table 2.4
    forestAreaWithDamage: {
      forestAreaWithDamage: '遭破坏的森林面积',
      categoryYear: '类别-年份',
      areaWithDamageByDifferentAgents: '遭破坏的森林面积（按不同因素）',
      primarilyDamagedByBioticAgents: '主要因生物因素遭到破坏',
      damagePrimarilyHumanInduced: '主要因人为因素遭到破坏',
      primarilyDamagedByFire: '主要因火灾遭到破坏',
      thousandHa: '1000公顷',
      total_area_with_damage: '遭破坏的森林面积总和',
      insects_and_disease: '生物因素：病虫害',
      insectsAndDisease: '病虫害',
      wildlife_and_grazing: '生物因素: 野生生物和放牧',
      wildlifeAndGrazing: '野生生物和放牧',
      forest_operations: '人为因素: 森林作业',
      forestOperations: '森林作业',
      other: '人为因素: 其他',
      otherHumanInduced: '其他',
      primarily_damaged_by_abiotic_agents: '非生物因素 (风暴、风、雪等)',
      primarilyDamagedByAbioticAgents: '主要因非生物因素遭到破坏(风暴、风、雪等)',
      primarily_damaged_by_fire_total: '火灾: 总和',
      primarilyDamagedByFireTotal: '总计',
      of_which_human_induced: '火灾: 人为引发',
      ofWhichHumanInduced: '人为引发',
      unspecified_mixed_damage: '未指明/多重因素导致的破坏',
      forest: '森林-{{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林和其他林地总和-{{year}}',
    },

    // table 2.5
    areaWithForestLandDegradation: {
      areaWithForestLandDegradation: '退化森林的面积',
      categoryYear: '类别-年份',
      totalAreaOfDegradedLand: '退化土地的总面积',
      areaPrimarilyDegradedBy: '退化面积（按导致退化的主要因素）',
      formerDegradedLandRestored: '得到恢复的退化森林',
      grazing: '放牧',
      repeatedFires: '反复的火灾',
      airPollution: '空气污染',
      desertification: '荒漠化',
      other1: '其他1',
      other2: '其他2',
      other3: '其他3',
      unknown: '未知',
      nA: '',
      thousandHa: '1000公顷',
      forest: '森林- {{year}}',
      other_wooded_land: '其他林地 - {{year}}',
      total_forest_and_other_wooded_land: '森林和其他林地总和- {{year}}',
      otherNames: '导致森林退化的其他主要因素',
      total_area_of_degraded_land: '退化土地总面积',
      repeated_fires: '反复的火灾',
      air_pollution: '空气污染',
      other_1: '其他1',
      other_2: '其他2',
      other_3: '其他3',
      former_degraded_land_restored: '得到恢复的退化森林',
    },

    // table 3.1
    incrementAndFellings: {
      incrementAndFellings: '增量和采伐量',
      categoryYear: '类别-年份',
      fellings: '采伐量',
      volume1000mob: '体积[1000立方米（带皮）]',
      gross_annual_increment: '年度总增量',
      natural_losses: '自然损失',
      net_annual_increment: '年度净增量',
      fellings_total: '采伐量: 总和',
      fellingsTotal: '总计',
      _of_which_of_natural_losses: '采伐量：自然损失',
      ofWhichOfNaturalLosses: '...为: 自然损失',
      forest: '森林 - {{year}}',
      _of_which_forest_available_for_wood_supply: '...为:可用于木材供应的森林 - {{year}}',
    },

    // table 3.2
    removals: {
      removals: '消耗',
      categoryYear: '类别-年份',
      woodRemovals: '木材消耗',
      total: '总和',
      industrialRoundwood: '工业原木',
      woodfuel: '薪柴燃料',
      volume1000M3UB: '体积[1000立方米（带皮）]',
      marketValue1000NationalCurrency: '市场价值(1000当地货币)',
      roundwood: '原木- {{year}}',
      total_volume: '总和: 体积[1000立方米（带皮）]',
      industrial_roundwood_volume: '工业原木: 体积[1000立方米（带皮）]',
      industrial_roundwood_market_value: '工业原木: 市场价值(1000当地货币)',
      woodfuel_volume: '薪柴燃料: 体积 [1000立方米（带皮）]',
      woodfuel_market_value: '薪柴燃料: 市场价值(1000当地货币)',
    },

    // table 3.3
    nonWoodGoods2015: {
      nonWoodGoods2015: '非木材产品(2015)',
      rankValue: '排名(价值)',
      nameOfGroupsOfProduct: '产品（组）名称',
      keySpecies: '主要种类',
      totalHarvestedNonWoodGoods: '已收获非木材产品总和',
      unit: '单位',
      quantity: '数量',
      marketValue1000NationalCurrency: '市场价值 (1000当地货币)',
      nwfpCategory: '非木质林产品类别',
      _01st: '第1位 (价值)',
      _02nd: '第2位 (价值)',
      _03rd: '第3位 (价值)',
      _04th: '第4位 (价值)',
      _05th: '第5位 (价值)',
      _06th: '第6位 (价值)',
      _07th: '第7位 (价值)',
      _08th: '第8位 (价值)',
      _09th: '第9位 (价值)',
      _10th: '第10位 (价值)',
      all_other_plant_products: '所有其他植物产品',
      all_other_animal_products: '所有其他动物产品',
      total: '总计',
      name_of_groups_of_product: '产品（组）名称',
      key_species: '关键种类',
      total_harvested_non_wood_goods_unit: '已收获非木材产品总和: 单位',
      total_harvested_non_wood_goods_quantity: '已收获非木材产品总和：数量',
      market_value_1000_national_currency: '市场价值 (1000国家货币)',
      nwfp_category: '非木材林产品类别',
    },

    // table 3.4
    marketedServices2015: {
      marketedServices2015: '市场服务 (2015)',
      rankValue: '排名 (价值)',
      nameOfServiceProduct: '服务/产品名称',
      unit: '单位',
      serviceProvision: '服务提供',
      forestServiceCategory: '森林服务类别',
      amountOfServiceProduct: '服务/产品数量',
      value1000NationalCurrency: '价值 (1000国家货币)',
      _01st: '第1位 (价值)',
      _02nd: '第2位 (价值)',
      _03rd: '第3位 (价值)',
      _04th: '第4位 (价值)',
      _05th: '第5位 (价值)',
      _06th: '第6位 (价值)',
      _07th: '第7位 (价值)',
      _08th: '第8位 (价值)',
      _09th: '第9位 (价值)',
      _10th: '第10位 (价值)',
      remaining_total: '剩余总和',
      total: '总计',
      name_of_service_product: '服务/产品名称',
      service_provision_amount_of_service_product: '服务提供: 服务/产品数量',
      service_provision_value_1000_national_currency: '服务提供: 价值 (1000国家货币)',
      forest_service_category: '森林服务类别',
    },

    // table 4.1
    treeSpeciesComposition: {
      treeSpeciesComposition: '树种组成',
      categoryYear: '类别-年份',
      areaWithNumberOfTreeSpeciesOccurring1000ha: '面积（按树种数量）(1000公顷)',
      area_with_number_of_tree_species_occurring_1: '面积-树种数量为: 1',
      areaWithNumberOfTreeSpeciesOccurring1: '1',
      area_with_number_of_tree_species_occurring_2_3: '面积-树种数量为: 2-3',
      areaWithNumberOfTreeSpeciesOccurring2_3: '2-3',
      area_with_number_of_tree_species_occurring_4_5: '面积-树种数量为: 4-5',
      areaWithNumberOfTreeSpeciesOccurring4_5: '4-5',
      area_with_number_of_tree_species_occurring_6_pl: '面积-树种数量为: 6+',
      areaWithNumberOfTreeSpeciesOccurring6_pl: '6+',
      forest: '森林- {{year}}',
      other_wooded_land: '其他林地 - {{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和 - {{year}}',
    },

    // table 4.2a
    totalForestAreaByExpansionAndRegenerationType: {
      totalForestAreaByExpansionAndRegenerationType: '森林总面积（按扩张和再生类型）',
      categoryYear: '类别-年份',
      totalAreaOfForestByExpansionRegenerationType1000ha: '森林总面积（按扩张/再生类型） (1000公顷)',
      natural_expansion_and_natural_regeneration: '自然扩张和自然再生',
      afforestation_and_regeneration_by_planting_and_or_seeding: '通过种植和/或播种造林和再生',
      coppice: '矮林',
      forest: '森林-{{year}}',
    },

    // table 4.2b
    annualForestExpansionAndRegeneration: {
      annualForestExpansionAndRegeneration: '年度森林扩张和再生',
      categoryYear: '类别-年份',
      annualForestExpansionAndRegeneration1000ha: '年度森林扩张和再生(1000公顷)',
      expansionOfForestArea: '森林扩张面积',
      regenerationOfForestArea: '森林再生面积',
      afforestation: '扩张: 造林',
      afforestationExpansion: '造林',
      natural_expansion: '扩张: 自然扩张',
      naturalExpansion: '自然扩张',
      natural_regeneration: '再生: 自然扩张',
      naturalRegeneration: '自然再生',
      planting_and_seeding: '再生：种植和播种',
      plantingAndSeeding: '种植和播种',
      coppice: '再生: 矮林',
      coppiceRegeneration: '矮林',
      forest: '森林 - {{year}}',
    },

    // table 4.3a
    naturalness: {
      naturalness: '天然程度',
      categoryYear: '类别-年份',
      area1000ha: '面积 (1000公顷)',
      undisturbed_by_man: '不受人类干扰',
      semi_natural: '半天然',
      plantations: '种植林',
      forest: '森林-{{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和-{{year}}',
    },

    // table 4.3b
    naturalnessBySubclasses: {
      naturalnessBySubclasses: '天然程度（按子类）',
      categoryYear: '类别-年份',
      area1000ha: '面积(1000公顷)',
      semiNatural: '半天然',
      plantations: '种植林',
      naturally_established: '半天然: 天然形成',
      naturallyEstablished: '天然形成',
      naturalised_introduced_species: '半天然:驯化的引进种',
      naturalisedIntroducedSpecies: '驯化的引进种',
      established_by_planting_and_or_seeding: '半天然: 通过种植和/或播种形成',
      establishedByPlantingAndOrSeeding: '通过种植和/或播种形成',
      coppice: '半天然: 矮林',
      coppiceSemiNatural: '矮林',
      unknown_origin: '半天然: 未知来源',
      unknownOrigin: '未知来源',
      native_species: '种植林: 本地种',
      nativeSpecies: '本地种',
      introduced_species: '种植林: 引进种',
      introducedSpecies: '引进种',
      forest: '森林- {{year}}',
    },

    // table 4.4a
    introducedTreeSpecies: {
      introducedTreeSpecies: '以引进树种为主的林地面积',
      categoryYear: '类别-年份',
      areaOfStandsDominatedByIntroducedTreeSpecies1000ha: '以引进树种为主的林地面积(1000 公顷)',
      total: '总和',
      _of_which_invasive: '其中… 为: 入侵种',
      forest: '森林- {{year}}',
      other_wooded_land: '其他林地 - {{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和 - {{year}}',
    },

    // table 4.4b
    introducedTreeSpecies4_4b: {
      introducedTreeSpecies4_4b: '引进树种',
      category: '类别',
      scientificNameOfIntroducedTreeSpecies: '引进树种学名',
      forestAreaOccupied1000Ha: '占据森林面积 (1000 公顷)',
      _01: '引进树种 1',
      _02: '引进树种 2',
      _03: '引进树种 3',
      _04: '引进树种 4',
      _05: '引进树种 5',
      _06: '引进树种 6',
      _07: '引进树种 7',
      _08: '引进树种 8',
      _09: '引进树种 9',
      _10: '引进树种 10',
      _11: '引进树种 11',
      _12: '引进树种 12',
      _13: '引进树种 13',
      _14: '引进树种 14',
      _15: '引进树种 15',
      _16: '引进树种 16',
      _17: '引进树种 17',
      _18: '引进树种 18',
      _19: '引进树种 19',
      _20: '引进树种 20',
      scientific_name_of_introduced_tree_species: '引进树种学名',
      forest_area_occupied_2005: '占据森林面积 (1000公顷) - 2005',
      forest_area_occupied_2010: '占据森林面积 (1000公顷) - 2010',
      forest_area_occupied_2015: '占据森林面积 (1000公顷) - 2015',
    },

    // table 4.4c
    invasiveTreeSpecies: {
      invasiveTreeSpecies: '入侵树种',
      category: '类别',
      scientificNameOfInvasiveTreeSpecies: '入侵树种学名',
      forestAreaAffected1000Ha: '受影响森林面积(1000公顷)',
      _01: '入侵树种 1',
      _02: '入侵树种 2',
      _03: '入侵树种 3',
      _04: '入侵树种 4',
      _05: '入侵树种 5',
      _06: '入侵树种 6',
      _07: '入侵树种 7',
      _08: '入侵树种 8',
      _09: '入侵树种 9',
      _10: '入侵树种 10',
      _11: '入侵树种 11',
      _12: '入侵树种 12',
      _13: '入侵树种 13',
      _14: '入侵树种 14',
      _15: '入侵树种 15',
      _16: '入侵树种 16',
      _17: '入侵树种 17',
      _18: '入侵树种 18',
      _19: '入侵树种 19',
      _20: '入侵树种 20',
      scientific_name_of_invasive_tree_species: '入侵树种学名',
      forest_area_affected_2005: '受影响的森林面积 (1000公顷) - 2005',
      forest_area_affected_2010: '受影响的森林面积 (1000公顷) - 2010',
      forest_area_affected_2015: '受影响的森林面积 (1000公顷) - 2015',
    },

    // table 4.5
    deadwood: {
      deadwood: '枯死木',
      categoryYear: '类别-年份',
      volumeOfDeadwoodM3Ha: '枯死木体积 (立方米/公顷)',
      total: '总和',
      standing: '立木',
      lying: '躺木',
      forest: '森林 - {{year}}',
      other_wooded_land: '其他林地 - {{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和- {{year}}',
      volumeOfDeadwoodInFOWLBySpeciesGroups: '森林及其他林地中枯死木体积（按物种群）',
      coniferous: '针叶林 - {{year}}',
      broadleaved: '阔叶林 - {{year}}',
    },

    // table 4.8
    threatenedForestSpecies: {
      threatenedForestSpecies: '受威胁森林物种',
      categoryYear: '类别-年份',
      threatenedForestSpeciesCol: '受威胁森林物种',
      absoluteNumber: '绝对数',
      total_of_taxa: '分类汇总',
      vulnerable: '易危',
      endangered: '濒危',
      critically_endangered: '极危',
      extinct_in_the_wild: '野外灭绝',
      trees: '树木 - {{year}}',
      birds: '鸟类 - {{year}}',
      mammals: ' 哺乳动物- {{year}}',
      other_vertebrates: '其他脊椎动物 - {{year}}',
      invertebrates: '无脊椎动物 - {{year}}',
      vascular_plants: '维管植物- {{year}}',
      cryptogams_and_fungi: '隐花植物和真菌 - {{year}}',
    },

    // table 4.9
    protectedForests: {
      protectedForests: '受保护森林',
      categoryYear: '类别-年份',
      ha1000: '1000公顷',
      mcpfe_class_1_1: '欧洲大森林地区森林保护部长级会议（MCPFE） 类别 1.1',
      mcpfe_class_1_2: '欧洲大森林地区森林保护部长级会议（MCPFE） 类别 1.2',
      mcpfe_class_1_3: '欧洲大森林地区森林保护部长级会议（MCPFE） 类别 1.3',
      mcpfe_class_2: '欧洲大森林地区森林保护部长级会议（MCPFE） 类别 2',
      forest: '森林 - {{year}}',
      other_wooded_land: '其他林地 - {{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和-{{year}}',
    },

    // table 5.1
    protectiveForestsSoilWaterAndOtherEcosystemFunctions: {
      protectiveForestsSoilWaterAndOtherEcosystemFunctions: '受保护的森林–土壤、水及其他生态系统功能;基础设施及得到管理的自然资源',
      categoryYear: '类别-年份',
      protectiveForestsMCPFEClass31000ha: '受保护的森林-欧洲大森林地区森林保护部长级会议（MCPFE） 类别 3 (1000公顷)',
      soil_water_and_other_forest_ecosystem_functions: '土壤、水及其他森林生态系统功能',
      infrastructure_and_managed_natural_resources: '基础设施及得到管理的自然资源',
      total: '总和',
      forest: '森林- {{year}}',
      other_wooded_land: '其他林地-{{year}}',
      total_forest_and_other_wooded_land: '森林及其他林地总和- {{year}}',
    },

    // table 6.1
    forestHoldings: {
      forestHoldings: '森林经营单位',
      categoryYear: '类别-年份',
      areaAndNumberOfForestHoldingsInSizeClasses: '森林经营单位面积和数量（按面积区间）',
      less10ha: '≤ 10公顷',
      _11_500ha: '11 - 500公顷',
      more500ha: '≥ 500公顷',
      total_forest_area: '森林面积总和(1000公顷)',
      total_number_of_holdings: '经营单位总数',
      less_10_ha_area: '≤ 10公顷: 面积 (1000公顷)',
      less_10_ha_number: '≤ 10公顷: 经营单位数量',
      _11_500_ha_area: '11 - 500公顷: 面积 (1000公顷)',
      _11_500_ha_number: '11 - 500公顷: 经营单位数量',
      more_500_ha_area: '≥ 500公顷: 面积(1000公顷)',
      more_500_ha_number: '≥ 500公顷: 经营单位数量',
      area1000Ha: '面积(1000公顷)',
      numberOfHoldings: '经营单位数量',
      in_public_ownership: '公有-{{year}}',
      in_private_ownership: '私有-{{year}}',
      other_types_of_ownership_unknown: '其他类型的所有权/未知- {{year}}',
    },

    // table 6.2
    grossValueAdded: {
      grossValueAdded: '总增值',
      categoryYear: '类别-年份',
      grossValueAddedCol: '总增值（GVA））',
      million_national_currency: '百万国家货币',
      percent_of_total_gva: '占总GVA百分比',
      forestry: '林业 (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: '木材和木制品的制造 (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: '纸张和纸制品的制造(ISIC/NACE 17) - {{year}}',
    },

    // table 6.3
    factorIncomeAndEntrepreneurialIncome: {
      factorIncomeAndEntrepreneurialIncome: '生产要素收入和创业收入',
      categoryYear: '类别-年份',
      millionNationalCurrency: '百万国家货币',
      factor_income: '生产要素收入',
      net_operating_surplus: '净营业盈余',
      forestry: '林业 (ISIC/NACE 02) - {{year}}',
    },

    // table 6.4a
    totalGrossFixedCapitalFormationInForestsAndForestry: {
      totalGrossFixedCapitalFormationInForestsAndForestry: '森林和林业固定资本形成总额',
      categoryYear: '类别-年份',
      grossFixedCapitalFormationMillionNationalCurrency: '固定资本形成总额 (百万国家货币)',
      plantingOfTreesToProvideRegularIncome: '通过植树造林提供固定收入',
      equipmentAndBuildings: '设备和建筑',
      otherGrossFixedCapitalFormation: '其他固定资本形成总额',
      total: '总和',
      forestry_isic_nace_02: '林业 (ISIC/NACE 02) - {{year}}',
      planting_of_trees_to_provide_regular_income: '通过植树造林提供固定收入',
      equipment_and_buildings: '设备和建筑',
      other_gross_fixed_capital_formation: '其他固定资本形成总额',
    },

    // table 6.4b
    totalFixedCapitalConsumptionInForestsAndForestry: {
      totalFixedCapitalConsumptionInForestsAndForestry: '森林和林业固定资本消耗总额',
      categoryYear: '类别-年份',
      fixedCapitalConsumptionMillionNationalCurrency: '固定资本消耗 (百万国家货币)',
      fixed_capital_consumption: '固定资本消耗',
      forestry_isic_nace_02: '林业(ISIC/NACE 02) - {{year}}',
    },

    // table 6.4c
    totalCapitalTransfersInForestsAndForestry: {
      totalCapitalTransfersInForestsAndForestry: '森林和林业资本转移总和',
      categoryYear: '类别-年份',
      capitalTransfersMillionNationalCurrency: '资本转移(百万国家货币)',
      capital_transfers: '资本转移',
      forestry_isic_nace_02: '林业 (ISIC/NACE 02) - {{year}}',
    },

    // table 6.5a
    employmentByGenderAndAge: {
      employmentByGenderAndAge: '就业（按性别和年龄）',
      categoryYear: '类别-年份',
      total: '总和',
      gender: '性别',
      ageGroup: '年龄段',
      male: '男性',
      female: '女性',
      _15_49: '15-49',
      _50_: '50+',
      _1000Persons: '1000人',
      forestry: '林业(ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: '木材和木制品的制造(ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: '纸张和纸制品的制造(ISIC/NACE 17) - {{year}}',
      gender_male: '性别: 男性',
      gender_female: '性别: 女性',
      age_group_15_49: '年龄段: 15-49',
      age_group_50_plus: '年龄段: 50+',
    },

    // table 6.5b
    employmentByEducationAndJobCharacteristics: {
      employmentByEducationAndJobCharacteristics: '就业（按教育背景和工作性质）',
      categoryYear: '类别-年份',
      education: '教育(ISCED类别 1997)',
      jobCharacteristics: '工作性质',
      _0_2: '0-2',
      _3_4: '3-4',
      _5_6: '5-6',
      _1000Persons: '1000人',
      education_0_2: '教育 (ISCED类别 1997): 0-2',
      education_3_4: '教育 (ISCED类别 1997): 3-4',
      education_5_6: '教育 (ISCED类别 1997): 5-6',
      employees: '工作性质: 雇员',
      employeesJobCharacteristics: '雇员',
      self_employed: '工作性质: 自营',
      selfEmployed: '自营',
      forestry: '林业 (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: '木材和木制品的制造 (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: '纸张和纸制品的制造 (ISIC/NACE 17) - {{year}}',
    },

    // table 6.6
    occupationalAccidents: {
      occupationalAccidents: '职业事故',
      categoryYear: '类别-年份',
      fatalOccupationalAccidents: '致命职业事故',
      nonFatalOccupationalAccidents: '非致命职业事故',
      number: '数量',
      annualRatePer1000Workers: '年度发生率（‰）',
      fatal_occupational_accidents_number: '致命职业事故：数量',
      fatal_occupational_accidents_per_1000_workers: '致命职业事故: 年度发生率（‰）',
      non_fatal_occupational_accidents_number: '非致命职业事故: 数量',
      non_fatal_occupational_accidents_per_1000_workers: '非致命职业事故: 年度发生率（‰）',
      forestry_isic_nace_02: '林业 (ISIC/NACE 02) - {{year}}',
    },

    // table 6.7
    woodConsumption: {
      woodConsumption: '木材消耗',
      category: '类别',
      woodConsumption1000M3RWE: '木材消耗(1000立方米原木当量)',
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
      wood_consumption: '森林产品消耗',
    },

    // table 6.8
    tradeInWood: {
      tradeInWood: '木材贸易',
      category: '类别',
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
      exports_of_forest_products_quantity: '森林产品出口(百万立方米原木当量)',
      exports_of_forest_products_value: '森林产品出口 (百万欧元/欧洲货币单位)',
      imports_of_forest_products_quantity: '森林产品进口 (百万立方米原木当量)',
      imports_of_forest_products_value: '森林产品进口 (百万欧元/欧洲货币单位)',
    },

    // table 6.9
    totalEnergySupplyFromWood: {
      totalEnergySupplyFromWood: '木材能源供应总和',
      category: '类别',
      tj: '总焦耳',
      _1000_metric_tonnes_dry_matter: '1000公吨干物质',
      total_primary_energy_supply: '初级能源供应总和',
      total_renewable_energy_supply: '可再生能源供应总和',
      total_energy_supply_from_wood: '木材能源供应总和:',
      energy_from_direct_wood_fibre_sources: '- 直接来自木纤维的能源:',
      of_which_from_forests: '来自森林',
      of_which_from_other_wooded_land: '来自林地及其他土地(森林外树木)',
      energy_from_co_products: '- 来自木材加工业的副产品和残留物的能源:',
      of_which_solid_residues: '来自固体残留物(碎屑、颗粒、木屑、树皮（不包括加工后的木质燃料）)',
      energy_from_processed_wood_based_fuels: '- 来自加工后的木质燃料(颗粒、煤球、木炭)的能源:',
      of_which_imported: '进口',
      energy_from_post_consumer_recovered_wood: '- 来自消费后回收木材的能源',
      energy_from_unknown_unspecified_sources: '- 来自未知、未指明来源的能源',
      tj_2007: '2007: 总焦耳',
      tj_2009: '2009: 总焦耳',
      tj_2011: '2011: 总焦耳',
      tj_2013: '2013: 总焦耳',
      tj_2015: '2015: 总焦耳',
      _1000_metric_tonnes_dry_matter_2007: '2007: 1000公吨干物质',
      _1000_metric_tonnes_dry_matter_2009: '2009: 1000公吨干物质',
      _1000_metric_tonnes_dry_matter_2011: '2011: 1000公吨干物质',
      _1000_metric_tonnes_dry_matter_2013: '2013: 1000公吨干物质',
      _1000_metric_tonnes_dry_matter_2015: '2015: 1000公吨干物质',
    },

    // table 6.10a
    accessibilityForRecreation: {
      accessibilityForRecreation: '用于休闲',
      categoryYear: '类别-年份',
      areaAvailableForPublicRecreation: '可供公众休闲的面积',
      total1000Ha: '总和(1000公顷)',
      _oftotal: '占总数百分比',
      areaPrimarilyDesignatedOrManagedForPublicRecreation: '主要指定用于公共休闲区域的面积或主要按公共休闲区域加以管理的面积',
      area_available_for_public_recreation_total: '可供公众休闲的面积: 总和 (1000公顷)',
      area_available_for_public_recreation_percent: '可供公众休闲的面积: 占总数百分比',
      area_designated_or_managed_for_public_recreation_total:
        '主要指定用于公共休闲区域的面积或主要按公共休闲区域加以管理的面积: 总和(1000公顷)',
      area_designated_or_managed_for_public_recreation_percent:
        '主要指定用于公共休闲区域的面积或主要按公共休闲区域加以管理的面积: 占总数百分比',
      total_forest_and_other_wooded_land: '森林及其他林地总和 - {{year}}',
    },

    // table 6.10b
    intensityOfUse: {
      intensityOfUse: '使用强度',
      categoryYear: '类别-年份',
      annualNumberOfVisitsMillion: '年访问量( 百万人次)',
      areaAvailableForPublicRecreation: '可供公众休闲的面积',
      areaPrimarilyDesignatedAndOrManagedForPublicRecreation: '主要指定用于公共休闲区域的面积或主要按公共休闲区域加以管理的面积',
      total_forest_and_other_wooded_land: '森林及其他林地总和 - {{year}}',
      area_available_for_public_recreation: '可供公众休闲的面积',
      area_designated_and_or_managed_for_public_recreation: '主要指定用于公共休闲区域的面积或主要按公共休闲区域加以管理的面积',
    },

    // table 6.10c
    recreationFacilities: {
      recreationFacilities: '休闲设施',
      categoryYear: '类别-年份',
      forestRoadsAndPathsAvailableForPublicRecreation: '可供公众休闲的森林道路和小径',
      _ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc: '... 指定用于远足、骑自行车、越野滑雪等项目',
      facilityLengthIn1000Km: '设施 (单位：1000公里)',
      area_available_for_public_recreation: '可供公众休闲的面积 - {{year}}',
      forest_roads_and_paths_available_for_public_recreation: '可供公众休闲的森林道路和小径',
      _of_which_designated_for_hiking_biking_cross_country_skiing_etc: '... 指定用于远足、骑自行车、越野滑雪等项目',
    },

    // table 6.10d
    otherRecreationFacilitiesPilotReporting2015: {
      otherRecreationFacilitiesPilotReporting2015: '其他休闲设施-试点报告 (2015)',
      category: '类别',
      facility: '设施',
      measurement_unit: '测量单位',
      extent_multiplicity: '范围（Extent）/复合度（Multiplicity）',
      facility_category: '设施类别',
      no1_area_available_for_public_recreation: '可供公众休闲的面积 1',
      no2_area_available_for_public_recreation: '可供公众休闲的面积 2',
      no3_area_available_for_public_recreation: '可供公众休闲的面积 3',
      no4_area_available_for_public_recreation: '可供公众休闲的面积 4',
      no5_area_available_for_public_recreation: '可供公众休闲的面积 5',
      no6_area_available_for_public_recreation: '可供公众休闲的面积 6',
      no7_area_available_for_public_recreation: '可供公众休闲的面积 7',
      no8_area_available_for_public_recreation: '可供公众休闲的面积 8',
      no9_area_available_for_public_recreation: '可供公众休闲的面积 9',
      no10_area_available_for_public_recreation: '可供公众休闲的面积 10',
      no11_area_available_for_public_recreation: '可供公众休闲的面积 11',
      no12_area_available_for_public_recreation: '可供公众休闲的面积 12',
      no13_area_available_for_public_recreation: '可供公众休闲的面积 13',
      no14_area_available_for_public_recreation: '可供公众休闲的面积 14',
      no15_area_available_for_public_recreation: '可供公众休闲的面积 15',
      no16_area_available_for_public_recreation: '可供公众休闲的面积 16',
      no17_area_available_for_public_recreation: '可供公众休闲的面积 17',
      no18_area_available_for_public_recreation: '可供公众休闲的面积 18',
      no19_area_available_for_public_recreation: '可供公众休闲的面积 19',
      no20_area_available_for_public_recreation: '可供公众休闲的面积 20',
    },
  },

  page: {
    assessmentSection: {
      dataTableHasErrors: '表格数据包含错误,将鼠标悬停在红色单元格上以查看详细信息。',
    },
  },
}
