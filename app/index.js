'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var LbfAppGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');
    },

    askFor: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous LBF App generator!'));

        var prompts = [
            {
                type: 'input',
                name: 'appname',
                message: 'What\'s the name of the app?',
                default: 'test'
            },
            {
                type: 'input',
                name: 'author',
                message: 'Who are you(author)?',
                default: false
            },
            {
                type: 'input',
                name: 'version',
                message: 'What\'s the version?',
                default: '0.0.0'
            },
            {
                type: 'input',
                name: 'dm',
                message: 'What\'s the domain?',
                default: 'qiye.qq.com'
            }
        ];

        this.prompt(prompts, function (props) {
            var yo = this;

            prompts.forEach(function(def){
                yo[def.name] = props[def.name];
            });

            done();
        }.bind(this));
    },

    app: function () {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_Gruntfile.js', 'Gruntfile.js');

        this.directory('dirTemplate', './');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    },

    install: function(){
        this.on('end', function () {
            if (!this.options['skip-install']) {
//                this.installDependencies();
            }
        });
    }
});

module.exports = LbfAppGenerator;
