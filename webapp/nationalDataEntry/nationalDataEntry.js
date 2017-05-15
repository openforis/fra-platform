import "./style.less"
import React from "react"
import { connect } from "react-redux"
import * as R from "ramda"
import { save, fetch } from "./actions"
import { Link } from 'react-router-dom'

const odpCell = (forestArea) => <span className="nde__input-table-readonly-cell">{forestArea}</span>

const fraValueCell = (fraValue, fra, countryIso, save) => <input
    value={fraValue.forestArea || ''}
    onChange={ e => {
        save( countryIso, fraValue.name, e.target.value, { fra } )
    }}/>

const DataTable = ( { fra, save, countryIso } ) =>
    <div className="nde__input-table">
        <div className="nde__input-table-heading">
            {
                R.values(fra).map(v =>
                    <div key={`${v.type}_${v.name}`}>
                        { v.type === "odp" ?
                           <Link to={`/country/odp/${countryIso}/${v.odpId}`}>{v.name}</Link>
                          : v.name
                        }
                    </div>
                )
            }
        </div>
        <div className="nde__input-table-content">
            {
                R.values(fra).map(v =>
                    <div key={`${v.type}_${v.name}`}>
                        { v.type === "odp" ? odpCell(v.forestArea) : fraValueCell(v, fra, countryIso, save)}
                    </div>
                )
            }
        </div>
    </div>

const DataInput = ( props ) => {
    return <div className="nde__data-input-component">
        <h2>{props.name}</h2>
        <div className="nde__data-input-header">
            <div>
                {/*placeholder for chart heading*/}
            </div>
            <Link className="btn-primary" to={`/country/odp/${props.countryIso}`}>+ Add original data point</Link>
        </div>
        <span className="nde__status-indicator">{props.status}</span>
        
        <div className="nde__data-table-container">
            <DataTable {...props} />
        </div>
    </div>
}

const NationalDataEntry = ( props ) => {
    return <div>
        <DataInput {...props} name="Forest area"/>
    </div>
}

class DataFetchingComponent extends React.Component {
    componentWillMount() {
        this.props.fetch( this.props.match.params.countryIso )
    }
    
    render() {
        return <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    }
}


const mapStateToProps = state => state[ 'nationalDataEntry' ]

export default connect( mapStateToProps, { save, fetch } )( DataFetchingComponent )
