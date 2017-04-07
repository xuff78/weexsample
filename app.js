import vueRouter from 'vue-router'

Vue.use(vueRouter);

import routes from './src/web-router'
const router = new vueRouter({
    //mode: 'hash',
    routes
});

new Vue({el:'#root', router});