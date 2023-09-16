<template>
  <h2>Verification</h2>
  <div>
    <v-alert
        v-if="isSuccess"
        type="success"
        title="Verified"
        text="Now you can login !"
    ></v-alert>
    <v-alert
        v-else
        type="error"
        title="error"
        :text="this.errorMessage"
    ></v-alert>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let token = this.$route.query.token;
    axios.get(this.server + "/v1/email?token=" + token)
        .then(() => {
          this.isSuccess = true;
        })
        .catch(err => {
          this.isSuccess = false;
          this.errorMessage = err.response.data.data;
        })
  },
  data() {
    return {
      isSuccess: true,
      errorMessage: '',
    }
  }
}
</script>

<style scoped>

</style>