<template>
  <div class="post">
      <GithubReadme v-if="type==='repo'"
                    class="post-contents"
                    :repoName="repoName"
                    :branchName="branchName"
                    :path="path" />
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