var tmplEngine = require('art-template'),
    fs = require('fs');


module.exports = exports = function(arg){
    try{
        var tmpl = fs.readFileSync(__dirname + '/templates/less.tmpl').toString();
        return tmplEngine('less', tmpl)(arg);
    } catch(err){
        console.error(err.message);
    }
};