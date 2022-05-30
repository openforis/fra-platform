import React from 'react'

import { useCountryIso } from '@client/hooks'

const ManageCollaboratorsView: React.FC = () => {
  const countryIso = useCountryIso()

  return <div>{countryIso}</div>
}

export default ManageCollaboratorsView
