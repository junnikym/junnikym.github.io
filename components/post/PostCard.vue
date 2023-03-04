<template>
  <div class="post-card">
    <h1 class="post-card-number">#1</h1>
    <h3 class="post-card-title">This is Title</h3>
    <div class="post-card-contents">
      this is contents<br/>
      contents preview or image will be here
    </div>
<!--    <img class="post-card-contents"-->
<!--         src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />-->
  </div>
</template>

<script>

export default {
  name: "PostCard",
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

$post-card-border-radius: 5px;
$post-card-content-ratio: 3/4;

.post-card {
  position: relative;

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
    color: white;
    opacity: 0.25;

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
  .post-card-title, .post-card-contents {
    color: $darkest-color;
    opacity: 0.8;
  }
}
</style>
