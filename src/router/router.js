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
            path: '/words/new',
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
            path: '/community/:id',
            name: 'CommunityDetail',
            component: () => import('../views/community/CommunityMainView.vue'),
            props: true,
        },
        {
            path: '/community/form',
            name: 'CommunityForm',
            component: () => import('../views/community/CreateCommunityView.vue'),
            props: true,
        },
        {
            path: '/community/:id/topics',
            name: 'CommunityForm',
            component: () => import('../views/community/CreateTopicView.vue'),
            props: true,
        },
        {
            path: '/community/:communityId/members',
            name: 'ManageMember',
            component: () => import('../views/community/ManageMemberView.vue'),
            props: true,
        },
        {
            path: '/community/:communityId/members/form',
            name: 'JoinForm',
            component: () => import('../views/community/CommunityJoinFormView.vue'),
            props: true,
        }
    ]
});


export default router;