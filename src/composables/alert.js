import {ref} from 'vue';

const alerts = ref([]);
export function useAlert() {
    const vAlert = ( message, type = 'info') => {
        alerts.value.push({ message, type});
        setTimeout(() => {
            alerts.value.shift();
        }, 2000);
    };

    return {
        vAlert
    };
}