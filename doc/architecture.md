# FRA Platform architecture

## System architecture

![hela-architecture](img/fra-platform-architecture.png)

FRA Platform consists of Javascript-based front-end which runs in the
browser and a NodeJS backend (also JavaScript) which talks to
PostgreSQL database. The only external services at the time of writing
are a standard SMTP server and Google authentication services.


## Main technologies

All libraries used in the application are visible in
[package.json](../package.json). The list below consists of the most
important ones.

### Client-side libraries

#### [ES2015](http://www.ecma-international.org/ecma-262/6.0/)

Client-side JavaScript is transpiled from ES2015 version of JavaScript
with WebPack to older, mostly ES5 version
which is supported better by current web browsers.

#### [WebPack](https://webpack.js.org/)

Used to create a single, optimized bundle of all the required Javascript and
stylesheets for the Browser application.

#### [React](https://facebook.github.io/react/)

React is used for rendering the Web application HTML from Javascript
code.

#### [Redux](https://redux.js.org/)

Redux is used to store and manipulate client-side state for the Web
Application.

#### [Ramda](http://ramdajs.com/docs/)

Ramda is used to apply a [functional programming
paradigm](https://en.wikipedia.org/wiki/Functional_programming) for
JavaScript.

#### [Less](http://lesscss.org/)

Used to add features to CSS and to make it easily bundlable with
Webpack.

#### [Node.js](https://nodejs.org/en/docs/)

Used as the web-server and server-side application platform.

#### [Passport](http://www.passportjs.org/docs/)

Used to integrate google authentication service. Can be used to
integrate other authentication services as well.

### Server-side libraries

