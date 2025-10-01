<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-center mb-4">Profile</h2>

        <!-- Show error if logout fails -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <strong>Email:</strong> {{ authStore.currentUser?.email }}

        <!-- Update Profile Link -->
        <router-link to="/update-profile" class="btn btn-primary w-100 mt-3">
          Update Profile
        </router-link>
      </div>
    </div>

    <div class="w-100 text-center mt-2">
      <button class="btn btn-link" @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  error.value = "";
  try {
    await authStore.logout();
    router.push("/login");
  } catch {
    error.value = "Failed to log out";
  }
}
</script>
