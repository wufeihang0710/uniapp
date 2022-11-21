<template>
  <view class="scroll-view-container">
    <!-- 左侧滑动区域 -->
    <scroll-view scroll-y class="left-scroll-view" :style="{height: wh + 'px'}">
      <view v-for="(item,index) in cateList" :key="item.cat_id" :class="{active:index===active}"
        @click="changeCur(index)">{{item.cat_name}}
      </view>
    </scroll-view>
    <!-- 右侧滑动区域 -->
    <scroll-view scroll-y class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
      <view v-for="item in cateList2" :key="item.cat_id">
        <p>{{item.cat_name}}</p>
        <view class="rightImg">
          <view class="rightImgList" v-for="item2 in item.children" :key="item2" @click="goShopList(item2)">
            <image :src="item2.cat_icon" mode="widthFix"></image>
            <span>{{item2.cat_name}}</span>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        active: 0,
        scrollTop:0,
        cateList: [],
        cateList2: []
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateList2 = res.message[0].children
        console.log(res)
      },
      changeCur(index) {
        this.active = index
        this.cateList2=this.cateList[index].children
        console.log( this.scrollTop)
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      goShopList(item2){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item2.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;
    justify-content: space-between;

    .left-scroll-view {
      width: 300rpx;
      text-align: center;

      view {
        padding: 36rpx;
        font-size: 28rpx;
        background-color: #e1e1dc;
        position: relative;
      }

      .active {
        background-color: #fff !important;

        &::before {
          content: ' ';
          display: block;
          width: 7rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .right-scroll-view {
      p {
        width: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 30rpx;
        padding-top: 10rpx;
      }

      .rightImg {
        display: flex;
        flex-wrap: wrap;

        .rightImgList {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 25rpx;

          image {
            width: 130rpx;
          }

          span {
            font-size: 27rpx;
          }
        }

      }
    }
  }
</style>
