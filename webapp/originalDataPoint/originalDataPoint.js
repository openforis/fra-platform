import "./style.less"

import React from "react"
import { Link } from "react-router-dom"

const DataInput = ( props ) => {
    return <div className="odp__data-input-component">
        <div className="odp_data-input-row">
            <div><h3>Year</h3></div>
            <div>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
        </div>
        <div className="odp_data-input-row">
            <div><h3>Forest area</h3></div>
            <div>
                <input />
            </div>
        </div>
        <div className="odp_data-input-row">
            <Link className="nde__add-original-datapoint-button" to={`/country/${props.countryIso}`}>Close</Link>
        </div>
    </div>
}

const OriginalDataPoint = ( { match } ) => {
    console.log( match )
    return <div className="odp__container">
        <h2>Add original data point</h2>
        <DataInput countryIso={match.params.countryIso}/>
    </div>
}

export default OriginalDataPoint