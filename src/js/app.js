// For async, generators ...
import 'babel-polyfill';

import Vue from 'vue'; 
import _ from 'lodash';
import subview from './views/subview';

// Vue root
new Vue({
    el: '#root',
    components: {
        'app': subview,
    },
});
