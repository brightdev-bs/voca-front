import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/HomeView.vue'),
            meta: {
                title: 'Voca-World',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Voca-World is a web service for learning words in various languages. It offers a variety of features to enhance language learning effectively.',
                    },
                    {
                        property: 'og:title',
                        content: 'Voca-World - Vocabulary Learning Service',
                    },
                    {
                        property: 'og:description',
                        content: 'Voca-World is a web service for learning words in various languages. It offers a variety of features to enhance language learning effectively.',
                    },
                    {
                        name: 'twitter:title',
                        content: 'Voca-World - Vocabulary Learning Service',
                    },
                    {
                        name: 'twitter:description',
                        content: 'Voca-World is a web service for learning words in various languages. It offers a variety of features to enhance language learning effectively.',
                    },
                ]
            }
        },
        {
            path: '/vocabulary',
            name: 'Vocabulary',
            component: () => import('../views/vocabulary/VocabularyView.vue.vue'),
        },
        {
            path: '/vocabulary/words/new/:word',
            alias: ['/vocabulary/words/new'],
            name: 'AddWord',
            component: () => import('../views/vocabulary/AddWordView.vue'),
            props: route => ({ word: route.params.word || {word: '', definition: '', note: ''} }),
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
    ]
});


export default router;