import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import GenericTable from '../fraTable/genericTable'


const tableSpec = {
  name: 'specificForestCategories', // used to uniquely identify table
  header:   <thead>
              <tr>
                <td className="fra-table__header-cell"/>
                <td className="fra-table__header-cell">1990</td>
                <td className="fra-table__header-cell">2000</td>
                <td className="fra-table__header-cell">2010</td>
                <td className="fra-table__header-cell">2015</td>
                <td className="fra-table__header-cell">2020</td>
              </tr>
            </thead>,
  rows: [
    [{type: 'readOnly', jsx: <td key="bamboo" className="fra-table__header-cell">Bamboo</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ],
    [
      {type: 'readOnly', jsx: <td key="mangroves" className="fra-table__header-cell">Mangroves</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ],
    [
      {type: 'readOnly', jsx: <td key="mangroves" className="fra-table__header-cell">Rubber plantations</td>},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ]
  ]
}

class SpecificForestCategoriesView extends React.Component {
  render() {
    return <LoggedInPageTemplate>
      <div className="sfc__container">
        <h2 className="headline ofc__page-header">Specific forest categories</h2>
        <GenericTable tableSpec={tableSpec} countryIso={this.props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(SpecificForestCategoriesView)
