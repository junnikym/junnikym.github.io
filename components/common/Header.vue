<template>
  <div class="header">
    <a class="header-home-btn blog-icon" href="/"><div class="header-home-btn-shadow blog-icon"></div></a>
  </div>
</template>

<script>
import axios from "axios";

const username = "junnikym";
const repo = "blog-post";

export default {
  name: "Header",

  methods: {

  },
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

  .header-home-btn {
    margin: 0 20px;
    width: 56px;
    height: 34px;
    filter: invert(100%);
    transition: all ease-in-out 100ms;
    z-index: 2;
    
    &:hover {
      transform: translate(-2.25px, -2.25px) scale(1.05);
    }
    &:active {
      transform: translate(-1.25px, -1.25px) scale(0.95);
    }

    .header-home-btn-shadow {
      width: 100%;
      height: 100%;
      z-index: 1;
      filter: opacity(25%);
      transition: all ease-in-out 100ms;
      
      &:hover {
        transform: translate(2.25px, 2.25px) scale(1.05);
      }
      &:active {
        transform: translate(1.25px, 1.25px) scale(0.95);
      }
    }
    
  }
}

</style>
