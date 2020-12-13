<template>
  <div class="edit-content-container" @dblclick="dbClickHandle">
    <div ref="rich" class="editor-box" :contenteditable="contenteditable" spellcheck="false" v-on="listener" @blur="blurHandle">
      {{ content }}
    </div>
    <slot></slot>
  </div>
</template>
<script>
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
    // 默认内容
    content: {
      type: String,
      default: ''
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
    dbClickHandle() {
      this.contenteditable = true;

      const rich = this.$refs.rich;
      setTimeout(() => {
        rich.focus();
      }, 0);
    },
    blurHandle(e) {
      this.contenteditable = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-content-container {
  cursor: pointer;
  border: 1px solid #6e7681;
  padding: 10px;
  background-color: #30363d;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  &:hover {
    border-color: #fff;
    box-shadow: 0 1px 3px rgba(#fff, 0.3);
  }
  .editor-box {
    min-height: 30px;
    text-align: left;
    border-bottom: 1px dotted #fff;
    cursor: text;
    outline: none;
  }
}
</style>
