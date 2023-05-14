import { createRouter, createWebHistory } from "vue-router";
import Login from "./app/Login/Login.vue"
import Register from "@/app/Login/Register.vue"

const routes = [
    { path: "/", component: Login},
    { path: "/register", component: Register}
]

export default createRouter({
    history: createWebHistory(),
    routes
})