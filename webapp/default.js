import React from 'react'
import { Link } from 'react-router-dom'

const Default = () => (
    <div>
        Welcome to FRA platform 2017
        <hr />
      <ul>
      <li><Link to="/country/ITA">Click to access Italy</Link></li>
      <li><Link to="/country/FIN">Click to access Finland</Link></li>
      </ul>
    </div>
)

export default Default