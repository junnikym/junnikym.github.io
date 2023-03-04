<template>
  <div class="post-card">
    <h1 class="post-card-number">#{{number}}</h1>
    <h3 class="post-card-title">{{title}}</h3>
    <div class="post-card-contents">
      {{preview}}
    </div>
<!--    <img class="post-card-contents"-->
<!--         src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />-->

    <div class="post-card-created-at">{{createdAt}}</div>
  </div>
</template>

<script>

export default {
  name: "PostCard",

  props: {
    number: Number,
    title: String,
    preview: String,
    createdAt: String,
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

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(17px);
    backdrop-filter: blur(17px);
  }
  color: $dark-color;

  overflow: hidden;

  * {
    margin: 0;
    padding: 0;
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
    opacity: 0.25;
  }
  .post-card-title, .post-card-contents  {
    color: $darkest-color;
    opacity: 0.7;
  }

  .post-card-created-at {
    position: absolute;
    font-weight: bold;
    bottom: 10px;
    right: 20px;
  }
}
</style>
