// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAdminist... Remove this comment to see the full error message
  isAdministrator,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isNational... Remove this comment to see the full error message
  isNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isAlternat... Remove this comment to see the full error message
  isAlternateNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nationalCo... Remove this comment to see the full error message
  nationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'alternateN... Remove this comment to see the full error message
  alternateNationalCorrespondent,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'reviewer'.
  reviewer,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'collaborat... Remove this comment to see the full error message
  collaborator,
} = require('./countryRole')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'rolesAllow... Remove this comment to see the full error message
const rolesAllowedToChange = (countryIso: any, userInfo: any) => {
  if (isAdministrator(userInfo))
    return [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

  if (isNationalCorrespondent(countryIso, userInfo) || isAlternateNationalCorrespondent(countryIso, userInfo))
    return [collaborator.role]

  return []
}

const isAllowedToChangeRole = (countryIso: any, userInfo: any) =>
  R.not(R.isEmpty(rolesAllowedToChange(countryIso, userInfo)))

module.exports = {
  rolesAllowedToChange,
  isAllowedToChangeRole,
}
