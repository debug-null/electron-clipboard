<template>
  <div class="horizontal-container">
    <div class="type-box">
      <div class="type-item search-box-content">
        <div :class="{ 'search-box': true, 'search-box-animation': searchAnimation }" @mouseenter="mouseenterHandle" @mouseleave="mouseleaveHandle">
          <i class="el-icon-search" @click="searchVisible = true"></i>
          <input v-model="searchVal" type="text" @keyup="search" />
        </div>
      </div>
      <div class="type-item active">
        剪贴板历史
      </div>
      <div class="type-item">
        实用链接
      </div>
    </div>
    <div ref="scroll" class="scroll-wrapper">
      <div class="scroll-content">
        <div class="clipboard-box">
          <Editor v-for="(item, index) in content" :key="index" :clipboard-data="item" class="scroll-item" @input="inputHandle" @clickTitle="clickTitle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
require('@/electron/render-process/index.js');
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
BScroll.use(MouseWheel);

import { mapState, mapGetters, mapActions } from 'vuex';
import Editor from '@/components/common/editor';
import {debounce} from '@/utils/index';

export default {
  name: 'Section',
  components: {Editor},
  data () {
    return {
      searchVal: '',
      searchVisible: false,
      searchResult: null,
      searchAnimation: false,
      bs: null
    };
  },
  computed: {
    ...mapState(['all']),
    ...mapGetters(['getOneCategory']),
    content() {
      return this.searchResult || this.getOneCategory('text');
    }
  },
  mounted() {
    this.$db.all('select * from paste_con order by id desc limit 10').then(res => {
      console.log('🚀 ~ file: section.vue ~ line 50 ~ this.$db.all ~ res', res);
      this.initAll(res);
    });
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    ...mapActions({
      initAll: 'initAll',
      addAll: 'addAll'
    }),
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3, // listening scroll hook
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      });
      this._registerHooks(['scroll', 'scrollEnd'], (pos) => {
        console.log('done');
      });
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler);
      });
    },
    inputHandle(data) {
      console.log('🚀 ~ file: text-box.vue ~ line 84 ~ inputHandle ~ data', data);
    },
    mouseenterHandle() {
      this.searchAnimation = true;
    },
    mouseleaveHandle() {
      if (this.searchVal) {
        this.searchAnimation = true;
      } else {
        this.searchAnimation = false;
      }
    },
    search: debounce(function() {
      this.$db.all(`select * from paste_con where content like '%${this.searchVal}%'`).then(res => {
        this.searchResult = res;
      });
    }, 100),
    clickTitle() {
      this.addAll({
        id: Math.random(),
        category: 'all222',
        type: 'text',
        content: Math.random() + 'test',
        icon: 'didi',
        tag: '钉钉',
        application: 'app'
      });
      this.bs.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
.horizontal-container {
  .type-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    height: 62px;
    .type-item {
      cursor: pointer;
      font-size: 14px;
      margin-right: 8px;
      border-radius: 4px;
      &.active {
        background-color: #46464e;
      }
      &:hover {
        background-color: #46464e;
      }
    }
  }
  .scroll-wrapper {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    .scroll-content {
      display: inline-block;
      padding: 10px;
      .scroll-item {
        width: 300px;
        height: 240px;
        font-size: 24px;
        display: inline-block;
        text-align: center;
        vertical-align: top;
      }
    }
  }

  .search-box-content {
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: initial !important;
    }
    .search-box {
      border-radius: 10px;
      background-color: #2f495e;
      padding: 4px 6px;
      display: flex;
      justify-items: center;
      align-items: center;

      input {
        width: 0;
        border: none;
        padding: 0;
        color: #fff;
        background-color: transparent;
        transition: all 0.5s ease;
        &:focus {
          outline: none;
        }
      }
    }
    .search-box-animation {
      input {
        width: 180px;
      }
      i {
        margin-right: 8px;
      }
    }
  }
}
</style>
