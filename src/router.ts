import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Login from "./app/Login/Login.vue";
import Register from "@/app/Login/Register.vue";
import Dashboard from "@/app/main/Dashboard.vue";
import OAuthFlow from "@/app/main/components/OAuthFlow.vue"
import Info from "@/app/Login/Info.vue"
import Demo from "@/app/Login/Demo.vue"
import HowToUse from "@/app/Login/HowToUse.vue"



const root = process.env.VUE_APP_PUBLIC_PATH ?? "/"

const routes: RouteRecordRaw[] = [
  { path: `${root}`, component: Login, name: "Login" },
  { path: `${root}register`, component: Register, name: "Register" },
  { path: `${root}dashboard`, component: Dashboard, name: "Dashboard" },
  { path: `${root}OAuthFLow`, component: OAuthFlow },
  { path: `${root}info`, component: Info, name: "info" },
  { path: `${root}demo`, component: Demo, name: "demo" },
  { path: `${root}how-to-use`, component: HowToUse, name: "HowToUse" }

];

export default createRouter({
  history: createWebHistory(),
  routes,
});
