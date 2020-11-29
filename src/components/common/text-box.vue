<template>
  <div class="text-box-container">
    <div class="clipboard-box">
      <div class="board-item">
        <div class="content">
          ng: LF will be replaced by CRLF in package.json. The file will have
          its original line endings in your working directory warning: LF will
          be replaced by CRLF in src/App.vue. The file will have its original
          line endings in your working directory warning: LF will be repla
        </div>
        <div class="tag-box">
          <div class="icon">
            <i class="el-icon-platform-eleme"></i>
          </div>
          <div class="tag">Electron</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "textBoxContainer",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.text-box-container {
  .clipboard-box {
    cursor: pointer;
    margin-top: 10px;
    .board-item {
      padding: 10px;
      border: 1px solid #17191e;
      border-radius: 4px;
      box-shadow: 1px;
      color: #98a0af;
      text-align: left;
      .tag-box {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .icon {
          margin-right: 4px;
        }
        .tag {
          font-size: 14px;
        }
      }
      &:hover {
        border-color: #fff;
      }
    }
  }
}
</style>
