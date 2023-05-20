import { createRouter, createWebHistory } from "vue-router";
import Login from "./app/Login/Login.vue";
import Register from "@/app/Login/Register.vue";
import Dashboard from "@/app/main/Dashboard.vue";
import OAuthFlow from "@/app/main/components/OAuthFlow.vue"


const routes = [
  { path: "/", component: Login, name: "Login" },
  { path: "/register", component: Register, name: "Register" },
  { path: "/dashboard", component: Dashboard, name: "Dashboard"},
  { path: "/OAuthFLow", component: OAuthFlow}
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
