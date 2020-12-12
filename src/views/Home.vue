<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
import Header from './header';

export default {
  name: 'Home',
  components: { Header }
};
</script>
<style lang="scss" scoped>
.home {
  background-color: $bgColor;
  padding: 20px;
  height: 100vh;
}
</style>
