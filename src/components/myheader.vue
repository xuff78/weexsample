<template>
  <div class="row">
    <image :src="imageback" class="imgleft" @click="pageback"></image>
    <text class="text">{{title}}</text>
    <image :src="imageright" class="imgright"></image>
  </div>
</template>
<script>
    var urls=require('../../apiurl.js');
    var pageevent = weex.requireModule('pageevent')
    import mixins from '../mixins'
    export default {
        mixins:[mixins],
        props: {
            title: { default: '标题栏' },
            imageback: { default: urls.apiurl.imgurl+'icon_black_arrow_left.png' },
            imageright: { default: '' }
        },
        methods: {
            pageback: function (e) {
                pageevent.closePage()
            }
        }
    }
</script>
<style>
  .imgleft{
    width:90px;
    padding: 13px;
    height:90px;
  }
  .imgright{
    width:90px;
    padding: 13px;
    height:90px;
  }
  .text {
    font-size: 32px;
    color: #343434;
  }
  .row {
    position: relative;
    align-items:center;
    justify-content: space-between;
    flex-direction: row;
    height:90px;
    border-bottom-width: 1px;
    border-color: #C0C0C0;
  }
</style>