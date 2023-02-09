import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/HomeView')
        },
        {
            path: '/words/new',
            name: 'WriteWord',
            component: () => import('../views/AddWordView')
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('../views/SignupView')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView')
        },
        {
            path: '/email',
            name: 'confirmEmail',
            component: () => import('../views/ConfirmView.vue')
        }
    ]
});

export default router;