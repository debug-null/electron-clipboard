<template>
  <div class="header-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="tab in tabArr"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <All />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import All from '@/components/all.vue';
require('@/electron/render-process/index.js');

export default {
  components: { All },
  data() {
    return {
      activeName: 'all',
      tabArr: [
        {
          name: 'all',
          label: '全部'
        },
        {
          name: 'pin',
          label: 'Pin'
        },
        {
          name: 'file',
          label: '文件'
        },
        {
          name: 'todo',
          label: 'Todo'
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
.header-container {
  color: #fff;
  /deep/ .el-tabs__item {
    color: #fff;
  }
}
</style>
