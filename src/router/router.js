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
        }
    ]
});

export default router;