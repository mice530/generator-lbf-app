# generator-lbf-app [![Build Status](https://secure.travis-ci.org/mice530/generator-lbf-app.png?branch=master)](https://travis-ci.org/mice530/generator-lbf-app)

> [Yeoman](http://yeoman.io) generator for [LBF](http://lbf.epc.oa.com) app - lets you quickly set up a project with sensible defaults and best practices.


## Usage

Install [node.js](http://nodejs.org) first.

Install [Yeoman](http://yeoman.io) with [npm](http://npmjs.org):
```bash
$ npm install -g yo
```

Setup registry:
```bash
$ npm config set registry http://npm.oa.com
```

Make a new directory, and enter into it:
```bash
$ mkdir my-new-project && cd $_
```

Run yo lbf-app, optionally passing an app name:
```bash
$ yo lbf-app [app-name]
```

Run grunt for development integration:
```bash
$ grunt dev
```
And for mac os:
```bash
$ sudo grunt dev
```

## Getting To Know LBF App Generator

LBF App Generator is a integrated solution for creating and developing LBF app which uses Yeoman as base:
 * yo - scaffolding tool
 * bower - the client-side package management tool
 * grunt - the IDE and build tool.

 Welcome to an **industrial workspace** for front-end!

## License

MIT
