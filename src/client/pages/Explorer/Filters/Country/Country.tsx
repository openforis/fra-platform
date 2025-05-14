import React from 'react'

import CountryMultiSelect from 'client/components/CountryMultiSelect'

const Country: React.FC = () => {
  const handleChange = (value: Array<string>) => {
    return value
  }

  return <CountryMultiSelect onChange={handleChange} />
}

export default Country
