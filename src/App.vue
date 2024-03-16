<script setup>
import Header from "./components/Header.vue";
import Left from "./components/Left.vue";
</script>

<template>
  <div class="relative">
    <div class="flex">
      <Left />
      <div class="bsi-right">
        <Header />
        <div class="bsi-content">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
