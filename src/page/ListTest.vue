<template>
 <div>
    <text style="padding: 20px" @click="test">测试一把</text>
 <list class="list" loadmoreoffset="10">
  <cell class="cell" v-for="num in lists">
   <div class="panel">
    <text class="text">{{num}}</text>
   </div>
  </cell>
 </list>
 </div>
</template>

<script>
    const modal = weex.requireModule('modal')
    const LOADMORE_COUNT = 4

    export default {
        data () {
            return {
                lists: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            test(){
                this.lists=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        }
    }
</script>

<style scoped>
 .panel {
  width: 600px;
  height: 250px;
  margin-left: 75px;
  margin-top: 35px;
  margin-bottom: 35px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
 }
 .text {
  font-size: 50px;
  text-align: center;
  color: #41B883;
 }
</style>