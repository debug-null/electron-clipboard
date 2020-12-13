<template>
  <div class="text-box-container">
    <div class="clipboard-box">
      <Editor v-for="(item, index) in content" :key="index" :content="item.content" @input="inputHandle">
        <div class="tag-box">
          <div class="icon">
            <i class="el-icon-platform-eleme"></i>
          </div>
          <div class="tag" @click="test">{{ item.application }}</div>
        </div>
      </Editor>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Editor from '@/components/common/editor';
import { setClipboard } from '@/utils/clipboard';
export default {
  name: 'TextBoxContainer',
  components: { Editor },
  data() {
    return {
      editVisible: false,
      areaHeight: 80 // textarea 输入框的高度
    };
  },
  computed: {
    ...mapState(['all']),
    ...mapGetters(['getOneCategory']),
    content() {
      return this.getOneCategory('text');
    }
  },
  mounted() {},

  methods: {
    ...mapActions({
      addAll: 'addAll'
    }),
    textAreaKeyUp(e) {
      console.log('🚀 ~ file: text-box.vue ~ line 48 ~ textAreaChange ~ e', e);
      console.log(e.target.scrollHeight);
      this.areaHeight = e.target.scrollHeight;
    },
    clickHandle(data) {
      console.log('🚀 ~ file: text-box.vue ~ line 44 ~ clickHandle ~ data', data);
      setClipboard('text', 'ddd');
    },

    inputHandle(data) {
      console.log('🚀 ~ file: text-box.vue ~ line 84 ~ inputHandle ~ data', data);
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
  }
}
</style>
