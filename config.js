const path = require('path');
const CONFIG = {
    src: {
        base: 'src/',
        pug: 'pug/**/*.pug',
        js: 'js/**/*.*',
    },
    dist: {
        base: 'dist/',
    },
    entry: {
        pug: 'src/pug/index.pug',
        js: 'src/js/app.js',
    },
    libs: [
        'node_modules/jquery/dist/jquery.min.js',
    ],
};

((...args) => {
    for (let obj of args) {
        for (let x in obj) {
            if (x == 'base') continue;
            obj[x] = path.join(obj.base, obj[x])
        }
    }
})(CONFIG.src);

module.exports = CONFIG;
