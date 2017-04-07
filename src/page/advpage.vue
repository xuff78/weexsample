<template>
    <div>
        <myheader ref="myheader" class="headerstyle" title="传入的title"></myheader>
        <list class="list" @loadmore="fetch" loadmoreoffset="10">
            <cell class="cell">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="slider" v-for="img in imageList">
                        <image class="slider" resize="cover" :src="img.url"></image>
                    </div>
                </slider>
            </cell>
        </list>
    </div>
</template>

<script>
    var urls=require('../../apiurl.js');
    import mixins from '../mixins'
    var event = weex.requireModule('event')
    import myheader from '../components/myheader.vue'

    module.exports = {
        mixins:[mixins],
        components: {
            myheader
        },
        data: function(){
            return {
                imageList: [{url:urls.apiurl.imgurl+'icon_black_arrow_left.png'}, {url:urls.apiurl.imgurl+'icon_black_arrow_left.png'}],
                target: 'next url'
            }
        },
        methods: {
            update: function (e) {
                event.openURL(this.target+'nextpage.js')
                console.log('target:', this.target)
            }
        },
        created: function() {
              var base = this.$getConfig().bundleUrl
              this.target=base .substring(0, base.lastIndexOf('/')+1)
         }
    }
</script>
<style src="../styles/main.css"></style>
<style>
    .headerstyle {
        height:90px;
        width: auto;
    }
    .slider {
        width: 750px;
        height: 400px;
        background-color: #ddd;
    }
</style>
