import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../App')
        },
        {
            path: '/test',
            name: 'Main',
            component: () => import('../App')
        }
    ]
});

export default router;