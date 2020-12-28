<template>
  <div class="edit-content-container" @dblclick="dbClickHandle" @click="setPaste(clipboardData.content)">
    <slot></slot>
    <div class="title-box" @click="clickTitle">
      {{ clipboardData.application }}
    </div>
    <div ref="rich" class="editor-box" :contenteditable="contenteditable" spellcheck="false" v-on="listener" @blur="blurHandle">
      {{ clipboardData.content }}
    </div>
  </div>
</template>
<script>
import { setClipboard } from '@/utils/clipboard.js';

export default {
  name: 'SimpleEditor',
  props: {
    // 类型
    contentType: {
      type: String,
      default: 'plain',
      validator(value) {
        return ['plain', 'html'].includes(value);
      }
    },
    clipboardData: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data() {
    return {
      contenteditable: false
    };
  },
  computed: {
    listener() {
      return Object.assign({}, this.$listeners, {
        input: function(e) {
          const inputContent = this.contentType === 'plain' ? e.target.textContent : e.target.innerHTML;
          this.$emit('input', inputContent);
        }.bind(this)
      });
    }
  },
  methods: {
    // 复制到粘贴板
    setPaste(content) {
      setClipboard('text', content);
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      });
    },
    dbClickHandle() {
      this.contenteditable = true;

      const rich = this.$refs.rich;
      setTimeout(() => {
        rich.focus();
      }, 0);
    },
    blurHandle(e) {
      this.contenteditable = false;
    },
    clickTitle() {
      this.$emit('clickTitle');
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-content-container {
  .title-box {
    text-align: left;
    margin-bottom: 8px;
    font-size: 20px;
    background-image: url('~@/assets/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: right;
    background-color: #ff5955;
    padding: 8px 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  cursor: pointer;
  background-color: #282c34;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
  &:hover {
    border-color: #fff;
    box-shadow: 0 1px 3px rgba(#fff, 0.3);
  }
  .editor-box {
    min-height: 30px;
    max-height: 70%;
    text-align: left;
    overflow-x: auto;
    cursor: text;
    outline: none;
    padding: 8px;
    white-space: break-spaces;
    word-break: break-word;
  }
}
</style>
