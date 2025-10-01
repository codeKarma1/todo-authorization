<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-center mb-4">Password Reset</h2>

        <!-- Error / success messages -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="message" class="alert alert-success">{{ message }}</div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit">
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

          <button class="btn btn-primary w-100" :disabled="loading" type="submit">
            Reset Password
          </button>
        </form>

        <div class="w-100 text-center mt-3">
          <router-link to="/login">Log In</router-link>
        </div>
      </div>
    </div>

    <div class="w-100 text-center mt-2">
      Need an account?
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const email = ref("");
const error = ref("");
const message = ref("");
const loading = ref(false);
const router = useRouter();

async function handleSubmit() {
  try {
    error.value = "";
    message.value = "";
    loading.value = true;

    await sendPasswordResetEmail(auth, email.value);
    message.value = "Check your inbox for password reset email";

    // Optional: redirect after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    console.error(err);
    error.value = err.message || "Failed to reset password";
  } finally {
    loading.value = false;
  }
}
</script>
