/**
 * Created by zhouz on 2017/2/12.
 */
var baseUrl = require('../apiurl.js');
export default [
    {path:'/',component:baseUrl.apiurl.pageurl+'/advpage.js'},
    { path: '/testnext', component: baseUrl.apiurl.pageurl+'/nextpage.js' },
    {path:'/listtest',component:baseUrl.apiurl.pageurl+'/ListTest.js'}
];