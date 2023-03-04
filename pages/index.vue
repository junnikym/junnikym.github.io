<template>
  <div class="contents">
    <div class="contents-background parallax"></div>
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

header {
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
