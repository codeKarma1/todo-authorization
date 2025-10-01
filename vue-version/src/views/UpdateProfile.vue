<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="text-center mb-4">Update Profile</h2>

        <!-- Error and success messages -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="message" class="alert alert-success">{{ message }}</div>

        <form @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-control"
              :placeholder="authStore.currentUser?.email"
              required
            />
          </div>

          <!-- New Password -->
          <div class="mb-3">
            <label for="password" class="form-label"
              >New Password (leave blank to keep current)</label
            >
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Leave blank to keep password"
            />
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="passwordConfirm" class="form-label"
              >Confirm New Password</label
            >
            <input
              id="passwordConfirm"
              type="password"
              v-model="passwordConfirm"
              class="form-control"
              placeholder="Leave blank to keep password"
            />
          </div>

          <button
            class="btn btn-primary w-100"
            type="submit"
            :disabled="loading"
          >
            Update
          </button>
        </form>
      </div>
    </div>

    <div class="w-100 text-center mt-2">
      <router-link to="/" class="btn btn-secondary w-100 mt-2"
        >Cancel</router-link
      >
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
const message = ref("");
const loading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

async function handleSubmit() {
  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  error.value = "";
  message.value = "";

  try {
    const promises = [];

    // Update email if changed
    if (email.value && email.value !== authStore.currentUser?.email) {
      promises.push(authStore.updateUserEmail(email.value));
    }

    // Update password if provided
    if (password.value) {
      // ✅ Require reauthentication before sensitive update
      await authStore.reauthenticate(password.value);
      promises.push(authStore.updateUserPassword(password.value));
    }

    await Promise.all(promises);

    message.value = "Profile updated successfully!";
    router.push("/dashboard");
  } catch (err) {
    error.value = err.message || "Failed to update profile";
  } finally {
    loading.value = false;
  }
}
</script>
