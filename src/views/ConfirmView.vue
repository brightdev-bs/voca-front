<template>
  <v-alert
      :type=this.alert.type
      :title=this.response.title
      :text=this.response.message
  ></v-alert>
</template>

<script>
import axios from "axios";

export default {
  created() {
    let token = this.$route.query.token;
    axios.get(this.server + "/email?token=" + token)
        .then(() => {
          this.response.message = '인증되었습니다.';
        })
        .catch(err => {
          let message = err.response.data.data;
          this.alert.type = 'error';
          console.log(message);
          if(message == '잘못된 인증 코드입니다.') {
            this.response.title = message;
            this.response.message = "이메일로 받은 링크를 다시 확인해주세요."
          } else if(message == '만료된 토큰입니다.') {
            this.response.title = message;
            this.response.message = "만료된 토큰입니다. 새로운 메일을 보냈으니 확인해주세요.";
          } else if(message == '사용자를 찾을 수 없습니다.') {
            this.response.title = message;
            this.response.message = "사용자를 찾을 수 없습니다. 회원가입을 해주세요.";
            location.href = this.domain + '/sign-up';
          } else if(message == '인증 코드가 없습니다.') {
            this.response.title = '인증 코드가 없습니다';
            this.response.message = "회원가입 후 이용해주세요.";
          }
        })
  },
  data() {
    return {
      alert: {
        type: ''
      },
      response: {
        title: '',
        message: '',

      }
    }
  }
}
</script>

<style scoped>

</style>