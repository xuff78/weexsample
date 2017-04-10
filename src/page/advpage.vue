<template>
    <div>
        <myheader ref="myheader" class="headerstyle" :title="jsonData.data.title"></myheader>
        <list class="list" @loadmore="fetch" loadmoreoffset="10">
            <cell class="cell">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="slider" v-for="img in imageList">
                        <image class="slider" resize="cover" :src="img.url"></image>
                    </div>
                </slider>
            </cell>
            <cell class="cell">
                <text class="bannartxt" @click="getAds">你要的好课，都在这里</text>
            </cell>
            <cell class="cell">
                <div class="courselayout">
                    <div class="courseitem" v-for="item in jsonData.data.course_info">
                        <image class="courseimg" resize="cover"
                               :src="imghead+item.img"/>
                        <text class="titletxt">{{item.course_name}}</text>
                        <text class="normaltext">{{item.user_name}}</text>
                        <div class="coursebottom">
                            <text class="normaltext">{{item.follow}}人报名</text>
                            <text class="normaltextright">{{item.price}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
    var urls=require('../../apiurl.js');
    import mixins from '../mixins'
    var event = weex.requireModule('event')
    var modal = weex.requireModule('modal')
    import myheader from '../components/myheader.vue'

    module.exports = {
        mixins:[mixins],
        components: {
            myheader
        },
        data: function(){
            return {
                imageList: [{url:urls.apiurl.imgurl+'icon_black_arrow_left.png'}, {url:urls.apiurl.imgurl+'icon_black_arrow_left.png'}],
                target: 'next url',
                jsonData:{},
                imghead: urls.apiurl.imghttpurl
            }
        },
        methods: {
            update: function (e) {
//                event.openURL(this.target+'nextpage.js')
            },
            getAds : function(e){
                //千万记得这句（先在外部声明),不能在回调中直接使用this.function(),不然不执行
                var self = this
                var eventModule = weex.requireModule('httpevent')
                eventModule.requestHttp('jsonStr',function(ret) {
                    //回调执行
//                    self.update(ret.result)
                    self.jsonData=JSON.parse(ret.jsonData)
                    self.imageList.push(urls.apiurl.imghttpurl+self.jsonData.data.img)
                    modal.toast({ message: ret.jsonData })
                });
            }
        },
        created: function() {
              var base = this.$getConfig().bundleUrl
              this.target=base .substring(0, base.lastIndexOf('/')+1)
              this.getAds()
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
    .courselayout{  flex-direction: row;flex-wrap: wrap;  align-items: center;position: relative; padding-left: 20px; padding-right: 20px; }
    .courseitem{width:355px;padding: 10px;}
    .courseimg{width: 335px; height: 160px;}
    .normaltext{font-size:26px;color:#666;margin-top:10px;}
    .normaltextright{font-size:26px;color:#666;margin-top:10px; align-self: flex-end;}
    .titletxt{font-size:30px;color:#333;margin-top:10px;}
    .bannartxt{font-size:32px;color:#666;margin-top:20px; margin-bottom: 20px; margin-left: 30px;}
    .coursebottom{width: 335px; flex-direction: row;  justify-content: space-between; padding-bottom: 15px;}
</style>
