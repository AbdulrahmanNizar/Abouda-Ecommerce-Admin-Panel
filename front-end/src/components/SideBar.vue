<template>
  <div
    class="shadow d-lg-flex flex-column justify-content-center align-items-center bg-black bg-gradient h-100 d-none"
    style="width: 39%"
  >
    <h3 class="text-white text-center">
      Abouda E-commrece <br />
      Admin Panel
    </h3>

    <div class="btn-group">
      <router-link
        v-if="showSignupButton"
        :to="{ path: `/signup` }"
        class="btn btn-outline-secondary btn-lg mt-3"
        >Sign Up</router-link
      >
      <router-link
        v-else="showSignupButton"
        :to="{ path: `/signup` }"
        class="btn btn-secondary btn-lg mt-3"
        >Sign Up</router-link
      >

      <router-link
        v-if="showLoginButton"
        :to="{ path: `/login` }"
        class="btn btn-outline-secondary btn-lg mt-3"
        >Login</router-link
      >
      <router-link
        v-else="showLoginButton"
        :to="{ path: `/login` }"
        class="btn btn-secondary btn-lg mt-3"
        >Login</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showLoginButton = ref<boolean>(false);
const showSignupButton = ref<boolean>(false);

if (route.path == "/login") {
  showSignupButton.value = true;
  showLoginButton.value = false;
}

if (route.path == "/signup") {
  showLoginButton.value = true;
  showSignupButton.value = false;
}
</script>
