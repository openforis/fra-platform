import './Actions.scss'
import React from 'react'

import { CountryUserSummary } from 'meta/user'

import CopyLink from './CopyLink'
import Edit from './Edit'
import Remove from './Remove'
import Resend from './Resend'

type Props = {
  countryUserSummary: CountryUserSummary
}

const Actions: React.FC<Props> = (props: Props) => {
  const { countryUserSummary } = props
  return (
    <div className="actions-container">
      {/* invitations */}
      <CopyLink countryUserSummary={countryUserSummary} />
      <Remove countryUserSummary={countryUserSummary} />
      <Resend countryUserSummary={countryUserSummary} />

      {/* existing user */}
      <Edit countryUserSummary={countryUserSummary} />
    </div>
  )
}

export default Actions
