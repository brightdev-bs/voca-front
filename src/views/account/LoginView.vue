<template>
  <section class="container forms" ref="forms">
    <TheLogin
      :login-form="this.loginForm"
      @changeForm="changeForm"
      @update:submitLogin="submitLoginForm"
      @loginWithSocialMedia="loginWithSocialMedia"
    />

    <!-- Signup Form -->
    <TheSignup
        @changeForm="changeForm"
        @signupWithSocialMedia="signupWithSocialMedia"
    />

  </section>
</template>
<script>
import {Constants } from "@/global/constants";
import TheLogin from "@/components/account/TheLogin.vue";
import {useAxios} from "@/composables/useAxios";
import TheSignup from "@/components/account/TheSignup.vue";
import {googleTokenLogin} from "vue3-google-login";
export default {
  computed: {
    Constants() {
      return Constants
    },
  },
  components: {TheSignup, TheLogin},
  mounted() {
    const forms = this.$refs.forms;
    const pwShowHide = forms.querySelectorAll(".eye-icon");
    const links = forms.querySelectorAll(".link");

    pwShowHide.forEach(eyeIcon => {
      eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
          if(password.type === "password"){
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
          }
          password.type = "password";
          eyeIcon.classList.replace("bx-show", "bx-hide");
        })
      })
    })

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault(); // preventing form submit
        forms.classList.toggle("show-signup");
      })
    })
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      signupForm: {
        email: '',
        password: '',
        password2: '',
      },
      googleButtonConfig: {
        width: '368px',
      },
      signup: false,
    }
  },
  methods: {
    async submitLoginForm(loginForm) {
      // ajax
      const { submitExecute } = useAxios(
          'v1/login',
          {
            method: 'post',
          },
          {
            immediate: false,
            onSuccess: res => {
              this.saveUserInfo(res);
            },
          },
      );
      submitExecute(loginForm);

    },
    changeForm(isSignup) {
      this.signup = isSignup;
    },
    async loginWithSocialMedia(platform) {

      if(platform === 'google') {
        googleTokenLogin().then((response) => {
          const token = response.access_token;

          const params = {
            'token': token
          }

          // ajax call to backend
          const { submitExecute } = useAxios(
              'v1/login/google',
              {
                method: 'get',
                params,
              },
              {
                immediate: false,
                onSuccess: res => {
                  this.saveUserInfo(res);
                },
              },
          );

          submitExecute(token);


        }).catch(() => {

        })
      }
    },
    saveUserInfo: function (res) {
      console.info("saveUserInfo = {}", res);
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('name', res.data.data.username)
      localStorage.setItem('id', res.data.data.id)
      location.href = process.env.VUE_APP_ADDRESS;
    },
    async signupWithSocialMedia(platform) {


      if(platform === 'google') {
        googleTokenLogin().then((response) => {
          const token = response.access_token;

          const params = {
            'token': token
          }

          // ajax call to backend
          const {submitExecute} = useAxios(
              'v1/signup/google',
              {
                method: 'get',
                params,
              },
              {
                immediate: false,
                onSuccess: res => {
                  this.saveUserInfo(res);
                },
              },
          );

          submitExecute(token);


        }).catch(() => {

        })
      }
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.container{
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  column-gap: 30px;
}
.form{
  position: absolute;
  max-width: 430px;
  width: 100%;
  padding: 30px;
  border-radius: 6px;
  background: #FFF;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}
.form.signup{
  opacity: 0;
  pointer-events: none;
}
.forms.show-signup .form.signup{
  opacity: 1;
  pointer-events: auto;
}
.forms.show-signup .form.login{
  opacity: 0;
  pointer-events: none;
}
header{
  font-size: 28px;
  font-weight: 600;
  color: #232836;
  text-align: center;
}
form{
  margin-top: 30px;
}
.form .field{
  position: relative;
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
}
.field input,
.field button{
  height: 100%;
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 6px;
}
.field input{
  outline: none;
  padding: 0 15px;
  border: 1px solid#CACACA;
}
.field input:focus{
  border-bottom-width: 2px;
}
.eye-icon{
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #8b8b8b;
  cursor: pointer;
  padding: 5px;
}
.field button{
  color: #fff;
  background-color: #0171d3;
  transition: all 0.3s ease;
  cursor: pointer;
}
.field button:hover{
  background-color: #016dcb;
}
.form-link{
  text-align: center;
  margin-top: 10px;
}
.form-link span,
.form-link a{
  font-size: 14px;
  font-weight: 400;
  color: #232836;
}
.form a{
  color: #0171d3;
  text-decoration: none;
}
.form-content a:hover{
  text-decoration: underline;
}
.line{
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
  background-color: #d4d4d4;
}
.line::before{
  content: 'Or';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  color: #8b8b8b;
  padding: 0 15px;
}
.media-options a{
  display: flex;
  align-items: center;
  justify-content: center;
}
a.facebook{
  color: #fff;
  background-color: #4267b2;
}
a.facebook .facebook-icon{
  height: 28px;
  width: 28px;
  color: #0171d3;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.facebook-icon,
img.google-img{
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}
img.google-img{
  height: 20px;
  width: 20px;
  object-fit: cover;
}
a.google{
  border: 1px solid #CACACA;
}
a.google span{
  font-weight: 500;
  opacity: 0.6;
  color: #232836;
}

@media screen and (max-width: 400px) {
  .form{
    padding: 20px 10px;
  }

}

</style>