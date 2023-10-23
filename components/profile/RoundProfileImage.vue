<template>
  <img
    :src="profileUrl"
    class="profile-image"
    alt="profile image"
  />
</template>

<script>
export default {
  name: "RoundProfileImage",

  data() {
    return {
      profileUrl: "https://avatars.githubusercontent.com/u/59278013"
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

  .profile-image {
    box-shadow: 0px 0px 15px $darkest-color;
    border-radius: 50%;
  }
</style>
