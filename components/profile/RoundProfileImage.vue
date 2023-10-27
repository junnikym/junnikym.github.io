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
@import "assets/scss/profile/ProfileVariables.scss";

.profile-image {
  padding: $profile-image-padding;
  box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
  border-radius: 50%;
  &:hover {
    box-shadow: inset 1px 1px 3px $shadow-dark-color, inset -1px -1px 3px $shadow-white-color;
  }

  &:active {
    box-shadow: inset -1px -1px 2px $shadow-dark-color, inset 1px 1px 2px $shadow-white-color;
  }
}
</style>
