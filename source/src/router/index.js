import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OzonFiller from '../views/OzonFiller.vue'
import YandexFiller from '../views/YandexFiller.vue'
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/ozonfiller',
        component: OzonFiller
    },
    {
        path: '/yandexfiller',
        component: YandexFiller
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router