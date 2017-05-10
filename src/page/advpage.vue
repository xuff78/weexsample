<style src="../styles/main.css"></style>
<style>
    .headerstyle {
        height:90px;
        width: auto;
    }
    .slider {
        width: 750px;
        height: 340px;
        background-color: #ddd;
    }
    .courselayout{  flex-direction: row;flex-wrap: wrap;  align-items: center;position: relative; padding-left: 20px; padding-right: 20px; }
    .billboard{  flex-direction: column;flex-wrap: wrap;  align-items: center;position: relative; padding-left: 50px; padding-right: 30px; }
    .listitem{width:710px;padding-top: 15px;}
    .courseitem{width:355px;padding: 10px;}
    .courseimg{width: 335px; height: 180px;}
    .normaltext{font-size:26px;color:#666;margin-top:10px;}
    .normaltextright{font-size:26px;color:#666;margin-top:10px; align-self: flex-end;}
    .pricetxt{font-size:26px;color:#e12e2e;margin-top:10px; align-self: flex-end;}
    .titletxt{font-size:30px;color:#333;margin-top:10px;}
    .bannartxt{font-size:32px;color:#666;margin-top:20px; margin-bottom: 20px; margin-left: 30px;}
    .coursebottom{width: 335px; flex-direction: row; align-items: center; justify-content: space-between; padding-bottom: 15px;}
    .listitembottom{width: 690px; flex-direction: row; align-items: center; justify-content: space-between; padding-bottom: 15px;}
    .progressbar{border-color: #dfdfdf; border-radius: 5px; width: 580px; height: 16px; background-color: #dfdfdf;}
    .progress{border-color: #e12e2e; border-radius: 5px; width: 300px; height: 16px; background-color: #e12e2e;}
    .labeltxt{color: #fff; opacity: 0.65;position: absolute; top: 100px; left: 0px; padding-top: 5px; padding-left: 20px; padding-right: 20px; padding-bottom: 5px; background-color: #000;}
</style>
<template>
    <div style="padding-bottom: 20px">
        <myheader ref="myheader" class="headerstyle" :title="listdata.title"></myheader>
        <list class="list" loadmoreoffset="10">
            <cell class="cell">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="slider" v-for="item in imageList">
                        <image class="slider" resize="cover" :src="item.imgurl"></image>
                    </div>
                </slider>
            </cell>
            <cell class="cell" v-if="listdata.is_arrange==1">
                <text class="bannartxt" @click="jump('/testnext')">{{target}}</text>
                <div class="billboard" >
                    <div class="listitem" v-for="(item, index) in listdata.course_info" >
                        <div style="flex-direction: row; padding-bottom: 15px;" @click="toCoursePage(item.course_id, item.course_type)">
                            <text style="font-size: 30px; color: #e12e2e;">No.{{index+1}}</text>
                            <text style="font-size: 30px; margin-left: 25px;">{{item.course_name}}</text>
                        </div>
                        <div class="listitembottom" @click="toTeacherPage(item.usercode)">
                            <text class="normaltext">{{item.user_name}}</text>
                            <text class="normaltextright">{{item.follow}}人在学习</text>
                        </div>
                        <div class="listitembottom" @click="toTeacherPage(item.usercode)">
                            <div class="progressbar">
                                <div class="progress" :style="{ width: item.follow/follownum*580 + 'px' }"></div>
                            </div>
                            <text class="normaltextright">{{item.follow/follownum*100}}%</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell class="cell">
                <text class="bannartxt" >你要的好课，都在这里</text>
            </cell>
            <cell class="cell">
                <div class="courselayout">
                    <div class="courseitem" v-for="item in listdata.course_info" @click="toCoursePage(item.course_id, item.course_type)">
                        <div class="courseimg">
                            <image class="courseimg" resize="cover" style="position: absolute;"
                                   :src="imghead+item.img"/>
                            <text class="labeltxt">{{getCourseType(item.course_type)}}</text>
                        </div>
                        <text class="titletxt">{{item.course_name}}</text>
                        <text class="normaltext">{{item.user_name}}</text>
                        <div class="coursebottom">
                            <text class="normaltext">{{item.follow}}人报名</text>
                            <text class="pricetxt">{{item.price==0.00?'免费':item.price}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
    var urls=require('../../apiurl.js');
    var event = weex.requireModule('event')
    var modal = weex.requireModule('modal')
    var pageevent = weex.requireModule('pageevent')
    import mixins from '../mixins'
    import myheader from '../components/myheader.vue'

    export default {
        mixins:[mixins],
        components: {
            myheader
        },
        data: function(){
            return {
                imageList: [],
                target: '最受欢迎的课程评选',
                listdata:{},
                follownum: 1.00,
                imghead: urls.apiurl.imghttpurl,
                advert_id: ''
            }
        },
        methods: {
            toCoursePage(advert_id, type){
                pageevent.toCourseDetailPage({ advert_id: advert_id, type: type })
            },
            toTeacherPage(usercode){
                pageevent.toTeacherDetailPage({ usercode: usercode})
            },
            getCourseType: function (type) {
                var typestr=new String()
                switch (type){
                    case 1:
                        typestr='课件';
                        break;
                    case 2:
                        typestr='视频课';
                        break;
                    case 3:
                        typestr='直播课';
                        break;
                }
                return typestr
            },
            getAds(){
                //千万记得这句（先在外部声明),不能在回调中直接使用this.function(),不然不执行
                var self=this
                var eventModule = weex.requireModule('httpevent')
                var jsonStr = '{"url":"http://106.75.91.154:43330/education/homepage/advert", "params":[{"name":"advert_id", "value":"'+this.advert_id+'"}]}';
//                modal.toast({ message: 'jsonStr: '+jsonStr, duration: 1 })
                eventModule.requestHttp(jsonStr, ret=>{
                    //回调执行
                    var json=JSON.parse(ret.jsonData)
                    if (json.return_code==0) {
                        self.listdata = json.data
                        var topimage = {imgurl: urls.apiurl.imghttpurl + self.listdata.img}
                        self.imageList.push(topimage)
                        self.imageList.push(topimage)
//                        modal.toast({message: topimage, duration: 1})
                        var num = 0
                        for (var count = 0; count < self.listdata.course_info.length; count++) {
                            num = num + self.listdata.course_info[count].follow
                        }
                        self.follownum = num
                    }else{
                        modal.alert({
                            message: json.return_code+'\n\n'+json.return_message,
                            duration: 0.3
                        }, function (value) {
                            pageevent.closePage()
                        })
                    }
                });
            }
        },
        created: function() {
              this.advert_id = this.$getConfig().advert_id
//              modal.toast({ message: 'advert_id: '+this.advert_id, duration: 1 })
//              this.target=base .substring(0, base.lastIndexOf('/')+1)
              this.getAds()
         }
    }
</script>
