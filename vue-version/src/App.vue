<template>
  <div
    class="d-flex align-items-center justify-content-center"
    style="min-height: 100vh"
  >
    <div class="w-100" style="max-width: 400px">
      <!-- Vue Router outlet -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
// No extra logic needed here — the router and store handle everything
</script>
