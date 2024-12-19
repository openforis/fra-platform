enum AdminSectionNames {
  countries = 'countries',
  invitations = 'invitations',
  links = 'links',
  collaborators = 'collaborators',
}

enum CountryHomeSectionNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  // contentCheck = 'contentCheck',
  collaborators = 'collaborators',
  recentActivity = 'recentActivity',
  repository = 'repository',
}

export const SectionNames = {
  Admin: AdminSectionNames,
  Country: {
    Home: CountryHomeSectionNames,
  },
}
