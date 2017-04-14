<template>
    <div>
        <myheader ref="myheader" class="headerstyle" :title="jsonData.data.title"></myheader>
        <list class="list" @loadmore="fetch" loadmoreoffset="10">
            <refresh class="refresh-view" @refresh="onrefresh" :display="refreshing">
                <loading-indicator class="indicator" ></loading-indicator>
            </refresh>
            <cell class="cell">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="slider" v-for="img in imageList">
                        <image class="slider" resize="cover" :src="img.url"></image>
                    </div>
                </slider>
            </cell>
            <cell class="cell">
                <text class="bannartxt">最受欢迎的课程评选</text>
                <div class="billboard">
                    <div class="listitem" v-for="(item, index) in jsonData.data.course_info">
                        <div style="flex-direction: row; padding-bottom: 15px;">
                            <text style="font-size: 30px; color: #e12e2e;">No.{{index+1}}</text>
                            <text style="font-size: 30px; margin-left: 25px;">{{item.course_name}}</text>
                        </div>
                        <div class="listitembottom">
                            <text class="normaltext">{{item.user_name}}</text>
                            <text class="normaltextright">{{item.follow}}人在学习</text>
                        </div>
                        <div class="listitembottom">
                            <div class="progressbar">
                                <div class="progress"></div>
                            </div>
                            <text class="normaltextright">37%</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell class="cell">
                <text class="bannartxt">你要的好课，都在这里</text>
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
                refreshing: 'hide',
                refresh: '下拉刷新',
                imageList: [],
                target: 'next url',
                jsonData:{},
                imghead: urls.apiurl.imghttpurl
            }
        },
        methods: {
            onrefresh (event) {
                this.refreshing = 'show'
                var self=this;
                self.getAds();
                setTimeout(function () {
                    modal.toast({ message: 'pulling down finish', duration: 1 })
                    self.refreshing = 'hide'
                }, 2000)
//                self.refreshing = 'hide'
            },
            getAds : function(e){
                //千万记得这句（先在外部声明),不能在回调中直接使用this.function(),不然不执行
                var self = this
                var eventModule = weex.requireModule('httpevent')
                eventModule.requestHttp('jsonStr',function(ret) {
                    //回调执行
                    self.jsonData=JSON.parse(ret.jsonData)
                    var topimage={url: urls.apiurl.imghttpurl+self.jsonData.data.img}
                    self.imageList.push(topimage)
                    self.imageList.push(topimage)
//                    modal.toast({ message: ret.jsondata })
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
    .indicator{
        margin-top: 20px;
        margin-bottom: 20px;
        width:60px;
        height:60px;
        color:#889967;
    }
    .refresh-view{
        width:750px;
        align-items:center;
    }
    .courselayout{  flex-direction: row;flex-wrap: wrap;  align-items: center;position: relative; padding-left: 20px; padding-right: 20px; }
    .billboard{  flex-direction: column;flex-wrap: wrap;  align-items: center;position: relative; padding-left: 50px; padding-right: 30px; }
    .listitem{width:710px;padding-top: 15px;}
    .courseitem{width:355px;padding: 10px;}
    .courseimg{width: 335px; height: 160px;}
    .normaltext{font-size:26px;color:#666;margin-top:10px;}
    .normaltextright{font-size:26px;color:#666;margin-top:10px; align-self: flex-end;}
    .titletxt{font-size:30px;color:#333;margin-top:10px;}
    .bannartxt{font-size:32px;color:#666;margin-top:20px; margin-bottom: 20px; margin-left: 30px;}
    .coursebottom{width: 335px; flex-direction: row; align-items: center; justify-content: space-between; padding-bottom: 15px;}
    .listitembottom{width: 690px; flex-direction: row; align-items: center; justify-content: space-between; padding-bottom: 15px;}
    .progressbar{border-color: #dfdfdf; border-radius: 5px; width: 580px; height: 16px; background-color: #dfdfdf;}
    .progress{border-color: #e12e2e; border-radius: 5px; width: 300px; height: 16px; background-color: #e12e2e;}
</style>
