<template>
  <h2>Verification</h2>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let token = this.$route.query.token;
    axios.get(this.server + "/v1/email?token=" + token)
        .then(() => {
          alert('It is verified');
        })
        .catch(err => {
          let message = err.response.data.data;
          this.alert.type = 'error';
          alert(message);
        })
  },
  data() {
    return {
      alert: {
        type: ''
      },
    }
  }
}
</script>

<style scoped>

</style>