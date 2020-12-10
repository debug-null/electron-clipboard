<template>
  <div class="text-box-container">
    <div class="clipboard-box">
      <div class="board-item" v-for="(item, index) in content" :key="index">
        <div class="content">
          {{ item.content }}
        </div>
        <div class="tag-box">
          <div class="icon">
            <i class="el-icon-platform-eleme"></i>
          </div>
          <div class="tag" @click="test">{{ item.tag }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "textBoxContainer",
  computed: {
    ...mapState(["all"]),
    ...mapGetters(["getOneCategory"]),
    content() {
      return this.getOneCategory("text");
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapActions({
      addAll: "addAll"
    }),
    test() {
      this.addAll({
        category: "all222",
        type: "text",
        content: Math.random(),
        icon: "didi",
        tag: "钉钉",
        aplication: "app"
      });
    }
  }
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
