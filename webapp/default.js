import React from 'react'
import { Link } from 'react-router-dom'

const Default = () => (
    <div>
        Welcome to FRA platform
        <hr />
        <Link to="/country/ita">Click to access Italy</Link>
    </div>
)

export default Default