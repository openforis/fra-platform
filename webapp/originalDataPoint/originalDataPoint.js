import "./style.less"

import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { saveDraft } from "./actions"
import R from "ramda"

const years = [ '', ...R.range( 1990, 2020 ) ]

const DataInput = ({ match, saveDraft, active, status }) => {
    const countryIso = match.params.countryIso
    
    return <div className="odp__data-input-component">
        <div className="odp_data-input-row">
            <div><h3>Year</h3></div>
            <div>
                <select
                    value={active.year}
                    onChange={(e) => saveDraft( countryIso, R.assoc( "year", e.target.value, active ) ) }>
                    {years.map( (year) => <option key={year} value={year}>{year}</option> )}
                </select>
            </div>
        </div>
        <div className="odp_data-input-row">
            <div><h3>Forest area</h3></div>
            <div>
                <input value={active.forestArea}
                       onChange={(e) => saveDraft( countryIso, R.assoc( "forestArea", e.target.value, active ) ) }/>
            </div>
        </div>
        <div className="odp_data-input-row">
            <Link className="btn-primary" to={`/country/${countryIso}`}>Save & Close</Link>
        </div>
    </div>
}

const OriginalDataPoint = (props) =>
    <div className="odp__container">
        <h2>Add original data point</h2>
        <DataInput {...props}/>
    </div>

const mapStateToProps = state => {
    const odp    = state[ 'originalDataPoint' ]
    const active = odp.active || { year: '', forestArea: '' }
    return { ...odp, active }
}

export default connect( mapStateToProps, { saveDraft } )( OriginalDataPoint )