import "./style.less"
import React from "react"
import { connect } from "react-redux"
import * as R from "ramda"
import { save, fetch } from "./actions"
import { Link } from 'react-router-dom'

const DataTable = ( { reportingYears, save, countryIso } ) =>
    <div className="nde__input-table">
        <div className="nde__input-table-heading">
            {
                R.keys( reportingYears ).map( v =>
                    <div key={v}>{v}</div>
                )
            }
        </div>
        <div className="nde__input-table-content">
            {
                R.values( reportingYears ).map( v =>
                    <div key={v.name}>
                        <input
                            value={v.value || ''}
                            onChange={ e => {
                                save( countryIso, v.name, e.currentTarget.value, { reportingYears } )
                            }}/>
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
            
            {/*<button className="nde__add-original-datapoint-button">+ Add original data point</button>*/}
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


const mapStateToProps = state => {
    return state[ 'nationalDataEntry' ]
}

export default connect( mapStateToProps, { save, fetch } )( DataFetchingComponent )
