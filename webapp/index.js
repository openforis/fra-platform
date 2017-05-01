import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';

require('../web-resources/testStyle.less');

const Heading = () => <h1>{R.concat('Hello ','frap')}</h1>

function renderApp() {
    ReactDOM.render(
        <Heading/>,
        document.getElementById('main')
    );
}

renderApp()
