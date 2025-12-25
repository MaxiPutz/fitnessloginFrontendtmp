import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Login from "./app/Login/Login.vue";
import Register from "@/app/Login/Register.vue";
import Dashboard from "@/app/main/Dashboard.vue";
import OAuthFlow from "@/app/main/components/OAuthFlow.vue"
import Info from "@/app/Login/Info.vue"
import Demo from "@/app/Login/Demo.vue"
import HowToUse from "@/app/Login/HowToUse.vue"



const root = process.env.VUE_APP_PUBLIC_PATH ?? "/fitness/login/"

const routes: RouteRecordRaw[] = [
  { path: `${root}`, component: Login, name: "Login" },
  { path: `/`, component: Login, name: "Login" },
  { path: `/fitness2`, component: Login, name: "Login" },
  { path: `/fitness/login2`, component: Login, name: "Login" },
  { path: `/register`, component: Register, name: "Register" },
  { path: `/dashboard`, component: Dashboard, name: "Dashboard" },
  { path: `/OAuthFLow`, component: OAuthFlow },
  { path: `/info`, component: Info, name: "info" },
  { path: `/demo`, component: Demo, name: "demo" },
  { path: `/how-to-use`, component: HowToUse, name: "HowToUse" }

];

export default createRouter({
  history: createWebHistory(),
  routes,
});
