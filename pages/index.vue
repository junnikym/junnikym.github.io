<template>
  <div class="contents">
    <div class="contents-background">
      <div class="contents-background-object-wrapper">
<!--        <div class="contents-background-object-a"/>-->
<!--        <div class="contents-background-object-b"/>-->
      </div>
    </div>
    <header>
      <ProfileCard
        class="profile-card" />
    </header>
    <section>
      <div class="post-card-grid-wrapper">
        <PostCardGrid class="post-card-grid"/>
      </div>
    </section>
    <footer>

    </footer>
  </div>
</template>

<script>
import ProfileCard from "@/components/profile/ProfileCard.vue";
import PostCardGrid from "@/components/post/PostCardGrid.vue";

export default {

	name: 'IndexPage',

  components: {
    ProfileCard,
    PostCardGrid
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/layout.scss";
@import "assets/scss/profile/ProfileVariables.scss";

$header-width: 80%;
$header-height: 220px;

.contents-background {
  position: fixed;
  display: flex;
  justify-content: center;

  top: 0; left: 0;
  width: 100vw; height: 100vh;

  .contents-background-object-wrapper {
    position: relative;
    width: 100vw; height: 100vh;
    max-width: 1300px;

    .contents-background-object-a {
      $size: 90vh;

      position: absolute;
      width: $size;
      height: $size;
      top: 50%;
      left: ($size * -0.3);
      background-color: #B6C2E6;
      border-radius: $size/2;
    }
    .contents-background-object-b {
      $size: 60vh;

      position: absolute;
      width: $size;
      height: $size;
      top: 30%;
      right: ($size * -0.25);
      background-color: #D7A31A;
      border-radius: $size/2;
    }
  }
}

header {
  height: $header-size;

  @media (min-width: $profile-transforms-at) {
    margin-bottom: ($profile-image-size * (4/10));
  }
  @media (max-width: $profile-transforms-at) {
    margin-bottom: ($profile-image-size * (9/10));
  }
}

.profile-card {
  position: absolute;
  justify-self: center;
  top: $header-size - ($profile-image-size * (3/4));
}

section {
  display: flex;
  position: relative;
  justify-content: center;

  .post-card-grid-wrapper {
    width: 100%;
    max-width: 1500px;
  }

  *{
    margin: 0;
    padding: 0;
  }
}

</style>
