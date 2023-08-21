enum AdminSectionNames {
  userManagement = 'userManagement',
}

enum CountryHomeSectionNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  // contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  links = 'links',
}

export const SectionNames = {
  Admin: AdminSectionNames,
  Country: {
    Home: CountryHomeSectionNames,
  },
}
