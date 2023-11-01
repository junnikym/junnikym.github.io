<template>
  <div class="header">
    <HomeButton class="home-btn"/>
  </div>
</template>

<script>
import HomeButton from "@/components/common/HomeButton.vue";

export default {
  name: "Header",
  components: { HomeButton },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

.header {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0; left: 0;
  width: 100vw;
  height: 62px;
  background-color: $main-color;

  .home-btn {
    width: 56px;
    height: 34px;
  }
}

</style>
