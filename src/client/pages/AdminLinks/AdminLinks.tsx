import React from 'react'

import LinksTable from 'client/components/LinksTable'
import { useInitSections } from 'client/pages/Country/hooks/useInitSections'

const AdminLinks: React.FC = () => {
  useInitSections()

  return <LinksTable />
}

export default AdminLinks
