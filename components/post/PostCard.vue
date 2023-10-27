<template>
  <div class="post-card" @click.prevent="goToPost()">
    <div v-if="isImageMode()" class="post-card-visual-infos">
      <div class="post-card-image-outer-frame">
        <div class="post-card-image-inner-frame">
          <img v-if="imageUrl" :src="imageUrl" :height="getImageSize()"/>
          <div v-else style="width: 100%; height: 100%;">
            <div class="post-card-number">#{{number}}</div>
            <div class="post-card-created-at">{{createdAt}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="post-card-text-infos">
      <h1 class="post-card-number">#{{number}}</h1>
      <h2 class="post-card-title">{{title}}</h2>
      <div class="post-card-contents">
        {{preview}}
      </div>
      <div class="post-card-created-at">{{createdAt}}</div>
    </div>

    <div class="horizontal-dividing-line"></div>
  </div>
</template>

<script>

export default {
  name: "PostCard",

  props: {
    number: Number,
    title: String,
    preview: String,
    imageUrl: String,
    imageSize: Number,
    createdAt: String,
  },

  methods: {
    isImageMode() {
      return window.innerWidth > 880
    },
    getImageSize() {
      return (this.imageSize?this.imageSize:100)+"%";
    },

    goToPost() {
      this.$router.push(`/post/${this.number}`)
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/post/PostVariables.scss";

$post-card-border-radius: 5px;
$post-card-content-ratio: 3/4;

.post-card {
  position: relative;

  min-height: 105px;
  padding: 20px;
  margin: 40px;
  margin-top: 40px;
  margin-bottom: 60px;

  border-radius: 15px;
  background-color: $lighter-color;
  text-shadow: 1px 1px 0 $shadow-white-color;

  box-shadow: -5px -5px 20px $shadow-white-color,  5px 5px 20px $shadow-dark-color;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    box-shadow: -2px -2px 5px $shadow-white-color, 2px 2px 5px $shadow-dark-color;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $shadow-white-color, inset -1px -1px 2px $shadow-white-color;
  }

  color: $dark-color;

  overflow: hidden;

  * {
    margin: 0;
    padding: 0;
  }

  .horizontal-dividing-line {
    display: none;
  }

  @media (max-width: $small-mode-width) {
    margin: 0;
    border-radius: 0;
    box-shadow: none;

    overflow: visible;
    .horizontal-dividing-line {
      position: absolute;
      display: block;
      bottom: -2px;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      height: 5px;
      margin: 0px;
      border-radius: 2px;
      background-color: $light-color;
      box-shadow: -5px -5px 10px 5px $shadow-white-color,  5px 5px 10px 5px $shadow-dark-color;
    }

    box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;

    &:hover {
      box-shadow: inset 4px 4px 16px $shadow-dark-color, inset -4px -4px 16px $shadow-white-color;
    }

    &:active {
      box-shadow: inset 6px 6px 24px $shadow-dark-color, inset -6px -6px 20px $shadow-white-color;
    }

    // &:nth-child(1) {
    //   box-shadow: inset 10px 10px 8px -8px $shadow-dark-color, inset -10px 0px 8px -8px $shadow-white-color;

    //   &:hover {
    //     box-shadow: inset 20px 20px 16px -16px $shadow-dark-color, inset -20px 0px 16px -16px $shadow-white-color;
    //   }

    //   &:active {
    //     box-shadow: inset 30px 30px 24px -24px $shadow-dark-color, inset -30px 0px 24px -24px $shadow-white-color;
    //   }
    // }

    // &:nth-last-child(1) {
    //   box-shadow: inset 10px 0px 8px -8px $shadow-dark-color, inset -10px -10px 8px -8px $shadow-white-color;

    //   &:hover {
    //     box-shadow: inset 20px 0px 16px -16px $shadow-dark-color, inset -20px -20px 16px -16px $shadow-white-color;
    //   }

    //   &:active {
    //     box-shadow: inset 30px 0px 24px -24px $shadow-dark-color, inset -30px -30px 24px -24px $shadow-white-color;
    //   }
    // }

    &:nth-child(1) {
      border-radius: 15px 15px 0 0;
    }

    &:nth-last-child(1) {
      border-radius: 0 0 15px 15px;
      .horizontal-dividing-line {
        display: none;
      }
    }
  }

  .post-card-visual-infos {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    .post-card-image-outer-frame {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      width: 85%;
      padding-bottom: 85%;
      box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
      transition: all 0.2s ease-in-out;
      border-radius: 50%;

      &:hover {
        box-shadow: inset 1px 1px 3px $shadow-dark-color, inset -1px -1px 3px $shadow-white-color;
      }

      &:active {
        box-shadow: inset -1px -1px 2px $shadow-dark-color, inset 1px 1px 2px $shadow-white-color;
      }

      .post-card-image-inner-frame {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 25px;
        width: calc(100% - 25px * 2);
        height: calc(100% - 25px * 2);
        box-shadow: -2px -2px 8px $shadow-white-color, 2px 2px 8px $shadow-dark-color;
        transition: all 0.2s ease-in-out;
        border-radius: 50%;
        overflow: hidden;

        &:hover {
          box-shadow: -1px -1px 3px $shadow-white-color, 1px 1px 3px $shadow-dark-color;
        }

        &:active {
          box-shadow: -1px -1px 2px $shadow-white-color, 1px 1px 2px $shadow-dark-color;
        }

        img {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .post-card-number {
          position: absolute;
          text-align: center;
          width: 100%;
          top: calc(50% - 25px);
          transform: translateY(-50%);
          font-size: 100px;
          color: $less-light-color;

          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none
        }

        .post-card-created-at {
          position: absolute;
          text-align: center;
          width: 100%;
          top: calc(50% + 50px);
          transform: translateY(-50%);
          font-size: 18px;
          font-weight: bold;
          color: $less-light-color;

          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none
        }
      }
    }
  }

  .post-card-text-infos {
    position: relative;
    width: 100%;
    height: 135px;

    .post-card-image {
      position: relative;
      width: 80%;
    }

    .post-card-number {
      position: absolute;
      top: -15px; right: 30px;
      font-size: 100px;

      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none
    }

    .post-card-title {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .post-card-contents {
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    .post-card-number, .post-card-created-at {
      color: white;
      text-shadow: $less-light-color 2px 2px;
      opacity: 0.25;
    }
    .post-card-title, .post-card-contents  {
      color: $darkest-color;
      opacity: 0.7;
    }

    .post-card-created-at {
      position: absolute;
      font-weight: bold;
      bottom: 5px;
      right: 20px;
    }
  }

}
</style>
