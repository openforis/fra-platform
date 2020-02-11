import './tableOfContent.less'

import React from 'react'
const TableOfContentItems = [
  'navigation.sectionHeaders.forestExtentCharacteristicsAndChanges',
  'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon',
  'navigation.sectionHeaders.forestDesignationAndManagement',
  'navigation.sectionHeaders.forestOwnershipAndManagementRights',
  'navigation.sectionHeaders.forestDisturbances',
  'navigation.sectionHeaders.forestPolicyAndLegislation',
  'navigation.sectionHeaders.employmentEducationAndNwfp',
  'navigation.sectionHeaders.sustainableDevelopment',
]

const TableOfContentLink = ({ children, i }) => <li><a href={`#section${i+1}`}>{children}</a></li>
const TableOfContent = props => {
  const { i18n } = props
  // add 8 main levels with inner links
  return (
    <ol className="table-of-content">
      {
        TableOfContentItems.map(
          (label, i) => <TableOfContentLink key={i} i={i} >{i18n.t(label)}</TableOfContentLink>
        )
      }
    </ol>
  )
}

export default TableOfContent
