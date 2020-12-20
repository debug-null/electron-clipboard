<template>
  <div class="home">
    <Section />
  </div>
</template>

<script>
import Section from './section';

export default {
  name: 'Home',
  components: { Section }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: $bgColor;
  height: 100vh;
}
</style>
