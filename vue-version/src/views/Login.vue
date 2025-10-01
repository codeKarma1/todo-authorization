<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-center mb-4">Log In</h2>

        <!-- Show error if login fails -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <form @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-control"
              required
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-control"
              required
            />
          </div>

          <button
            class="btn btn-primary w-100 mb-3"
            type="submit"
            :disabled="loading"
          >
            Log In
          </button>
        </form>

        <div class="w-100 text-center mt-2">
          <router-link to="/forgot-password">Forgot Password?</router-link>
        </div>
      </div>
    </div>

    <div class="w-100 text-center mt-2">
      Need an account? <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

async function handleSubmit() {
  try {
    error.value = "";
    loading.value = true;

    await authStore.login(email.value, password.value);

    // redirect after login
    router.push("/");
  } catch (err) {
    error.value = err.message || "Failed to log in";
  } finally {
    loading.value = false;
  }
}
</script>
