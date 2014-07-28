/**
 * Created by amos on 14-5-12.
 */
module.exports = function(obj){
    return '\'' + JSON.stringify(obj, replacer) + '\'';
};

function replacer(key, value){
    var RE = /[& <>'"\/\\]/;

    return typeof value === 'string' && RE.test(value) ?
            value
                .replace(/&/g, '\\u0026')
                .replace(/</g, '\\u003c')
                .replace(/>/g, '\\u003e')
                .replace(/'/g, '\\u0027')
                .replace(/"/g, '\\u0022')
                .replace(/ /g, '\\u0020')
                .replace(/=/g, '\\u003d')
                .replace(/`/g, '\\u0060')

            : value;
};