<template>
  <div class="contents">
    <header>
      <Header></Header>
      <ProfileCard
        class="profile-card" />
    </header>

    <div class="horizontal-dividing-line"></div>
    
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
  position: relative;
}

.profile-card {
  margin-top: 115px;
}

.horizontal-dividing-line {
  width: 80%;
  height: 2px;
  margin: 50px 0 0 0;
  border-radius: 1px;
  justify-self: center;
  background-color: $main-color;
  box-shadow: -5px -5px 10px 5px $shadow-white-color,  5px 5px 10px 5px $shadow-dark-color;
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
