import axios from "axios";
import {ref, unref} from "vue";

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
            if (onError) onError(err);
        }).finally(() => {
            loading.value = false;
        })
    }

    if (immediate) {
        execute();
    }

    return {
        response,
        data,
        loading,
        dateExecute: execute,
    };
}