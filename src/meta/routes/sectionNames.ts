enum AdminSectionNames {
  countries = 'countries',
  invitations = 'invitations',
  userManagement = 'userManagement',
}

enum CountryHomeSectionNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  // contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  /**
   * @deprecated
   */
  links = 'links',
  repository = 'repository',
}

export const SectionNames = {
  Admin: AdminSectionNames,
  Country: {
    Home: CountryHomeSectionNames,
  },
}
