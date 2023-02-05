<template>
  <div>
    <h1>인증되었습니다.</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let token = this.$route.query.token;
    console.log("token = {}", token);
    axios.get(this.server + "/sign-up?token=" + token)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
  }
}
</script>

<style scoped>

</style>