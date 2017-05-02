// import R from 'ramda';
import React from 'react'
import ReactDOM from 'react-dom';

import Routes from './routes'

function renderApp() {
    ReactDOM.render(
        <Routes/>,
        document.getElementById( 'main' )
    );
}

renderApp()
