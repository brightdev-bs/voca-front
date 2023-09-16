<template>

  <div class="container">
    <div class="form login">
      <div class="form-content">
        <header>Find Password</header>

        <div class="field input-field">
          <input type="email" placeholder="Email" @blur="v$.email.$touch" v-model="state.email" class="input">
          <div v-if="v$.email.$error" class="error-message">The Format isn't correct</div>
        </div>

        <v-btn
            class="float-end mt-2"
            @click="sendEmail"
        >
          send
        </v-btn>
      </div>
    </div>
  </div>

  <LoadingAlert :loading="loading"/>
</template>

<script>

import {reactive, ref, toRefs} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAxios} from "@/composables/useAxios";
import LoadingAlert from "@/components/LoadingAlert.vue";

export default {
  components: {LoadingAlert},

  setup () {
    const params = ref({
      email: '',
    });
    const { loading, dateExecute } = useAxios(
        '/v1/password',
        {
          params
        },
        {
          immediate: false,
          onSuccess: () => {
            alert("Check email");
            location.href = process.env.VUE_APP_ADDRESS + "/login";
          },
          onError: err => {
            alert(err.response.data.data);
          }
        },
    );

    const initialState = {
      loading: loading,
      execute: dateExecute,
    }

    const state = reactive({
      ...initialState,
    })

    const rules = {
      email: { required, email },
    }

    const v$ = useVuelidate(rules, state)

    return { params, state, v$, ...toRefs(state), }
  },
  methods: {
    async sendEmail() {
      const isFormCorrect = await this.v$.$validate()
      if(isFormCorrect) {
        this.params.email = this.state.email;
        this.state.execute();
      }
    }
  }
}
</script>

<style scoped>
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

.field button{
  color: #fff;
  background-color: #0171d3;
  transition: all 0.3s ease;
  cursor: pointer;
}
.field button:hover{
  background-color: #016dcb;
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

.media-options a{
  display: flex;
  align-items: center;
  justify-content: center;
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