import R from 'ramda';

require('../web-resources/testStyle.less');

function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = R.concat('Hello','frap');
    return element;
}

document.body.appendChild(component());
