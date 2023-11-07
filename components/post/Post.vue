<template>
  <div class="post">
      <GithubReadme v-if="type==='repo'"
                    class="post-contents"
                    :repoName="repoName"
                    :branchName="branchName"
                    :path="path" />
      <div class="post-comment">
        <Comment class="post-comment-contents"
                 :postId="id"/>
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
    id: {
      type: Number,
      default: null,
    },
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