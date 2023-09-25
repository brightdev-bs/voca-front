<template>
  <div class="form signup">
    <div class="form-content">
      <header>Signup</header>
        <div class="field input-field">
          <input type="text" placeholder="Username" class="input" @blur="v$.username.$touch" v-model="username">
          <div v-if="v$.username.$error" class="error-message">The Format isn't correct</div>
        </div>

        <div class="field input-field">
          <input type="email" placeholder="Email" class="input" @blur="v$.email.$touch" v-model="email">
          <div v-if="v$.email.$error" class="error-message">The Format isn't correct</div>
        </div>

        <div class="field input-field">
          <input type="password" placeholder="Create password" class="password" @blur="v$.password.$touch" v-model="password">
          <div v-if="v$.password.$error" class="error-message">The Format isn't correct</div>
        </div>

        <div class="field input-field">
          <input type="password" placeholder="Confirm password" class="password" @blur="v$.password2.$touch" v-model="password2">
          <div v-if="v$.password2.$error" class="error-message">The Format isn't correct</div>
          <i class='bx bx-hide eye-icon'></i>
        </div>

        <div class="field button-field">
          <button @click="submitSignupForm">Signup</button>
        </div>

      <div class="form-link">
        <span>Already have an account? <a @click="toLoginForm" class="link login-link">Login</a></span>
      </div>
    </div>
    <div class="line"></div>
    <SocialLoginButton :social-type='"google"' @click="signupWithSocialMedia(Constants.GOOGLE)"/>
  </div>
</template>
<script>
import {Constants} from "@/global/constants";
import SocialLoginButton from "@/components/account/SocialLoginButton.vue";
import {useAxios} from "@/composables/useAxios";
import {reactive, toRefs} from "vue";
import {email, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import router from "@/router/router";
export default {
  components: {SocialLoginButton},
  computed: {
    Constants() {
      return Constants
    }
  },
  setup () {
    const { loading, submitExecute } = useAxios(
        'v1/sign-up',
        {
          method: 'post',
        },
        {
          immediate: false,
          onSuccess: () => {
            alert("SUCCESS ! Check your email ");
            router.go(0);
          },
        },
    );

    const initialState = {
      username: '',
      email: '',
      password: '',
      password2: '',
      select: null,
      checkbox: null,
      loading: loading,
      execute: submitExecute,
    };

    const state = reactive({
      ...initialState,
    })

    const rules = {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8)},
      password2: { required, sameAsPassword: state.password}
    }

    const v$ = useVuelidate(rules, state)

    return {
      ...toRefs(state),
      state,
      v$ }
  },
  methods: {
    async submitSignupForm() {
      const isFormCorrect = await this.v$.$validate();
      console.log(isFormCorrect);
      if(isFormCorrect) {
        const requestBody = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        };
        this.state.execute(requestBody);
      }

    },
    async signupWithSocialMedia(platform) {
      this.$emit('signupWithSocialMedia', platform);
    },
    toLoginForm() {
      console.log("toLoginForm")
      this.$emit('changeForm', false);
    }
  }
}
</script>
<style scoped>

</style>