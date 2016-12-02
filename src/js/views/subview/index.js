import Vue from 'vue';
import html from './index.pug';
import './index.css';
import {sleep} from '/utils';

export default Vue.extend({
    data() {
        return { 
            list: [ ],
        };
    },
    template: html,
    mounted() {
        this.run();
    },
    methods: {
        async run() {
            while (true) {
                const res = await sleep();
                this.list.push(res);
            }
        },
    },
});
