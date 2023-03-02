<template>
  <div class="contents">
    <header>
      <ProfileCard
        class="profile-card"></ProfileCard>
    </header>
    <section>

    </section>
    <footer>

    </footer>
  </div>
</template>

<script>
import ProfileCard from "@/components/profile/ProfileCard.vue";

export default {

	name: 'IndexPage',

  components: {
    ProfileCard
  },

}
</script>

<style lang="scss">
@import "@/assets/scss/layout.scss";
@import "@/assets/scss/profile/profile-variables.scss";

.profile-card {
  position: absolute;
  justify-self: center;
  top: $header-size - ($profile-image-size * (3/4));
}

</style>
