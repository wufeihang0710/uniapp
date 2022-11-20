<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in imageList" :key="item.goods_id" class="imageSwiper">
        <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode="" style="width: 100%;"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类 -->
    <view class="nav">
      <view v-for="item in navList" :key="item">
        <image :src="item.image_src" @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i) in item.product_list" :key="i" v-if="i !== 0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>

        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        imageList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 3.2 请求失败
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.imageList = res.message
        console.log(res)
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // 3.2 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        console.log(res)
      },
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach((item)=>{
          item.product_list.forEach((item2)=>{
            item2.url = '/subpkg/goods_list/goods_list?' + item2.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
        console.log(res)
      }
    }

  }
</script>

<style lang="scss">
  .imageSwiper image {
    width: 100%;
    height: 330rpx;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    margin: 20rpx 0;

    image {
      width: 130rpx;
      height: 130rpx;
    }
  }

 
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }

    .floor-img-box {
      display: flex;
      justify-content: space-around;

      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .floor-img-box {
        display: flex;
        padding-left: 10rpx;
      }
    
  }
</style>
