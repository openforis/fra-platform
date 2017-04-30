import R from 'ramda';

function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = R.concat('Hello','webpack');

    return element;
}

document.body.appendChild(component());
