<template>
  <div class="post">
      <div class="post-contents">
        <GithubReadme v-if="type==='repo'"
                      :repoName="repoName"
                      :branchName="branchName"
                      :path="path" />
      </div>
      <div class="post-comment">
        <Comment class="post-comment-contents"/>
      </div>
  </div>
</template>

<script>

import GithubReadme from "@/components/post/GithubReadme.vue";
import Comment from "@/components/comment/Comment.vue";

export default {
  name: "Post",
  components: { GithubReadme, Comment },
  props: {
    type: {
      type: String,
      default: null,
    },
    repoName: {
      type: String,
      default: null,
    },
    branchName: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    }, 
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/layout.scss";

.post {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 25px 0 25px 0;

  border-radius: 15px;
  box-shadow: -5px -5px 20px $shadow-white-color,  5px 5px 20px $shadow-dark-color;
  overflow: hidden;

  .post-contents {
    position: relative;
    width: 100%;
    border-radius: 15px 15px 0px 0px;

    > * {
      padding: 20px;
      width: calc(100% - 20px * 2);
    }
  }

  .post-comment {
    padding: 20px;
    width: calc(100% - 20px * 2);
    
    > * {
      width: 100%;
      box-shadow: inset 5px 5px 20px $shadow-dark-color, inset -5px -5px 20px $shadow-white-color;
      border-radius: 15px;
    }
  }

}

</style>
