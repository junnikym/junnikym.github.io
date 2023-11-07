<template>
  <div class="post-header">
    <div class="post-header-title-infos">
      <h3 class="post-header-title">{{title}}</h3>
      <div class="post-header-contents">
        {{preview}}
      </div>
    </div>
    <div class="post-header-additional-infos">
      <h1 class="post-header-number">#{{postNumber}}</h1>
      <div class="post-header-created-at">{{createdAt}}</div>
    </div>

    <div class="horizontal-dividing-line"></div>
    <div class="post-header-share">
      <a><span class='link-icon'></span></a>
      <div class="vertical-dividing-line"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PostHeader",

  props: {
    postNumber: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    preview: {
      type: String,
      default: null
    },
    createdAt: {
      type: String,
      default: null
    },
  },

};
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

* {
    margin: 0 auto;
    padding: 0;
}

.post-header {
  position: absolute;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  
  * {
    color: $main-color;
    opacity: 0.75;
  }

  color: $dark-color;

  .post-header-title-infos {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    .post-header-title {
      width: 100%;
      margin: 0 0 20px 0; padding: 0;
      font-size: 38px;
      font-weight: 800;
      text-shadow: -2px -2px 4px $shadow-white-color,  2px 2px 4px $shadow-dark-color;
    }
    .post-header-contents {
      width: 100%;
      margin: 0 0 20px 0; padding: 0;
      font-size: 18px;
    }
  }

  .post-header-additional-infos {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    .post-header-number {
      width: 100%;
      text-align: right;
      font-size: 100px;
      font-weight: 700;
      text-shadow: -2px -2px 4px $shadow-white-color,  2px 2px 4px $shadow-dark-color;
    }

    .post-header-created-at {
      width: 100%;
      text-align: right;
      font-weight: bold;
    }
  }

  .horizontal-dividing-line {
    width: 100%;
    height: 10px;
    margin: 25px 0px;
    border-radius: 5px;
    background-color: $main-color;
    box-shadow: -5px -5px 10px 5px $shadow-white-color,  5px 5px 10px 5px $shadow-dark-color;
  }

  .post-header-share {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 45px;
    width: calc(100% - 50px);
    padding: 10px 25px ;
    box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
    border-radius: 15px;
    
    > *:not(.vertical-dividing-line) {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      padding: 10px;

      box-shadow: -5px -5px 20px $shadow-white-color,  5px 5px 20px $shadow-dark-color;
      border-radius: 50%;

      &:hover {
        box-shadow: -2px -2px 5px $shadow-white-color, 2px 2px 5px $shadow-dark-color;
      }

      &:active {
        box-shadow: inset 1px 1px 2px $shadow-white-color, inset -1px -1px 2px $shadow-white-color;
      }
    }

    .vertical-dividing-line {
      padding: 0px;
      margin: 0px 15px;
      width: 2px;
      height: 70%;
      background-color: $main-color;
      box-shadow: -1px -1px 2px 1px $shadow-white-color,  1px 1px 2px 1px $shadow-dark-color;
      border-radius: 1px;
    }
  }
}
</style>
