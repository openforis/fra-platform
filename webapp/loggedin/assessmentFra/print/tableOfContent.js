import './tableOfContent.less'

import React from 'react'

const TableOfContent = props =>{

  // add 8 main levels with inner links
  return (
    <ol className="table-of-content">
      <li><a href="#section1">Forest extent, characteristics and changes</a></li>
      <li>Forest growing stock, biomass and carbon</li>
    </ol>
  )
}

export default TableOfContent
