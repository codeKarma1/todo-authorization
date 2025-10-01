import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Pages
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import UpdateProfile from "../views/UpdateProfile.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },

  // Protected
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  {
    path: "/update-profile",
    component: UpdateProfile,
    meta: { requiresAuth: true },
  },

  // Public (guest-only)
  { path: "/login", component: Login, meta: { guestOnly: true } },
  { path: "/signup", component: Signup, meta: { guestOnly: true } },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    meta: { guestOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to) => {
  const auth = useAuthStore();

  // Check if route requires auth
  if (to.meta.requiresAuth && !auth.currentUser) {
    return { path: "/login" };
  }

  // Prevent logged-in users from visiting guest-only routes
  if (to.meta.guestOnly && auth.currentUser) {
    return { path: "/dashboard" };
  }
});

export default router;
