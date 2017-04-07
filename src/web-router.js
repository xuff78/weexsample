/**
 * Created by ebi on 2017/2/8.
 */

import advpage from './page/advpage.vue'
import nextpage from './page/nextpage.vue'

// const detail = resolve => require(['./pages/product/detail.vue'], resolve);

const routes = [
    { path: '/', component: advpage },
    { path: '/testnext', component: nextpage }
    /*{ path: '/list/:id', component: list },
    { path: '/product/:id', component: detail }*/
];
export default routes