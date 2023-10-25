<template>
  <div class="contents">
    <header>
      <Header></Header>
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
import Header from "@/components/common/Header.vue";
import ProfileCard from "@/components/profile/ProfileCard.vue";
import PostCardGrid from "@/components/post/PostCardGrid.vue";

export default {

	name: 'IndexPage',

  components: {
    Header,
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

header {
  height: $header-size;

  @media (min-width: $profile-transforms-at) {
    margin-bottom: ($profile-image-size * 0.75);
  }
  @media (max-width: $profile-transforms-at) {
    margin-bottom: ($profile-image-size * 1.5);
  }
}

.profile-card {
  position: absolute;
  justify-self: center;
  top: $header-size - ($profile-image-size * 0.69);
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
