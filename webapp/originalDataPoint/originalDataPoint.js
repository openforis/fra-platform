import "./style.less"

import React from "react"
import { Link } from "react-router-dom"

const years = [ 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 ]

const DataInput = ( props ) => {
    return <div className="odp__data-input-component">
        <div className="odp_data-input-row">
            <div><h3>Year</h3></div>
            <div>
                <select>
                    <option></option>
                    {years.map( ( year ) => <option key={year} value={year}>{year}</option> )}
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
            <Link className="btn-primary" to={`/country/${props.countryIso}`}>Close</Link>
        </div>
    </div>
}

const OriginalDataPoint = ( { match } ) =>
    <div className="odp__container">
        <h2>Add original data point</h2>
        <DataInput countryIso={match.params.countryIso}/>
    </div>

export default OriginalDataPoint