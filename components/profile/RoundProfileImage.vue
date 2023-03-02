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

<style scoped>
  .profile-image {
    border-radius: 50%;
  }
</style>
