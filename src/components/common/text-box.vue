<template>
  <div class="text-box-container">
    <div class="clipboard-box">
      <div v-for="(item, index) in content" :key="index" class="board-item" @click="clickHandle(item)" @dblclick="dbClickHandle(item)">
        <div v-if="item.editVisible" class="edit-content">
          <textarea v-model="item.content" class="content-textarea"></textarea>
        </div>
        <div v-else class="content">
          {{ item.content }}
        </div>
        <div class="tag-box">
          <div class="icon">
            <i class="el-icon-platform-eleme"></i>
          </div>
          <div class="tag" @click="test">{{ item.application }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { setClipboard } from '@/utils/clipboard';
export default {
  name: 'TextBoxContainer',
  data() {
    return {
      editVisible: false
    };
  },
  computed: {
    ...mapState(['all']),
    ...mapGetters(['getOneCategory']),
    content() {
      return this.getOneCategory('text');
    }
  },

  methods: {
    ...mapActions({
      addAll: 'addAll'
    }),
    clickHandle(data) {
      console.log('🚀 ~ file: text-box.vue ~ line 44 ~ clickHandle ~ data', data);
      setClipboard('text', 'ddd');
    },
    dbClickHandle(data) {
      console.log('🚀 ~ file: text-box.vue ~ line 48 ~ dbClickHandle ~ data', data);
      this.$set(data, 'editVisible', true);
      this.content.forEach(item => {
        this.$set(item, 'editVisible', false);
        if (item.id === data.id) {
          this.$set(item, 'editVisible', true);
        }
      });
    },
    test() {
      this.addAll({
        id: Math.random(),
        category: 'all222',
        type: 'text',
        content: Math.random() + 'test',
        icon: 'didi',
        tag: '钉钉',
        aplication: 'app'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.text-box-container {
  .clipboard-box {
    cursor: pointer;
    .board-item {
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #17191e;
      border-radius: 4px;
      box-shadow: 1px;
      color: #98a0af;
      text-align: left;
      .content {
        max-height: 300px;
        overflow: auto;
      }
      .edit-content {
        .content-textarea {
          border: none;
          resize: none;
          width: 100%;
          height: 100%;
        }
      }
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
