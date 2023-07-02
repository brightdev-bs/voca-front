import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/vocabulary',
            name: 'Vocabulary',
            component: () => import('../views/VocabularyView.vue')
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
        },
        {
            path: '/my-page',
            name: 'MyPage',
            component: () => import('../views/MyPageView.vue')
        },
        {
            path: '/word-game',
            name: 'WordGame',
            component: () => import('../views/WordGameView.vue'),
            props: true,
        },
        {
            path: '/password',
            name: 'FindPassword',
            component: () => import('../views/FindPasswordView.vue'),
            props: true,
        },
        {
            path: '/password/options',
            name: 'ChangePassword',
            component: () => import('../views/ChangePasswordView.vue'),
            props: true,
        },
        {
            path: '/study',
            name: 'StudyWords',
            component: () => import('../views/StudyWordsView.vue'),
            props: true,
        },
    ]
});


export default router;