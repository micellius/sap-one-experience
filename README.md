![SAP](public/images/shared/logo.png) SAP One Experience [![Node Dependencies](https://david-dm.org/micellius/sap-one-experience.png)](https://david-dm.org/micellius/sap-one-experience) [![Build Status: Linux](https://travis-ci.org/micellius/sap-one-experience.png?branch=master)](https://travis-ci.org/micellius/sap-one-experience)
==================

> SAP One Experience is a concept project that aims to define new user experience unifying multiple products developed by SAP.

## Getting Started

In order to run SAP One Experience on your local environment the following steps should be performed:

* Install prerequisite tools:
  * Install [Git](http://git-scm.com/downloads)
  * Install [NodeJS](http://nodejs.org/)
  * Install [Bower](http://bower.io/) `npm install -g bower`
  * Install [Grunt](http://gruntjs.com/) `npm install -g grunt-cli`
* Clone repository `git clone https://github.com/micellius/sap-one-experience.git`
* Change current directory to project's root directory `cd sap-one-experience`
* Install server-side dependencies `npm install`
* Install clent-side dependencies `bower install`

## How To Use

There are two options of how to run the project:

* Using NodeJS - full featured with backend connectivity options
  * Run server `node app.js --dev --mock` (for help regarding options run `node app.js --help` instead)
  * Open Chrome and type `http://localhost:3000/` in the address bar
* Using any other web server (Apache httpd, Tomcat, etc.) - limited to work with mock data only
  * Run build to generate standalone version `grunt` - after build is finished, there will be a `dist` folder in the project's root folder
  * Copy contents of the `dist` folder to the path that may be served by web server
  * Open Chrome and enter host, port and path to `index.html` on the server

There is also a standalone version available on [http://micellius.github.io/sap-one-experience](http://micellius.github.io/sap-one-experience)

