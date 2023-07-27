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
            component: () => import('../views/vocabulary/VocabularyView.vue.vue')
        },
        {
            path: '/vocabulary/words/new',
            name: 'WriteWord',
            component: () => import('../views/vocabulary/AddWordView.vue')
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('../views/account/SignupView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/account/LoginView.vue')
        },
        {
            path: '/email',
            name: 'confirmEmail',
            component: () => import('../views/account/ConfirmView.vue')
        },
        {
            path: '/my-page',
            name: 'MyPage',
            component: () => import('../views/account/MyPageView.vue')
        },
        {
            path: '/word-game',
            name: 'WordGame',
            component: () => import('../views/vocabulary/WordGameView.vue'),
            props: true,
        },
        {
            path: '/password',
            name: 'FindPassword',
            component: () => import('../views/account/FindPasswordView.vue'),
            props: true,
        },
        {
            path: '/password/options',
            name: 'ChangePassword',
            component: () => import('../views/account/ChangePasswordView.vue'),
            props: true,
        },
        {
            path: '/study',
            name: 'StudyWords',
            component: () => import('../views/vocabulary/StudyWordsView.vue'),
            props: true,
        },
        {
            path: '/community/:communityId/posts',
            name: 'PostForm',
            component: () => import('../views/post/PostFormView.vue'),
            props: true,
        },
        {
            path: '/community/:communityId/posts/:postId',
            name: 'PostDetail',
            component: () => import('../views/post/PostDetailView.vue'),
            props: true,
        },
    ]
});


export default router;