import axios from "axios";
import {ref, unref} from "vue";
import { Error } from "@/global/constants"

axios.defaults.baseURL = process.env.VUE_APP_ADDRESS_API;

const defaultConfig = {
    method: 'get',
}

const defaultOptions = {
    immediate: true,
}

export const useAxios = (url, config = {}, options = {}) => {
    const response = ref(null);
    const data = ref(null);
    const loading = ref(false);

    const { onSuccess, onError, immediate } = {
        ...defaultOptions,
        ...options,
    }

    const { params } = config;

    const execute = body => {
        data.value = null;
        loading.value = true;
        axios(unref(url), {
            ...defaultConfig,
            ...config,
            params: unref(params),
            data: typeof body === 'object' ? body : {},
        }).then(res => {
            response.value = res;
            data.value = res.data;
            if(onSuccess) onSuccess(res);
        }).catch(err => {
            console.log(err);
            if(!err.response) {
                alert("Something is wrong. Try again after few minutes");
            }
            if(!err.response.data.data) {
                alert("Something is wrong. Try again after few minutes");
            }
            if(err.response.data.data === Error.EXPIRED_TOKEN) {
                removeLocalStorage();
                confirm("session is expired. please re-login", "OK");
                location.href = '/login'
                return;
            }

            if(err.response.data.data === Error.INVALID_TOKEN) {
                removeLocalStorage();
                confirm("session is expired. please re-login", "OK");
                location.href = '/login'
                return;
            }
            if (err.response.data.data === Error.NOT_FOUND_TOKEN) {
                location.href = '/login'
                confirm("Only member can request. Please login first", "OK");
                return;
            }
            if (onError) onError(err);
        }).finally(() => {
            loading.value = false;
        })
    }

    if (immediate) {
        execute();
    }

    function removeLocalStorage() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem('name');
    }

    return {
        response,
        data,
        loading,
        dateExecute: execute,
        submitExecute: execute,
    };
}