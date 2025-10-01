<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-center mb-4">Sign Up</h2>

        <!-- Show error if signup fails -->
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

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="passwordConfirm" class="form-label"
              >Password Confirmation</label
            >
            <input
              id="passwordConfirm"
              type="password"
              v-model="passwordConfirm"
              class="form-control"
              required
            />
          </div>

          <button
            class="btn btn-primary w-100"
            type="submit"
            :disabled="loading"
          >
            {{ loading ? "Creating account..." : "Sign Up" }}
          </button>
        </form>
      </div>
    </div>

    <div class="w-100 text-center mt-2">
      Already have an account?
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

async function handleSubmit() {
  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    error.value = "";
    loading.value = true;

    await authStore.signup(email.value, password.value);

    // redirect to dashboard after successful signup
    router.push("/");
  } catch (err) {
    console.error("Signup error:", err);
    error.value = err.message || "Failed to create an account";
  } finally {
    loading.value = false;
  }
}
</script>
