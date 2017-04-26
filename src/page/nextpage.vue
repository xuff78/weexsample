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
                target: '叫你乱点，看进入了异次元了',
                data:{}
            }
        },
        methods: {
            test(){
                modal.toast({ message: '点击', duration: 1 })
                this.target='我擦，还敢乱点'
                this.data={itemlist:[{imgl:11}, {imgl:22}, {imgl:33}, {imgl:44}]}
            }
        }
    }
</script>
<style>

</style>