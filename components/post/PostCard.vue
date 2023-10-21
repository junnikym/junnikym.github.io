<template>
  <div class="post-card" @click.prevent="goToPost()">
    <div class="post-card-visual-infos">
      <div class="post-card-image-outer-frame">
        <div class="post-card-image-inner-frame">
          <img v-if="imageUrl" :src="imageUrl" />
          <div v-else>
            <h1 class="post-card-number">#{{number}}</h1>
            <div class="post-card-created-at">{{createdAt}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="post-card-text-infos">
      <h1 class="post-card-number">#{{number}}</h1>
      <h3 class="post-card-title">{{title}}</h3>
      <div class="post-card-contents">
        {{preview}}
      </div>
      <div class="post-card-created-at">{{createdAt}}</div>
    </div>
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
    createdAt: String,
  },

  methods: {
    goToPost() {
      this.$router.push(`/post/${this.number}`)
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

$post-card-border-radius: 5px;
$post-card-content-ratio: 3/4;

.post-card {
  position: relative;

  min-height: 105px;
  padding: 20px;

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

  .post-card-visual-infos {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;

    .post-card-image-outer-frame {
      position: relative;
      display: flex;
      justify-content: center;
      align-content: center;
      margin: 25px;
      width: 70%;
      padding-bottom: 70%;
      box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
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
        align-content: center;
        top: 25px;
        width: calc(100% - 25px * 2);
        height: calc(100% - 25px * 2);
        box-shadow: -2px -2px 8px $shadow-white-color, 2px 2px 8px $shadow-dark-color;
        border-radius: 50%;

        &:hover {
          box-shadow: -1px -1px 3px $shadow-white-color, 1px 1px 3px $shadow-dark-color;
        }

        &:active {
          box-shadow: -1px -1px 2px $shadow-white-color, 1px 1px 2px $shadow-dark-color;
        }

        image {
          position: absolute;
          padding: 20%;
          height: 60%;
          left: 50%;
          transform: translateX(-50%);
        }

        .post-card-number {
          padding: 25px;
          padding-bottom: 0px;
          font-size: 100px;
          color: $less-light-color;

          -webkit-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none
        }

        .post-card-created-at {
          text-align: center;
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
