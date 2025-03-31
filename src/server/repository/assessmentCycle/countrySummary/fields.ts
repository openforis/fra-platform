export const fields: Array<string> = [
  'country_iso',
  'last_edit',
  'last_edit_odp_data',
  'last_in_review',
  'last_for_approval',
  'last_accepted',
  'last_update',
  'invitations_accepted_count',
  'invitations_sent_count',
  'users_count',
]

export const fieldsJoined = (prefix = '') => {
  const prefixString = prefix ? `${prefix}.` : ''
  return fields.map((field) => `${prefixString}${field}`).join(', ')
}
