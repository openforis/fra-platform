# FRA Platform architecture

## System architecture

![hela-architecture](img/fra-platform-architecture.png)

FRA Platform consists of Javascript-based front-end which runs in the
browser and a [Node.js](https://nodejs.org/en/docs/) backend (also JavaScript) which talks to
PostgreSQL database. The only external services at the time of writing
are a standard SMTP server and Google authentication services.


## Main technologies

All libraries used in the application are visible in
[package.json](../package.json). The list below consists of the most
important ones.

### Libraries used in client and server

#### [Ramda](http://ramdajs.com/docs/)

Ramda is used to apply a [functional programming
paradigm](https://en.wikipedia.org/wiki/Functional_programming) for
JavaScript.

#### [bignumber.js](https://github.com/MikeMcl/bignumber.js/)

Used to make calculations more accurate than with plain floating point
numbers (Javascript default).

#### [i18next](https://www.i18next.com/)

Used for localization of UI texts and other messages (also on server).

### Client-side libraries and technologies

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

#### [D3.js](https://d3js.org/)

Used to draw charts

#### [Axios](https://github.com/axios/axios)

Used for Ajax HTTP requests from from browser to server.

#### [Less](http://lesscss.org/)

Used to add features to CSS and to make it easily bundlable with
Webpack.

Used as the web-server and server-side application platform.

### Server-side libraries

#### [Passport](http://www.passportjs.org/docs/)

Used to integrate google authentication service. Can be used to
integrate other authentication services as well.

#### [pg](https://www.npmjs.com/package/pg)

SQL queries to PostgreSQL database are used via this library.

#### [db-migrate](https://www.npmjs.com/package/db-migrate)

The database schema and it's initial data is created using this
library and SQL scripts. The SQL migrations are run on the startup
of the Node.js server. Only the scripts which have not yet been
applied are applied.

## Code organization

### Client-side (webapp/)

The client application application is divided in to subdirectories based on technical or
domain concepts. Here are some key diretories:

#### app

Contains the bootstrapping of the single-page application (routes,
fetching initial data etc)

#### userManagement

Managing and inviting users to a country.

#### assessmentFra

All the code to construct the views which are part of the FRA
assessment. For example: Extent of Forest, Growing Stock, ...

#### traditionalTable

Reusable framework for creating fixed-size, simple tables. Most of the
views (the simpler ones without charts and National Data Points) are created using this.

#### reusableUiComponents

Contains generic, reusable UI components which are used in many
places. For example a multi-select UI widget.

#### navigation

Contains the code needed to construct the navigation bar on the left.


### Server-side (server/)

Most of the server code is about reading data from and
writing data to database and converting that data between JSON and raw
query results or query parameters.

Separate domain concepts have separate *api* modules and *repository*
modules. For example, the _descriptions_ which are visible as MS
Word-like rich text editors in the UI, are stored and retrieved on the
server-side with these modules:

* `server/descriptions/api.js`
* `server/descriptions/decriptionsRepository.js`

![server-side-code-organization](img/server-side-code-organization.png)







