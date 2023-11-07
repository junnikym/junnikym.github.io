<template>
  <div class="comment">
    <script src="https://utteranc.es/client.js"
        repo="junnikym/blog-post"
        :issue-number="postId"
        theme="github-light"
        crossorigin="anonymous"
        async>
	  </script>
  </div>
</template>

<script>

export default {
  name: "Comment",
  props: {
    postId: {
      type: Number,
      default: null
    },
  },
}

</script>

<style scoped lang="scss">

</style>