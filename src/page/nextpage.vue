<template>
    <div>
        <text style="padding: 20px" @click="test">Hello Weex!  {{target}}</text>
        <list class="list" loadmoreoffset="10">
            <cell class="cell">
                <div style="padding: 30px" v-for="imgss in data.itemlist">
                    <text>{{imgss.imgl}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>
<script>
    var urls=require('../../apiurl.js');
    var event = weex.requireModule('event')
    var modal = weex.requireModule('modal')
    import mixins from '../mixins'

    export default {
        mixins:[mixins],
        data: function(){
            return {
                target: '刷新之前',
                data:{}
            }
        },
        methods: {
            test(){
                modal.toast({ message: '点击', duration: 1 })
                this.target='刷新以后'
                this.data={itemlist:[{imgl:11}, {imgl:22}, {imgl:33}, {imgl:44}]}
            }
        }
    }
</script>
<style>

</style>