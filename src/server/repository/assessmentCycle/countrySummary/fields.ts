export const fields: Array<string> = [
  'country_iso',
  'invitations_accepted_count',
  'invitations_sent_count',
  'users_count',
]

/**
 * @deprecated - this will be removed
 */
export const fieldsCountry: Array<string> = [
  'last_update',
  'last_edit',
  'last_edit_odp',
  'last_in_editing',
  'last_in_review',
  'last_in_approval',
  'last_in_accepted',
]
/**
 * @deprecated - this will be removed
 */
export const fieldsFromCountryJoined = (prefix = '') => {
  const prefixString = prefix ? `${prefix}.` : ''
  return fieldsCountry.map((field) => `${prefixString}${field}`).join(', ')
}
