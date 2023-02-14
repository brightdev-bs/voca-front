<template>
  <div class="ma-5">
    <v-text-field
        v-model="profile.username"
        label="username"
        variant="solo"
        readonly
    />
    <v-text-field
        v-model="profile.email"
        label="email"
        variant="solo"
        readonly
    />


    <div>
      <h3>이전 공부 내역</h3>
      <v-date-picker
          is-expanded
          :attributes='attributes'
      />
    </div>
  </div>
</template>

<script>
import 'v-calendar/dist/style.css';
import axios from "axios";

export default {

  data() {
    return {
      profile: {
        username: '',
        email: '',
      },
      attributes: [
        {
          dot: true,
          dates: [],
        }
      ],
    }
  },
  mounted() {

    let token = localStorage.getItem("token");
    console.log(token);
    if(token == undefined || token == "undefined" || token == null || token == '') {
      window.location.href = this.domain + '/login';
    }

    axios
        .get(this.server + '/my-page', {
          headers: {
            "Content-Type": 'application/json',
            Authorization: localStorage.getItem("token"),
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.statusCode == '200 OK') {
            console.log(res.data.data.username);
            this.profile.username = res.data.data.user.username;
            this.profile.email = res.data.data.user.email;
            const records = res.data.data.dates;
            for(let i = 0; i < records.length; i++) {
              console.log(new Date(records[i]).toLocaleDateString())
              this.attributes[0].dates.push(new Date(records[i]).toLocaleDateString());
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
  },
}
</script>

<style scoped>

</style>